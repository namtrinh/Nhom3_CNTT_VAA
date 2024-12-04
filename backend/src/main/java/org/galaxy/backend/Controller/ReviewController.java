package org.galaxy.backend.Controller;

import org.galaxy.backend.Model.Product;
import org.galaxy.backend.Model.Review;
import org.galaxy.backend.ModelDTO.response.ApiResponse;
import org.galaxy.backend.Service.ProductService;
import org.galaxy.backend.Service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/review")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @Autowired
    private ProductService productService;

    @GetMapping(value = "/{product}")
    public ApiResponse<Page<Review>> getAll(@PathVariable Product product,
                                            @RequestParam(defaultValue = "0") int page,
                                            @RequestParam(defaultValue = "1") int size){
        return  ApiResponse.<Page<Review>>builder()
                .code(200)
                .result(reviewService.getReviewsForProduct(product, page, size))
                .build();
    }

    @PostMapping
    public ApiResponse<Review> create(@RequestBody Review review){
        return ApiResponse.<Review>builder()
                .code(200)
                .result(reviewService.save(review))
                .build();
    }


}
