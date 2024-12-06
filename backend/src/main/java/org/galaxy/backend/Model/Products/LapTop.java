package org.galaxy.backend.Model.Products;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.galaxy.backend.Model.Product;


@Getter
@Setter

@AllArgsConstructor
@RequiredArgsConstructor
public class LapTop {

    private String brand; // Thương hiệu (ví dụ: "Dell", "Apple", "HP")


    private String modelNumber; // Mã số model (ví dụ: "XPS139310")


    private String processor; // Bộ vi xử lý (CPU) (ví dụ: "Intel Core i7-1260P", "AMD Ryzen 7 5800H")


    private Integer cores; // Số nhân CPU (ví dụ: 8)


    private Integer threads; // Số luồng CPU (ví dụ: 16)


    private Double baseClockSpeed; // Tốc độ xung nhịp cơ bản (GHz)


    private Double maxClockSpeed; // Tốc độ xung nhịp tối đa (GHz)


    private Integer ram; // Dung lượng RAM (GB)


    private String ramType; // Loại RAM (ví dụ: "DDR4", "LPDDR5")


    private Integer storage; // Dung lượng lưu trữ (GB)


    private String storageType; // Loại lưu trữ (ví dụ: "SSD NVMe", "HDD", "Hybrid")


    private Double screenSize; // Kích thước màn hình (inch)


    private String resolution; // Độ phân giải (ví dụ: "1920x1080", "4K UHD")


    private String screenType; // Loại màn hình (ví dụ: "IPS", "OLED", "Touchscreen")


    private String gpu; // Card đồ họa (ví dụ: "NVIDIA RTX 3060", "Intel Iris Xe")


    private Integer batteryCapacity; // Dung lượng pin (Wh hoặc mAh)


    private String operatingSystem; // Hệ điều hành (ví dụ: "Windows 11", "Ubuntu 22.04", "macOS Ventura")


    private String connectivity; // Các kết nối (ví dụ: "Wi-Fi 6, Bluetooth 5.2")


    private String ports; // Các cổng (ví dụ: "2x USB-C, 1x HDMI, 1x Audio Jack")


    private String keyboard; // Loại bàn phím (ví dụ: "Backlit", "Mechanical", "Chiclet")


    private Boolean fingerprintReader; // Có hỗ trợ cảm biến vân tay không (true/false)


    private Boolean webcam; // Có webcam không (true/false)


    private Double weight; // Trọng lượng (kg)


    private String material; // Chất liệu khung máy (ví dụ: "Nhôm", "Nhựa", "Hợp kim")


    private String color; // Màu sắc (ví dụ: "Silver", "Space Gray", "Black")


    private String warranty; // Bảo hành (ví dụ: "12 tháng", "24 tháng")
}
