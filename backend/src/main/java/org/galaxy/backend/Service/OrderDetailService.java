package org.galaxy.backend.Service;

import java.util.List;

import org.galaxy.backend.Repository.OrderDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.galaxy.backend.Model.OrderDetail;

@Service
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
