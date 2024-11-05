package org.galaxy.backend.Repository;

import java.util.List;

import org.galaxy.backend.Model.Order;
import org.galaxy.backend.Model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import feign.Param;

@Repository
public interface OrderRepository extends JpaRepository<Order, String> {
    List<Order> findByUser(User user);

    @Query(value = "SELECT * FROM orders  ORDER BY time_created DESC", nativeQuery = true)
    Page<Order> findAllSortedByTime(Pageable pageable);

    @Query(value = "select * from orders where orders.time_created between :startDate and :endDate", nativeQuery = true)
    List<Order> findByTime_createdBetween(@Param("startDate") String startDate, @Param("endDate") String endDate);
}
