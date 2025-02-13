package org.galaxy.backend.Repository;

import java.util.List;

import org.galaxy.backend.Model.Cart;
import org.galaxy.backend.Model.Product;
import org.galaxy.backend.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepository extends JpaRepository<Cart, String> {

    @Query(
            value = "SELECT * FROM cart JOIN users ON cart.user_user_id = users.user_id WHERE users.user_id = :user_id",
            nativeQuery = true)
    public List<Cart> findAllByUserId(@Param("user_id") String userId);

    public boolean existsCartByProductAndUser(Product product, User user);

    public Cart findCartByProductAndUser(Product product, User user);

    @Query(
            value = "SELECT * FROM cart WHERE cart.product_product_id = :product " + "AND cart.user_user_id = :user",
            nativeQuery = true)
    public Cart findByProductAndUser(@Param("product") String product, @Param("user") String user);
}
