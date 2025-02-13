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
public class Tablet {

    private String brand; // Thương hiệu (ví dụ: "Apple", "Samsung", "Lenovo")

    private String operatingSystem; // Hệ điều hành (ví dụ: "iOS", "Android", "Windows")

    private Double screenSize; // Kích thước màn hình (đơn vị: inch)

    private String resolution; // Độ phân giải màn hình (ví dụ: "2732x2048", "1920x1200")

    private String processor; // Bộ vi xử lý (ví dụ: "Apple M2", "Snapdragon 8 Gen 2")

    private Integer ram; // RAM (đơn vị: GB)

    private Integer storage; // Dung lượng lưu trữ (đơn vị: GB)

    private Boolean expandableStorage; // Có hỗ trợ thẻ nhớ không (true/false)

    private Integer batteryCapacity; // Dung lượng pin (đơn vị: mAh)

    private Boolean stylusSupport; // Có hỗ trợ bút cảm ứng không (true/false)

    private String connectivity; // Kết nối (ví dụ: "Wi-Fi, 4G LTE, 5G")

    private String camera; // Camera (ví dụ: "12MP Front, 10MP Rear")

    private Double weight; // Trọng lượng (đơn vị: kg)

    private String color; // Màu sắc (ví dụ: "Space Gray", "Silver")

    private String warranty; // Bảo hành (ví dụ: "12 tháng", "24 tháng")
}
