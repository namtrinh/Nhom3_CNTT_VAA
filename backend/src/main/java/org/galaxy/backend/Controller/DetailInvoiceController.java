package org.galaxy.backend.Controller;

import java.util.List;

import org.galaxy.backend.ModelDTO.response.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import org.galaxy.backend.Model.OrderDetail;
import org.galaxy.backend.Service.OrderDetailService;

@RestController
@RequestMapping("/detail-invoice")
public class DetailInvoiceController {
    @Autowired
    private OrderDetailService orderDetailService;

    @GetMapping
    public ApiResponse<List<OrderDetail>> getAll() {
        return ApiResponse.<List<OrderDetail>>builder()
                .code(200)
                .result(orderDetailService.findAll())
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
