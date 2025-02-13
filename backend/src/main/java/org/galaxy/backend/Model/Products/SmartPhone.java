package org.galaxy.backend.Model.Products;

import jakarta.persistence.*;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
public class SmartPhone {

    private String brand; // Thương hiệu (ví dụ: "Apple", "Samsung", "Xiaomi")

    private String modelNumber; // Số model (ví dụ: "A2651")

    private String processor; // Bộ vi xử lý (ví dụ: "Apple A17 Pro", "Snapdragon 8 Gen 3")

    private Integer cores; // Số nhân CPU (ví dụ: 8)

    private Double clockSpeed; // Tốc độ xung nhịp CPU (GHz)

    private Integer ram; // Dung lượng RAM (GB)

    private Integer storage; // Bộ nhớ trong (GB)

    private String storageType; // Loại lưu trữ (ví dụ: "UFS 4.0")

    private Double screenSize; // Kích thước màn hình (inch)

    private String resolution; // Độ phân giải (ví dụ: "2778x1284")

    private String screenType; // Loại màn hình (ví dụ: "OLED", "AMOLED", "LCD")

    private Integer refreshRate; // Tần số quét màn hình (Hz)

    private String frontCamera; // Camera trước (ví dụ: "12MP f/2.2")

    private String rearCameras; // Camera sau (ví dụ: "48MP + 12MP + 12MP")

    private String cameraFeatures; // Các tính năng camera (ví dụ: "Night Mode, HDR, Optical Zoom")

    private Integer batteryCapacity; // Dung lượng pin (mAh)

    private Boolean fastCharging; // Hỗ trợ sạc nhanh (true/false)

    private Boolean wirelessCharging; // Hỗ trợ sạc không dây (true/false)

    private String operatingSystem; // Hệ điều hành (ví dụ: "iOS 17", "Android 14")

    private String connectivity; // Các kết nối (ví dụ: "5G, Wi-Fi 6, Bluetooth 5.3")

    private String ports; // Loại cổng kết nối (ví dụ: "USB-C", "Lightning")

    private String buildMaterial; // Chất liệu thiết kế (ví dụ: "Ceramic Shield, Titanium")

    private String color; // Màu sắc (ví dụ: "Space Black", "Silver", "Deep Purple")

    private Boolean waterproof; // Khả năng chống nước (true/false)

    private String sensors; // Các cảm biến (ví dụ: "Face ID, vân tay, cảm biến gia tốc")

    private Double weight; // Trọng lượng (gram)

    private String dimensions; // Kích thước (ví dụ: "160.8 x 78.1 x 7.7 mm")

    private String warranty; // Thời gian bảo hành (ví dụ: "12 tháng")
}
