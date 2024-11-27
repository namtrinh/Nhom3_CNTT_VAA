package org.galaxy.backend.Controller;

import java.util.List;

import org.galaxy.backend.Model.Cart;
import org.galaxy.backend.ModelDTO.response.ApiResponse;
import org.galaxy.backend.Repository.CartRepository;
import org.galaxy.backend.Service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    private CartRepository cartRepository;

    @GetMapping
    public ApiResponse<List<Cart>> findAllByUserId(@RequestParam("user_id") String user_id) {
        List<Cart> cartList = cartService.findAllByUserId(user_id);
        cartList.sort((a, b) -> b.getTime_add().compareTo(a.getTime_add()));
        return ApiResponse.<List<Cart>>builder()
                .code(200)
                .result(cartList)
                .build();
    }

    @PostMapping
    public ApiResponse<Cart> create(@RequestBody Cart cart) {
        return ApiResponse.<Cart>builder()
                .code(201)
                .result(cartService.save(cart))
                .build();
    }

    @DeleteMapping(value = "/{cart_id}")
    public void delete(@PathVariable String cart_id) {
        cartService.deleteById(cart_id);
    }

    @PutMapping(value = "/{cart_id}")
    public ApiResponse<Cart> updateCart(@PathVariable String cart_id, @RequestBody Cart cart) {
        return ApiResponse.<Cart>builder()
                .code(200)
                .result(cartService.editcart(cart_id, cart))
                .build();
    }
}
