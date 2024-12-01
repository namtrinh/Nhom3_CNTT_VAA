package org.galaxy.backend.Model.Products;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.galaxy.backend.Model.Product;


@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
public class Powerbank  {

    @Column(nullable = false)
    private String brand; // Thương hiệu (ví dụ: "Anker", "Xiaomi", "Samsung")

    @Column(nullable = false)
    private Integer capacity; // Dung lượng pin (mAh)

     @Column(nullable = false)
    private String batteryType; // Loại pin (ví dụ: "Lithium Polymer", "Lithium-ion")

     @Column(nullable = false)
    private Integer inputPorts; // Số lượng cổng sạc đầu vào

     @Column(nullable = false)
    private Integer outputPorts; // Số lượng cổng sạc đầu ra

     @Column(nullable = false)
    private String inputType; // Loại cổng đầu vào (ví dụ: "Micro-USB, USB-C")

     @Column(nullable = false)
    private String outputType; // Loại cổng đầu ra (ví dụ: "USB-A, USB-C")

     @Column(nullable = false)
    private Integer maxOutputPower; // Công suất đầu ra tối đa (W)

     @Column(nullable = false)
    private Boolean fastCharging; // Hỗ trợ sạc nhanh (true/false)

     @Column(nullable = false)
    private Boolean wirelessCharging; // Hỗ trợ sạc không dây (true/false)

     @Column(nullable = false)
    private Boolean passthroughCharging; // Hỗ trợ vừa sạc vừa xả (true/false)

     @Column(nullable = false)
    private String safetyFeatures; // Tính năng an toàn (ví dụ: "Overcharge Protection, Short Circuit Protection")

     @Column(nullable = false)
    private String buildMaterial; // Chất liệu vỏ (ví dụ: "Plastic, Aluminum")

     @Column(nullable = false)
    private Double weight; // Trọng lượng (gram)

     @Column(nullable = false)
    private String dimensions; // Kích thước (ví dụ: "150 x 75 x 15 mm")

     @Column(nullable = false)
    private String color; // Màu sắc (ví dụ: "Black, White")

     @Column(nullable = false)
    private String warranty; // Thời gian bảo hành (ví dụ: "12 tháng")

     @Column(nullable = false)
    private Boolean waterproof; // Chống nước (true/false)
}
