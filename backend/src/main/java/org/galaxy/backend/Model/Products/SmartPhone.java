package org.galaxy.backend.Model.Products;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;
import org.galaxy.backend.Model.Product;


@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
public class SmartPhone {
    @Column(nullable = false)
    private String brand; // Thương hiệu (ví dụ: "Apple", "Samsung", "Xiaomi")

    @Column(nullable = false)
    private String modelNumber; // Số model (ví dụ: "A2651")

    @Column(nullable = false)
    private String processor; // Bộ vi xử lý (ví dụ: "Apple A17 Pro", "Snapdragon 8 Gen 3")

    @Column(nullable = false)
    private Integer cores; // Số nhân CPU (ví dụ: 8)

    @Column(nullable = false)
    private Double clockSpeed; // Tốc độ xung nhịp CPU (GHz)

    @Column(nullable = false)
    private Integer ram; // Dung lượng RAM (GB)

    @Column(nullable = false)
    private Integer storage; // Bộ nhớ trong (GB)

    @Column(nullable = false)
    private String storageType; // Loại lưu trữ (ví dụ: "UFS 4.0")

    @Column(nullable = false)
    private Double screenSize; // Kích thước màn hình (inch)

    @Column(nullable = false)
    private String resolution; // Độ phân giải (ví dụ: "2778x1284")

    @Column(nullable = false)
    private String screenType; // Loại màn hình (ví dụ: "OLED", "AMOLED", "LCD")

    @Column(nullable = false)
    private Integer refreshRate; // Tần số quét màn hình (Hz)

    @Column(nullable = false)
    private String frontCamera; // Camera trước (ví dụ: "12MP f/2.2")

    @Column(nullable = false)
    private String rearCameras; // Camera sau (ví dụ: "48MP + 12MP + 12MP")

    @Column(nullable = false)
    private String cameraFeatures; // Các tính năng camera (ví dụ: "Night Mode, HDR, Optical Zoom")

    @Column(nullable = false)
    private Integer batteryCapacity; // Dung lượng pin (mAh)

    @Column(nullable = false)
    private Boolean fastCharging; // Hỗ trợ sạc nhanh (true/false)

    @Column(nullable = false)
    private Boolean wirelessCharging; // Hỗ trợ sạc không dây (true/false)

    @Column(nullable = false)
    private String operatingSystem; // Hệ điều hành (ví dụ: "iOS 17", "Android 14")

    @Column(nullable = false)
    private String connectivity; // Các kết nối (ví dụ: "5G, Wi-Fi 6, Bluetooth 5.3")

    @Column(nullable = false)
    private String ports; // Loại cổng kết nối (ví dụ: "USB-C", "Lightning")

    @Column(nullable = false)
    private String buildMaterial; // Chất liệu thiết kế (ví dụ: "Ceramic Shield, Titanium")

    @Column(nullable = false)
    private String color; // Màu sắc (ví dụ: "Space Black", "Silver", "Deep Purple")

    @Column(nullable = false)
    private Boolean waterproof; // Khả năng chống nước (true/false)

    @Column(nullable = false)
    private String sensors; // Các cảm biến (ví dụ: "Face ID, vân tay, cảm biến gia tốc")

    @Column(nullable = false)
    private Double weight; // Trọng lượng (gram)

    @Column(nullable = false)
    private String dimensions; // Kích thước (ví dụ: "160.8 x 78.1 x 7.7 mm")

    @Column(nullable = false)
    private String warranty; // Thời gian bảo hành (ví dụ: "12 tháng")
}
