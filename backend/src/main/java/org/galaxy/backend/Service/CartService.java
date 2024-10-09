package org.galaxy.backend.Service;

import java.util.List;
import java.util.Optional;

import org.galaxy.backend.Repository.CartRepository;
import org.galaxy.backend.Repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.galaxy.backend.Model.Cart;
import org.galaxy.backend.Model.Product;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductRepository productRepository;

    public List<Cart> findAllByUserId(String user_id) {
        return cartRepository.findAllByUserId(user_id);
    }

    public Cart save(Cart entity) {
        Product product = entity.getProduct();
        int availableQuantity = productRepository.findAvailableQuantityById(product.getProduct_id());
        if (cartRepository.existsCartByProductAndUser(product, entity.getUser())) {
            Cart existingCart = cartRepository.findCartByProductAndUser(product, entity.getUser());
            int newQuantity = existingCart.getProduct_quantity() + entity.getProduct_quantity();
            if (newQuantity > availableQuantity) {
                throw new RuntimeException("Over the limit");
            }
            existingCart.setProduct_quantity(newQuantity);
            return cartRepository.save(existingCart);
        } else {
            return cartRepository.save(entity);
        }
    }

    public Optional<Cart> findById(String string) {
        return cartRepository.findById(string);
    }

    public void deleteById(String cart_id) {
        cartRepository.deleteById(cart_id);
    }

    public Cart editcart(String id, Cart cart) {
        cart.setCart_id(id);
        return cartRepository.save(cart);
    }
}
