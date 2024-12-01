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
public class Tablet  {
    @Column(nullable = false)
    private String brand; // Thương hiệu (ví dụ: "Apple", "Samsung", "Lenovo")

    @Column(nullable = false)
    private String operatingSystem; // Hệ điều hành (ví dụ: "iOS", "Android", "Windows")

    @Column(nullable = false)
    private Double screenSize; // Kích thước màn hình (đơn vị: inch)

    @Column(nullable = false)
    private String resolution; // Độ phân giải màn hình (ví dụ: "2732x2048", "1920x1200")

    @Column(nullable = false)
    private String processor; // Bộ vi xử lý (ví dụ: "Apple M2", "Snapdragon 8 Gen 2")

   @Column(nullable = false)
    private Integer ram; // RAM (đơn vị: GB)

   @Column(nullable = false)
    private Integer storage; // Dung lượng lưu trữ (đơn vị: GB)

   @Column(nullable = false)
    private Boolean expandableStorage; // Có hỗ trợ thẻ nhớ không (true/false)

    @Column(nullable = false)
    private Integer batteryCapacity; // Dung lượng pin (đơn vị: mAh)

   @Column(nullable = false)
    private Boolean stylusSupport; // Có hỗ trợ bút cảm ứng không (true/false)

   @Column(nullable = false)
    private String connectivity; // Kết nối (ví dụ: "Wi-Fi, 4G LTE, 5G")

   @Column(nullable = false)
    private String camera; // Camera (ví dụ: "12MP Front, 10MP Rear")

   @Column(nullable = false)
    private Double weight; // Trọng lượng (đơn vị: kg)

   @Column(nullable = false)
    private String color; // Màu sắc (ví dụ: "Space Gray", "Silver")

   @Column(nullable = false)
    private String warranty; // Bảo hành (ví dụ: "12 tháng", "24 tháng")
}
