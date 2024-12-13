package org.galaxy.backend.Service;

import java.util.List;

import org.galaxy.backend.Model.Order;
import org.galaxy.backend.Model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.Query;

public interface OrderService {

    List<Order> getByUser(User user);

    Page<Order> findAll(int pageNo, int pageSize);

    Order save(Order entity);

    Order findById(String integer);

    void deleteById(String integer);

    @Query(value = "SELECT * FROM orders WHERE orders.time_created := startDate " +
            "and orders.time_created And orders.status = 'Completed' ", nativeQuery = true)
    List<Order> getByTime(String startDate, String endDate);
}
