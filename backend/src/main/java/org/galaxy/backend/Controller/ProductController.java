package org.galaxy.backend.Controller;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.galaxy.backend.Model.Category;
import org.galaxy.backend.Model.Product;
import org.galaxy.backend.Model.Promotion;
import org.galaxy.backend.ModelDTO.response.ApiResponse;
import org.galaxy.backend.Repository.ProductRepository;
import org.galaxy.backend.Service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping(value = "/product")
public class ProductController {
    @Autowired
    private ProductService productService;

    @Value("${upload.dir}")
    private String uploadDir;

    @Autowired
    private ProductRepository productRepository;

    @GetMapping
    public ApiResponse<List<Product>> findAll() {
        var result = productRepository.findAll();
        result.sort((a, b) -> b.getTime_created().compareTo(a.getTime_created()));
        return ApiResponse.<List<Product>>builder().code(200).result(result).build();
    }

    @GetMapping(value = "/findAllProductsWithPromotion")
    public ApiResponse<List<Product>> findAllProductsWithPromotion() {
        var result = productService.findAllProductsWithPromotion();
        result.sort((a, b) -> b.getTime_created().compareTo(a.getTime_created()));
        return ApiResponse.<List<Product>>builder().code(200).result(result).build();
    }

    @GetMapping(value = "/findAllProductsWithoutPromotion")
    public ApiResponse<List<Product>> findAllProductsWithoutPromotion() {
        var result = productService.findAllProductsWithoutPromotion();
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

    @PutMapping(value = "/{product_id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<Product> updateProduct(
            @PathVariable String product_id,
            @RequestParam Map<String, String> params,
            @RequestParam(value = "image", required = false) MultipartFile image)
            throws IOException {

        Product product = productService.findById(product_id);
        if (image != null && !image.isEmpty()) {
            String imagePath = "C:/My_Documents/KI_7/DACN/firefly-galaxy/" + uploadDir + image.getOriginalFilename();
            image.transferTo(new File(imagePath));
            product.setImage(image.getOriginalFilename());
        }
        product.setName(params.get("name"));
        product.setQuantity(Integer.parseInt(params.get("quantity")));
        product.setPrice(Double.parseDouble(params.get("price")));
        product.setDescription(params.get("description"));
        String categoryValue = params.get("category");
        Category category = new Category();
        category.setCategory_id(Integer.parseInt(categoryValue));
        product.setCategory(category);

        if (params.get("promotion") != null) {
            String promotionValue = params.get("promotion");
            Promotion promotion = new Promotion();
            promotion.setPromotion_id(promotionValue);
            product.setPromotion(promotion);
        } else {
            product.setPromotion(null); // Nếu không có chương trình khuyến mãi, có thể đặt về null
        }
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
