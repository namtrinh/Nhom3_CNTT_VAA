package org.galaxy.backend.Repository;

import org.galaxy.backend.Model.Product;
import org.galaxy.backend.Model.Review;
import org.galaxy.backend.Model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface Reviewrepository extends JpaRepository<Review, String> {

    Page<Review> findAllByProduct(Product product, Pageable pageable);
}
