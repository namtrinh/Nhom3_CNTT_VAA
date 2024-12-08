package org.galaxy.backend.Repository;

import org.galaxy.backend.Model.Product;
import org.galaxy.backend.Model.Review;
import org.galaxy.backend.Model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface Reviewrepository extends JpaRepository<Review, String> {

    @Query(value = "SELECT * FROM review WHERE review.product_product_id = :productId and review.status_cmt = 'APPROVED'" +
            " ORDER BY review_date DESC", nativeQuery = true)
    Page<Review> findAllByProduct(@Param("productId") String product, Pageable pageable);

    @Query(value = "SELECT * from review\n" +
            "inner join product\n" +
            "on product.product_id = review.product_product_id\n" +
            "WHERE (:name IS NULL OR :name = '' OR LOWER(product.name) LIKE LOWER(CONCAT('%', :name, '%'))) " +
            "AND (:rating IS NULL OR :rating = 0 OR review.rating = :rating) ORDER BY review_date DESC"
            , nativeQuery = true)
    List<Review> getAllByProduct(String name, int rating);

    @Query(value = "SELECT * FROM review ORDER BY review_date DESC", nativeQuery = true)
    Page<Review> findAllReview(Pageable pageable);

    @Query(value = "SELECT * from review where review.product_product_id = :productId AND review.status_cmt = 'APPROVED'",nativeQuery = true)
    List<Review> getAllByProductId(String productId);
}
