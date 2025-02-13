package org.galaxy.backend.Controller;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import org.galaxy.backend.Model.Category;
import org.galaxy.backend.Model.Product;
import org.galaxy.backend.Model.Promotion;
import org.galaxy.backend.ModelDTO.response.ApiResponse;
import org.galaxy.backend.Repository.ProductRepository;
import org.galaxy.backend.Service.CloudinaryService;
import org.galaxy.backend.Service.ProductService;
import org.galaxy.backend.Service.ReadExel.ReadExelProduct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping(value = "/product")
public class ProductController {
    @Autowired
    private ProductService productService;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CloudinaryService cloudinaryService;

    @GetMapping
    public ApiResponse<Page<Product>> findAll(@RequestParam int page, @RequestParam int size) {
        var result = productService.findAllByPage(page, size);
        return ApiResponse.<Page<Product>>builder().code(200).result(result).build();
    }

    @GetMapping(value = "/getByCategory")
    public ApiResponse<List<Product>> getByCategory(@RequestParam String category) {
        var result = productService.getByCategory(category);
        result.sort((a, b) -> b.getTime_created().compareTo(a.getTime_created()));
        return ApiResponse.<List<Product>>builder().code(200).result(result).build();
    }

    @GetMapping(value = "/findAllProductsWithPromotion")
    public ApiResponse<List<Product>> findAllProductsWithPromotion() {
        var result = productService.findAllProductsWithPromotion();
        result.sort((a, b) -> b.getTime_created().compareTo(a.getTime_created()));
        return ApiResponse.<List<Product>>builder().code(200).result(result).build();
    }

    @GetMapping(value = "/page")
    public ApiResponse<Page<Product>> getAllByPage(@RequestParam int page, @RequestParam int size) {
        return ApiResponse.<Page<Product>>builder()
                .code(200)
                .result(productService.findAllByPage(page, size))
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

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<Product> createProduct(
            @RequestParam Map<String, String> params,
            @RequestParam(value = "image", required = false) MultipartFile image) {

        Product product = new Product();

        String fileUrl = cloudinaryService.uploadFile(image);
        product.setImage(fileUrl);

        product.setName(params.get("name"));
        product.setSeotitle(params.get("seotitle"));
        product.setQuantity(Integer.parseInt(params.get("quantity")));
        product.setPrice(Double.parseDouble(params.get("price")));
        product.setDescription(params.get("description"));
        product.setTime_created(LocalDateTime.now());

        if (params.get("stockStatus").equals("In_Stock")) {
            product.setStockStatus(Product.StockStatusPr.In_Stock);
        }

        String categoryValue = params.get("category");
        Category category = new Category();
        category.setCategory_id(categoryValue);
        product.setCategory(category);

        product.setPromotion(null);
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
            cloudinaryService.deleteFile(product.getImage());
            String fileUrl = cloudinaryService.uploadFile(image);
            product.setImage(fileUrl);
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

        if (params.get("stock_stastus").equals("In_Stock")) {
            product.setStockStatus(Product.StockStatusPr.In_Stock);
        } else {
            product.setStockStatus(Product.StockStatusPr.Out_of_Stock);
        }

        if (params.get("quantity").equals("0")) {
            product.setStockStatus(Product.StockStatusPr.Out_of_Stock);
        } else {
            product.setStockStatus(Product.StockStatusPr.In_Stock);
        }

        if (params.get("promotion") != null) {
            String promotionValue = params.get("promotion");
            Promotion promotion = new Promotion();
            promotion.setPromotion_id(promotionValue);
            product.setPromotion(promotion);
        } else {
            product.setPromotion(null);
        }
        return ApiResponse.<Product>builder()
                .code(200)
                .result(productService.editProduct(product_id, product))
                .build();
    }

    @DeleteMapping(value = "/del/{product_id}")
    public ApiResponse<String> deleteProduct(@PathVariable String product_id) {
        productService.deleteById(product_id);
        return ApiResponse.<String>builder()
                .result("Product has been deleted")
                .code(200)
                .build();
    }

    @PostMapping("/excel/upload")
    public ApiResponse<String> uploadFile(@RequestParam("file") MultipartFile file) {
        if (ReadExelProduct.hasExcelFormat(file)) {
            try {
                return ApiResponse.<String>builder()
                        .code(200)
                        .message("The Excel file is uploaded: " + file.getOriginalFilename())
                        .result(productService.savePrEx(file))
                        .build();
            } catch (Exception exp) {
                return ApiResponse.<String>builder()
                        .code(400)
                        .message("The Excel file is not upload: " + file.getOriginalFilename() + "!")
                        .build();
            }
        }
        return ApiResponse.<String>builder()
                .code(200)
                .message("The Excel file is uploaded: " + file.getOriginalFilename())
                .result(productService.savePrEx(file))
                .build();
    }

    @GetMapping(value = "/search")
    public ApiResponse<List<Product>> searchProduct(@RequestParam String name, @RequestParam String category) {
        return ApiResponse.<List<Product>>builder()
                .code(200)
                .result(productService.searchProductsByName(name, category))
                .build();
    }
}

/*      if (image != null && !image.isEmpty()) {
			String imagePath = "C:/My_Documents/KI_7/DACN/firefly-galaxy/" + uploadDir + image.getOriginalFilename();
			image.transferTo(new File(imagePath));
			product.setImage(image.getOriginalFilename());
		}

*/
