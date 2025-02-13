package org.galaxy.backend.Repository;

import java.util.List;

import org.galaxy.backend.Model.OrderDetailProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderDetailProductRepository extends JpaRepository<OrderDetailProduct, Integer> {

    @Query(
            value = "select * from order_detail_products where order_detail_order_detail_id = :orderDetailId "
                    + "and products_product_id = :productId",
            nativeQuery = true)
    OrderDetailProduct findByProducts_product_idAndOrder_detail_id(
            @Param("orderDetailId") String orderDetailId, @Param("productId") String productId);

    @Query(
            value = "select * from order_detail_products where order_detail_order_detail_id = :orderDetailId",
            nativeQuery = true)
    List<OrderDetailProduct> findByOrder_detail_id(@Param("orderDetailId") String orderDetailId);
}
