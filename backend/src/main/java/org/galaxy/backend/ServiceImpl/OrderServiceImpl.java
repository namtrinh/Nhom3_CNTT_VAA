package org.galaxy.backend.ServiceImpl;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

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

    public OrderServiceImpl(RedisTemplate<String, Object> redisTemplate){
        this.redisTemplate = redisTemplate;
        this.hashOperations = redisTemplate.opsForHash();
    }

    public void TTL(){
        redisTemplate.expire(HASH_ORDER, 10, TimeUnit.MINUTES);
    }

    @Scheduled(fixedRate = 300000)
    public void SetCache(){
        List<Order> orders = orderRepository.findAll();
        for(Order order : orders){
            hashOperations.put(HASH_ORDER, order.getOrder_id(), order);
        }
        TTL();
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
        return orderRepository.save(entity);
    }

    @Override
    public Order findById(String integer) {
        if (hashOperations.hasKey(HASH_ORDER, integer)){
           return hashOperations.get(HASH_ORDER, integer);
        }else {
            Order order = orderRepository.findById(integer).orElseThrow(() -> new RuntimeException("Not found"));
            hashOperations.put(HASH_ORDER, order.getOrder_id(), order);
            return order;
        }
    }

    @Override
    public void deleteById(String integer) {
        if (hashOperations.hasKey(HASH_ORDER, integer)){
             hashOperations.get(HASH_ORDER, integer);
        }
        if (orderRepository.existsById(integer)) {
            orderRepository.deleteById(integer);
        }else {
            throw new RuntimeException("Order not found");
        }
    }

    public List<Order> getByTime(String startDate, String endDate) {
        return orderRepository.findByTime_createdBetween(startDate, endDate);
    }
}
