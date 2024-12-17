package org.galaxy.backend.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicReference;

import lombok.extern.slf4j.Slf4j;
import org.galaxy.backend.Model.Cart;
import org.galaxy.backend.Model.Order;
import org.galaxy.backend.Model.OrderDetail;
import org.galaxy.backend.Model.Product;
import org.galaxy.backend.Repository.CartRepository;
import org.galaxy.backend.Repository.OrderDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class OrderDetailService {
    @Autowired
    private OrderDetailRepository orderDetailRepository;

    private static final String HASH_ORDER_DETAIL = "orderDetail";
    @Autowired
    RedisTemplate<String, Object> redisTemplate;
    HashOperations<String, String, OrderDetail> hashOperations;

    public OrderDetailService(RedisTemplate<String, Object> redisTemplate){
        this.redisTemplate = redisTemplate;
        this.hashOperations = redisTemplate.opsForHash();
    }

    public void TTL(){
        redisTemplate.expire(HASH_ORDER_DETAIL, 10, TimeUnit.MINUTES);
    }

    @Scheduled(fixedRate = 300000)
    public void SetCache() {
        List<OrderDetail> orders = orderDetailRepository.findAll();
        final int BATCH_SIZE = 50;

        for (int i = 0; i < orders.size(); i += BATCH_SIZE) {
            List<OrderDetail> batch = orders.subList(i, Math.min(i + BATCH_SIZE, orders.size()));

            for (OrderDetail order : batch) {
                hashOperations.put(HASH_ORDER_DETAIL, order.getOrder_detail_id(), order);
            }
            redisTemplate.expire(HASH_ORDER_DETAIL, 10, TimeUnit.MINUTES);
        }
    }

    public OrderDetail create(OrderDetail orderDetail) {
        OrderDetail orderDetail1 = orderDetailRepository.save(orderDetail);
        hashOperations.put(HASH_ORDER_DETAIL, orderDetail1.getOrder_detail_id(), orderDetail);
        TTL();
        return orderDetail1;
    }

    public OrderDetail findById(String orderDetailId) {
        if (hashOperations.hasKey(HASH_ORDER_DETAIL, orderDetailId)) {
            System.out.println("get detail by Id redis");
            return hashOperations.get(HASH_ORDER_DETAIL, orderDetailId);
        } else {
            System.out.println("get detail by Id db");
            OrderDetail orderDetail = orderDetailRepository.findById(orderDetailId)
                    .orElseThrow(() -> new RuntimeException("Cannot find OrderDetail with id: " + orderDetailId));
            hashOperations.put(HASH_ORDER_DETAIL, orderDetail.getOrder_detail_id(), orderDetail);
            TTL();
            return orderDetail;
        }
    }

}
