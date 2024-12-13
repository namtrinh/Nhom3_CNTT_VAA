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

    public OrderDetail create(OrderDetail orderDetail) {
        OrderDetail orderDetail1 = orderDetailRepository.save(orderDetail);
        hashOperations.put(HASH_ORDER_DETAIL, orderDetail1.getOrder_detail_id(), orderDetail);
        TTL();
        return orderDetail1;
    }



    public OrderDetail findById(String s) {
        if(hashOperations.hasKey(HASH_ORDER_DETAIL, s)){
            return hashOperations.get(HASH_ORDER_DETAIL, s);
        }else {
            OrderDetail orderDetail = orderDetailRepository.findById(s).orElseThrow(() -> new RuntimeException("Cannot find"));
            hashOperations.put(HASH_ORDER_DETAIL, orderDetail.getOrder_detail_id(), orderDetail);
            TTL();
            return orderDetail;
        }
    }
}
