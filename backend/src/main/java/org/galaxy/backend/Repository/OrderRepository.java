package org.galaxy.backend.Repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import org.galaxy.backend.Model.Order;
import org.galaxy.backend.Model.User;

@Repository
public interface OrderRepository extends JpaRepository<Order, String> {
    List<Order> findByUser(User user);

    @Query(value = "SELECT i FROM order i ORDER BY i.time_created DESC", nativeQuery = true)
    Page<Order> findAllSortedByTime(Pageable pageable);
}
