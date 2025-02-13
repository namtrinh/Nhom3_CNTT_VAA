package org.galaxy.backend.Controller;

import java.util.List;

import org.galaxy.backend.Model.OrderDetailProduct;
import org.galaxy.backend.ModelDTO.response.ApiResponse;
import org.galaxy.backend.Repository.OrderDetailProductRepository;
import org.galaxy.backend.Service.OrderDetailProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/v")
public class OrderDetailProductController {

    @Autowired
    private OrderDetailProductService orderDetailProductService;

    @Autowired
    private OrderDetailProductRepository orderDetailProductRepository;

    @PostMapping
    public ApiResponse<OrderDetailProduct> UpdateOrderDetailProduct(
            @RequestParam String orderDetailId,
            @RequestParam String productId,
            @RequestBody OrderDetailProduct orderDetailProduct) {
        return ApiResponse.<OrderDetailProduct>builder()
                .code(200)
                .result(orderDetailProductService.UpdateById(orderDetailId, productId, orderDetailProduct))
                .build();
    }

    @GetMapping(value = "/{orderDetailId}")
    public ApiResponse<List<OrderDetailProduct>> getByOrderDetailId(@PathVariable String orderDetailId) {
        return ApiResponse.<List<OrderDetailProduct>>builder()
                .code(200)
                .result(orderDetailProductRepository.findByOrder_detail_id(orderDetailId))
                .build();
    }
}
