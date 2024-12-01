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
public class Mouse   {

    @Column(nullable = false)
    private String brand; // Thương hiệu (ví dụ: "Logitech", "Razer", "SteelSeries")

   @Column(nullable = false)
    private String type; // Loại chuột (ví dụ: "Gaming", "Office", "Ergonomic")

   @Column(nullable = false)
    private String connectionType; // Loại kết nối (ví dụ: "Wireless", "Wired", "Bluetooth")

   @Column(nullable = false)
    private Integer dpi; // Độ nhạy DPI tối đa (ví dụ: 16000)

   @Column(nullable = false)
    private Integer numberOfButtons; // Số lượng nút bấm (ví dụ: 6)

   @Column(nullable = false)
    private Boolean rgbLighting; // Đèn RGB (true/false)

   @Column(nullable = false)
    private String sensorType; // Loại cảm biến (ví dụ: "Optical", "Laser")

   @Column(nullable = false)
    private Boolean adjustableWeight; // Hỗ trợ điều chỉnh trọng lượng (true/false)

   @Column(nullable = false)
    private String batteryLife; // Thời lượng pin (ví dụ: "70 giờ", "Rechargeable")

   @Column(nullable = false)
    private Double weight; // Trọng lượng (gram)

   @Column(nullable = false)
    private String dimensions; // Kích thước (ví dụ: "125 x 65 x 40 mm")

   @Column(nullable = false)
    private String color; // Màu sắc (ví dụ: "Black", "White")

   @Column(nullable = false)
    private String warranty; // Thời gian bảo hành (ví dụ: "12 tháng")

}
