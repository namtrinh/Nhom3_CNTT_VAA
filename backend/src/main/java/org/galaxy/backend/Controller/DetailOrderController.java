package org.galaxy.backend.Controller;

import java.util.List;

import org.galaxy.backend.Model.OrderDetail;
import org.galaxy.backend.ModelDTO.response.ApiResponse;
import org.galaxy.backend.Service.OrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/detail-order")
public class DetailOrderController {
    @Autowired
    private OrderDetailService orderDetailService;

    @GetMapping(value = "/{order_detail_id}")
    public ApiResponse<OrderDetail> getById(@PathVariable String order_detail_id) {
        return ApiResponse.<OrderDetail>builder()
                .code(200)
                .result(orderDetailService.findById(order_detail_id))
                .build();
    }

    @PostMapping
    public ApiResponse<OrderDetail> create(@RequestBody OrderDetail orderDetail) {
        return ApiResponse.<OrderDetail>builder()
                .code(200)
                .result(orderDetailService.create(orderDetail))
                .build();
    }
}
