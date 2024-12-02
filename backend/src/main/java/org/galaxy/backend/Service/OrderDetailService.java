package org.galaxy.backend.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicReference;

import lombok.extern.slf4j.Slf4j;
import org.galaxy.backend.Model.Cart;
import org.galaxy.backend.Model.OrderDetail;
import org.galaxy.backend.Model.Product;
import org.galaxy.backend.Repository.CartRepository;
import org.galaxy.backend.Repository.OrderDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class OrderDetailService {
    @Autowired
    private OrderDetailRepository orderDetailRepository;


    public List<OrderDetail> findAll() {
        return orderDetailRepository.findAll();
    }

    public OrderDetail create(OrderDetail orderDetail) {
        return orderDetailRepository.save(orderDetail);
    }


    public OrderDetail findById(String s) {
        return orderDetailRepository.findById(s).orElseThrow(() -> new RuntimeException("Cannot find"));
    }
}
