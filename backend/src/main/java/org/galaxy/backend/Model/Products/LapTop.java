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
public class LapTop   {
    @Column(nullable = false)
    private String brand; // Thương hiệu (ví dụ: "Dell", "Apple", "HP")

    @Column(nullable = false)
    private String modelNumber; // Mã số model (ví dụ: "XPS139310")

    @Column(nullable = false)
    private String processor; // Bộ vi xử lý (CPU) (ví dụ: "Intel Core i7-1260P", "AMD Ryzen 7 5800H")

    @Column(nullable = false)
    private Integer cores; // Số nhân CPU (ví dụ: 8)

    @Column(nullable = false)
    private Integer threads; // Số luồng CPU (ví dụ: 16)

    @Column(nullable = false)
    private Double baseClockSpeed; // Tốc độ xung nhịp cơ bản (GHz)

    @Column(nullable = false)
    private Double maxClockSpeed; // Tốc độ xung nhịp tối đa (GHz)

    @Column(nullable = false)
    private Integer ram; // Dung lượng RAM (GB)

    @Column(nullable = false)
    private String ramType; // Loại RAM (ví dụ: "DDR4", "LPDDR5")

    @Column(nullable = false)
    private Integer storage; // Dung lượng lưu trữ (GB)

    @Column(nullable = false)
    private String storageType; // Loại lưu trữ (ví dụ: "SSD NVMe", "HDD", "Hybrid")

    @Column(nullable = false)
    private Double screenSize; // Kích thước màn hình (inch)

    @Column(nullable = false)
    private String resolution; // Độ phân giải (ví dụ: "1920x1080", "4K UHD")

    @Column(nullable = false)
    private String screenType; // Loại màn hình (ví dụ: "IPS", "OLED", "Touchscreen")

    @Column(nullable = false)
    private String gpu; // Card đồ họa (ví dụ: "NVIDIA RTX 3060", "Intel Iris Xe")

    @Column(nullable = false)
    private Integer batteryCapacity; // Dung lượng pin (Wh hoặc mAh)

    @Column(nullable = false)
    private String operatingSystem; // Hệ điều hành (ví dụ: "Windows 11", "Ubuntu 22.04", "macOS Ventura")

    @Column(nullable = false)
    private String connectivity; // Các kết nối (ví dụ: "Wi-Fi 6, Bluetooth 5.2")

    @Column(nullable = false)
    private String ports; // Các cổng (ví dụ: "2x USB-C, 1x HDMI, 1x Audio Jack")

    @Column(nullable = false)
    private String keyboard; // Loại bàn phím (ví dụ: "Backlit", "Mechanical", "Chiclet")

    @Column(nullable = false)
    private Boolean fingerprintReader; // Có hỗ trợ cảm biến vân tay không (true/false)

    @Column(nullable = false)
    private Boolean webcam; // Có webcam không (true/false)

    @Column(nullable = false)
    private Double weight; // Trọng lượng (kg)

    @Column(nullable = false)
    private String material; // Chất liệu khung máy (ví dụ: "Nhôm", "Nhựa", "Hợp kim")

    @Column(nullable = false)
    private String color; // Màu sắc (ví dụ: "Silver", "Space Gray", "Black")

    @Column(nullable = false)
    private String warranty; // Bảo hành (ví dụ: "12 tháng", "24 tháng")
}
