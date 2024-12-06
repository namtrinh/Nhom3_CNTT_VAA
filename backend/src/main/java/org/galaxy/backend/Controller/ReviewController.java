package org.galaxy.backend.Controller;

import org.galaxy.backend.Model.Product;
import org.galaxy.backend.Model.Review;
import org.galaxy.backend.ModelDTO.response.ApiResponse;
import org.galaxy.backend.Repository.Reviewrepository;
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
    private Reviewrepository reviewrepository;

    @GetMapping
    public ApiResponse<Page<Review>> getAll(@RequestParam(defaultValue = "0") int page,
                                            @RequestParam(defaultValue = "20") int size){
        return ApiResponse.<Page<Review>>builder()
                .code(200)
                .result(reviewService.findAll(page, size))
                .build();
    }

    @GetMapping(value = "/{product}")
    public ApiResponse<Page<Review>> getAllByProduct(@PathVariable String product,
                                            @RequestParam(defaultValue = "0") int page,
                                            @RequestParam(defaultValue = "3") int size){
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

    @PutMapping(value = "/{reviewId}")
    public ApiResponse<Review> update(@PathVariable String reviewId){
        return ApiResponse.<Review>builder()
                .code(200)
                .result(reviewService.updateById(reviewId))
                .build();
    }

    @GetMapping(value = "filter")
    public ApiResponse<List<Review>> filter(@RequestParam String name,
                                            @RequestParam int rating){
        return ApiResponse.<List<Review>>builder()
                .code(200)
                .result(reviewrepository.getAllByProduct(name, rating))
                .build();
    }

    @DeleteMapping(value="/{reviewId}")
    public void delete(@PathVariable String reviewId){
        reviewService.deleteById(reviewId);
    }


}
