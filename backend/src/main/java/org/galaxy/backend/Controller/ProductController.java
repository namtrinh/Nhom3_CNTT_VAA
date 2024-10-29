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

    @GetMapping(value="/page")
    public ApiResponse<Page<Product>> getAllByPage(@RequestParam int page, @RequestParam int size){
        return ApiResponse.<Page<Product>>builder()
                .code(200)
                .result(productService.findAllByPage(page,size))
                .build();
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
        product.setSeotitle(params.get("seotitle"));
        product.setQuantity(Integer.parseInt(params.get("quantity")));
        product.setPrice(Double.parseDouble(params.get("price")));
        product.setDescription(params.get("description"));
        String categoryValue = params.get("category");
        Category category = new Category();
        category.setCategory_id(categoryValue);
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
        try {
            productService.deleteById(product_id);
            return ApiResponse.<String>builder()
                    .result("Product has been deleted")
                    .code(200)
                    .build();
        } catch (Exception e) {
            return ApiResponse.<String>builder()
                    .result("Error deleting product: " + e.getMessage())
                    .code(500)
                    .build();
        }
    }
}
