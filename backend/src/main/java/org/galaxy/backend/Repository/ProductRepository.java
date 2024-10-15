package org.galaxy.backend.Repository;

import java.util.List;

import org.galaxy.backend.Model.Category;
import org.galaxy.backend.Model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, String> {
    boolean existsByName(String name);

    List<Product> findProductByCategory(Category category);

    List<Product> findByNameContainingIgnoreCase(String name);

    @Query(
            value =
                    "select * from product join category on category.category_id = product.category_id where product.category_id =: category_id",
            nativeQuery = true)
    List<Product> findByCategory(@Param("category_id") Category category_id);

    @Query(value = "select quantity from product where product.product_id =:id", nativeQuery = true)
    Integer findAvailableQuantityById(String id);

    Product getBySeotitle(String seotitle);

    @Query(
            value =
                    "SELECT * FROM product LEFT JOIN product_promotion on product.product_id = product_promotion.product_product_id"
                            + " where product.promotion is null",
            nativeQuery = true)
    List<Product> findAllProductIgnorePromote();
}
