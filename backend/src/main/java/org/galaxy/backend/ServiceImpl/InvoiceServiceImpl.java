package org.galaxy.backend.ServiceImpl;

import java.sql.Timestamp;
import java.util.List;

import jakarta.transaction.Transactional;

import org.galaxy.backend.Model.Order;
import org.galaxy.backend.Model.User;
import org.galaxy.backend.Repository.OrderRepository;
import org.galaxy.backend.Service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class InvoiceServiceImpl implements OrderService {
    @Autowired
    private OrderRepository orderRepository;

    @Override
    public List<Order> getByUser(User user) {
        return orderRepository.findByUser(user);
    }

    public List<Order> getAll(){
        return this.orderRepository.findAll();
    }

    @Override
    public Page<Order> findAll(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return orderRepository.findAllSortedByTime(pageable);
    }

    @Override
    public Order save(Order entity) {
        return orderRepository.save(entity);
    }

    @Override
    public Order findById(String integer) {
        return orderRepository.findById(integer).orElseThrow(() -> new RuntimeException("Not found"));
    }

    @Override
    public void deleteById(String integer) {
        orderRepository.deleteById(integer);
    }

    public List<Order> getByTime(String startDate, String endDate) {
        return orderRepository.findByTime_createdBetween(startDate, endDate);
    }
}
