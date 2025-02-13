package org.galaxy.backend.Model.Products;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
public class Powerbank {

    private String brand; // Thương hiệu (ví dụ: "Anker", "Xiaomi", "Samsung")

    private Integer capacity; // Dung lượng pin (mAh)

    private String batteryType; // Loại pin (ví dụ: "Lithium Polymer", "Lithium-ion")

    private Integer inputPorts; // Số lượng cổng sạc đầu vào

    private Integer outputPorts; // Số lượng cổng sạc đầu ra

    private String inputType; // Loại cổng đầu vào (ví dụ: "Micro-USB, USB-C")

    private String outputType; // Loại cổng đầu ra (ví dụ: "USB-A, USB-C")

    private Integer maxOutputPower; // Công suất đầu ra tối đa (W)

    private Boolean fastCharging; // Hỗ trợ sạc nhanh (true/false)

    private Boolean wirelessCharging; // Hỗ trợ sạc không dây (true/false)

    private Boolean passthroughCharging; // Hỗ trợ vừa sạc vừa xả (true/false)

    private String safetyFeatures; // Tính năng an toàn (ví dụ: "Overcharge Protection, Short Circuit Protection")

    private String buildMaterial; // Chất liệu vỏ (ví dụ: "Plastic, Aluminum")

    private Double weight; // Trọng lượng (gram)

    private String dimensions; // Kích thước (ví dụ: "150 x 75 x 15 mm")

    private String color; // Màu sắc (ví dụ: "Black, White")

    private String warranty; // Thời gian bảo hành (ví dụ: "12 tháng")

    private Boolean waterproof; // Chống nước (true/false)
}
