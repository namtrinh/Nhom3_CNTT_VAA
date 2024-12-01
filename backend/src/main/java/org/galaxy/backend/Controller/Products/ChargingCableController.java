package org.galaxy.backend.Controller.Products;

import org.galaxy.backend.Model.Category;
import org.galaxy.backend.Model.Products.ChargingCable;
import org.galaxy.backend.ModelDTO.response.ApiResponse;
import org.galaxy.backend.Service.CloudinaryService;
import org.galaxy.backend.Service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Controller
@RequestMapping("/chargingcable")
public class ChargingCableController {
/*
    @Autowired
    private ProductService productService;

    @Autowired
    private CloudinaryService cloudinaryService;

    @PostMapping
    public ApiResponse<ChargingCable> createChargingCable(
            @RequestParam Map<String, String> params,
            @RequestParam(value = "image", required = true) MultipartFile image) throws IOException {

        ChargingCable chargingCable = new ChargingCable();


        // Thiết lập danh mục sản phẩm
        Category category = new Category();
        category.setCategory_id(params.get("category_id"));
        chargingCable.setCategory(category);

        // Thiết lập các thuộc tính chung cho tất cả sản phẩm
        chargingCable.setName(params.get("name"));
        chargingCable.setSeotitle(params.get("seotitle"));
        chargingCable.setQuantity(Integer.parseInt(params.get("quantity")));
        chargingCable.setPrice(Double.parseDouble(params.get("price")));
        // Thiết lập các thuộc tính riêng biệt cho ChargingCable
        chargingCable.setConnectorType(params.get("connectorType"));
        chargingCable.setLength(Double.parseDouble(params.get("length")));
        chargingCable.setMaxPower(Integer.parseInt(params.get("maxPower")));
        chargingCable.setDataTransferRate(Integer.parseInt(params.get("dataTransferRate")));
        chargingCable.setMaterial(params.get("material"));
        chargingCable.setFastCharging(Boolean.parseBoolean(params.get("fastCharging")));
        chargingCable.setCompatibleDevices(params.get("compatibleDevices"));
        chargingCable.setBrand(params.get("brand"));
        chargingCable.setWarranty(params.get("warranty"));

        // Nếu có ảnh, lưu lên Cloudinary hoặc hệ thống của bạn
        String imageUrl = cloudinaryService.uploadFile(image);
        chargingCable.setImage(imageUrl);

        // Lưu sản phẩm vào cơ sở dữ liệu
        return ApiResponse.<ChargingCable>builder()
                .code(200)
                .result(productService.save(chargingCable))
                .build();
    }

 */
}
