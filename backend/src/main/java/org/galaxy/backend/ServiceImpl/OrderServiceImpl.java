package org.galaxy.backend.ServiceImpl;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

import jakarta.transaction.Transactional;

import org.galaxy.backend.Model.*;
import org.galaxy.backend.Repository.CartRepository;
import org.galaxy.backend.Repository.OrderRepository;
import org.galaxy.backend.Service.OrderDetailService;
import org.galaxy.backend.Service.OrderService;
import org.galaxy.backend.Service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.cache.CacheProperties;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class OrderServiceImpl implements OrderService {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductService productService;
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private OrderDetailService orderDetailService;

    private static final String HASH_ORDER = "order";
    @Autowired
    RedisTemplate<String, Object> redisTemplate;
    HashOperations<String, String, Order> hashOperations;

    public OrderServiceImpl(RedisTemplate<String, Object> redisTemplate) {
        this.redisTemplate = redisTemplate;
        this.hashOperations = redisTemplate.opsForHash();
    }

    public void TTL() {
        redisTemplate.expire(HASH_ORDER, 10, TimeUnit.MINUTES);
    }

    @Scheduled(fixedRate = 300000)
    public void SetCache() {
        List<Order> orders = orderRepository.findAll();
        final int BATCH_SIZE = 50;

        for (int i = 0; i < orders.size(); i += BATCH_SIZE) {
            List<Order> batch = orders.subList(i, Math.min(i + BATCH_SIZE, orders.size()));

            for (Order order : batch) {
                hashOperations.put(HASH_ORDER, order.getOrder_id(), order);
            }
            redisTemplate.expire(HASH_ORDER, 10, TimeUnit.MINUTES);
        }
    }

    @Override
    public List<Order> getByUser(User user) {
        return orderRepository.findByUser(user);
    }

    @Override
    public Page<Order> findAll(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return orderRepository.findAllSortedByTime(pageable);
    }

    @Override
    public Order save(Order entity) {
        OrderDetail orderDetail = orderDetailService.findById(entity.getOrderDetail_id());
        for (Product product : orderDetail.getProducts()) {
            Product productExisting = productService.findById(product.getProduct_id());
            User user = entity.getUser();
            Cart cart = cartRepository.findByProductAndUser(productExisting.getProduct_id(), user.getUser_id());

            int a = productExisting.getQuantity() - cart.getProduct_quantity();
            if (a <= 0) {
                productExisting.setStockStatus(Product.StockStatusPr.Out_of_Stock);
                productService.UpdateStatus(productExisting.getProduct_id(), productExisting);
            } else {
                productExisting.setStockStatus(Product.StockStatusPr.In_Stock);
                productService.UpdateStatus(productExisting.getProduct_id(), productExisting);
            }
        }
        Order order = orderRepository.save(entity);
        hashOperations.put(HASH_ORDER, order.getOrder_id(), order);
        TTL();
        return order;
    }

    @Override
    public Order findById(String integer) {
        if (hashOperations.hasKey(HASH_ORDER, integer)) {
            return hashOperations.get(HASH_ORDER, integer);
        } else {
            Order order = orderRepository.findById(integer).orElseThrow(() -> new RuntimeException("Not found"));
            hashOperations.put(HASH_ORDER, order.getOrder_id(), order);
            TTL();
            return order;
        }
    }

    @Override
    public void deleteById(String integer) {
        if (hashOperations.hasKey(HASH_ORDER, integer)) {
            hashOperations.get(HASH_ORDER, integer);
        }
        if (orderRepository.existsById(integer)) {
            orderRepository.deleteById(integer);
        } else {
            throw new RuntimeException("Order not found");
        }
    }

    public List<Order> getByTime(String startDate, String endDate) {
        if (redisTemplate.hasKey(HASH_ORDER)) {
            System.out.println("get order from redis");
            List<Order> orders = new ArrayList<>(hashOperations.values(HASH_ORDER));
            DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            try {
                Date start = dateFormat.parse(startDate);
                Date end = dateFormat.parse(endDate);
                // Lọc đơn hàng theo thời gian
                return orders.stream()
                        .filter(order -> {
                            try {
                                Date orderDate = dateFormat.parse(String.valueOf(order.getTime_created()));
                                return orderDate.after(start) && orderDate.before(end);
                            } catch (ParseException e) {
                                return false;
                            }
                        })
                        .collect(Collectors.toList());
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }
        System.out.println("get order from database");
        return orderRepository.findByTime_createdBetween(startDate, endDate);
    }

}
