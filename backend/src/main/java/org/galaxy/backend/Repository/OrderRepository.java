package org.galaxy.backend.Repository;

import java.sql.Timestamp;
import java.util.List;

import feign.Param;
import org.galaxy.backend.Model.Order;
import org.galaxy.backend.Model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, String> {
    List<Order> findByUser(User user);

    @Query(value = "SELECT * FROM orders  ORDER BY time_created DESC", nativeQuery = true)
    Page<Order> findAllSortedByTime(Pageable pageable);

    List<Order> findAllByTime_createdBetween(@Param Timestamp time_created);
}
