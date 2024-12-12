package org.galaxy.backend.Repository;

import java.util.List;

import org.galaxy.backend.Model.Product;
import org.galaxy.backend.Model.Promotion;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, String> {
    boolean existsByName(String name);

    @Query(value = "select quantity from product where product.product_id =:id", nativeQuery = true)
    Integer findAvailableQuantityById(String id);

    Product getBySeotitle(String seotitle);

    @Query("SELECT p FROM Product p WHERE p.promotion IS NOT NULL")
    List<Product> findAllProductsWithPromotion();

    @Query(value = "select * from product inner join category " +
            "on category.category_id = product.category_category_id " +
            "where product.category_category_id = :category ORDER BY time_created DESC",
            nativeQuery = true)
    List<Product> getByCategory(@Param("category") String category);

    @Query(value = "SELECT * FROM product " +
            "WHERE (:name IS NULL OR :name = '' OR LOWER(name) LIKE LOWER(CONCAT('%', :name, '%'))) " +
            "AND (:category IS NULL OR :category = '' OR category_category_id = :category) ORDER BY time_created DESC", nativeQuery = true)
    List<Product> searchByNameOrCategory(
            @Param("name") String name,
            @Param("category") String category);

    List<Product> findByPromotion(Promotion promotion);

}
