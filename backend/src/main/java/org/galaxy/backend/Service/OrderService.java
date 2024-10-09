package org.galaxy.backend.Service;

import java.util.List;

import org.springframework.data.domain.Page;

import org.galaxy.backend.Model.Order;
import org.galaxy.backend.Model.User;

public interface OrderService {

    List<Order> getByUser(User user);

    Page<Order> findAll(int pageNo, int pageSize);

    Order save(Order entity);

    Order findById(String integer);

    void deleteById(String integer);
}
