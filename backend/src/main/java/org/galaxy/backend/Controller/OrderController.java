package org.galaxy.backend.Controller;

import java.util.List;

import org.galaxy.backend.Model.Order;
import org.galaxy.backend.Model.User;
import org.galaxy.backend.ModelDTO.response.ApiResponse;
import org.galaxy.backend.Service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping
    public ApiResponse<Page<Order>> getAll(
            @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
        Page<Order> invoices = orderService.findAll(page, size);
        return ApiResponse.<Page<Order>>builder().code(200).result(invoices).build();
    }

    @GetMapping(value = "/my-order/{user}")
    public ApiResponse<List<Order>> getAllByUser_id(@PathVariable User user) {
        return ApiResponse.<List<Order>>builder()
                .code(200)
                .result(orderService.getByUser(user))
                .build();
    }

    @GetMapping(value = "/{order_id}")
    public ApiResponse<Order> getById(@PathVariable String order_id) {
        return ApiResponse.<Order>builder()
                .code(200)
                .result(orderService.findById(order_id))
                .build();
    }

    @GetMapping(value = "/date")
    public ApiResponse<List<Order>> getByTime(@RequestParam String startDate, @RequestParam String endDate) {
        return ApiResponse.<List<Order>>builder()
                .code(200)
                .result(orderService.getByTime(startDate, endDate))
                .build();
    }

    @PostMapping
    public ApiResponse<Order> create(@RequestBody Order order) {
        return ApiResponse.<Order>builder()
                .code(200)
                .result(orderService.save(order))
                .build();
    }
}
