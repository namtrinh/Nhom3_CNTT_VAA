package org.galaxy.backend.Controller;

import java.util.List;

import org.galaxy.backend.ModelDTO.response.ApiResponse;
import org.galaxy.backend.Repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import org.galaxy.backend.Model.Category;
import org.galaxy.backend.Model.Product;
import org.galaxy.backend.Service.ProductService;

@RestController
@RequestMapping(value = "/product")
public class ProductController {
    @Autowired
    private ProductService productService;

    @Value("${upload.dir}")
    private String uploadDir;

    @Autowired
    private CategoryRepository categoryRepository;

    @GetMapping
    public ApiResponse<List<Product>> getAll() {
        var result = productService.findAll();
        result.sort((a, b) -> b.getTime_created().compareTo(a.getTime_created()));
        return ApiResponse.<List<Product>>builder().code(200).result(result).build();
    }

    @GetMapping("/products")
    public Page<Product> getProducts(
            @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "2") int size) {
        return productService.getProducts(page, size);
    }

    @GetMapping(value = "/v/{seotitle}")
    public ApiResponse<Product> getBySeotitle(@PathVariable("seotitle") String seotitle) {
        return ApiResponse.<Product>builder()
                .code(200)
                .result(productService.getBySeotitle(seotitle))
                .build();
    }

    @GetMapping(value = "/{product_id}")
    public ApiResponse<Product> getById(@PathVariable("product_id") String product_id) {
        return ApiResponse.<Product>builder()
                .code(200)
                .result(productService.findById(product_id))
                .build();
    }

    @GetMapping(value = "/product")
    @ResponseBody
    public ApiResponse<List<Product>> getProductByCategory(@RequestParam Category category) {
        return ApiResponse.<List<Product>>builder()
                .code(200)
                .result(productService.findProductsByCategory(category))
                .build();
    }

    @GetMapping(value = "/sale")
    public ApiResponse<List<Product>> getAllSale() {
        return ApiResponse.<List<Product>>builder()
                .code(201)
                .result(productService.getAllSale())
                .build();
    }

    @GetMapping(value = "/ig-sale")
    public ApiResponse<List<Product>> getAllNoSale() {
        return ApiResponse.<List<Product>>builder()
                .code(201)
                .result(productService.getAllNoSale())
                .build();
    }

    @GetMapping(value = "/category")
    public ApiResponse<List<Product>> getProductsByCategory(@RequestParam Category category_id) {
        return ApiResponse.<List<Product>>builder()
                .code(201)
                .result(productService.findProductsByCategory(category_id))
                .build();
    }

    @GetMapping(value = "/search_pr")
    @ResponseBody
    public ApiResponse<List<Product>> searchProducts(@RequestParam String name) {
        return ApiResponse.<List<Product>>builder()
                .code(200)
                .result(productService.searchProduct(name))
                .build();
    }

    @PostMapping
    public ApiResponse<Product> createProduct(@RequestBody Product product) {
        return ApiResponse.<Product>builder()
                .code(200)
                .result(productService.save(product))
                .build();
    }

    @PutMapping(value = "/{product_id}")
    public ApiResponse<Product> updateProduct(@PathVariable String product_id, @RequestBody Product product) {
        return ApiResponse.<Product>builder()
                .code(200)
                .result(productService.editProduct(product_id, product))
                .build();
    }

    @DeleteMapping(value = "/{product_id}")
    public ApiResponse<String> deleteProduct(@PathVariable String product_id) {
        productService.deleteById(product_id);
        return ApiResponse.<String>builder()
                .result("Product have been deleted")
                .code(200)
                .build();
    }
}
