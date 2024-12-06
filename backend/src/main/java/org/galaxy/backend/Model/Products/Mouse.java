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
public class Mouse {

    private String brand; // Thương hiệu (ví dụ: "Logitech", "Razer", "SteelSeries")


    private String type; // Loại chuột (ví dụ: "Gaming", "Office", "Ergonomic")


    private String connectionType; // Loại kết nối (ví dụ: "Wireless", "Wired", "Bluetooth")


    private Integer dpi; // Độ nhạy DPI tối đa (ví dụ: 16000)


    private Integer numberOfButtons; // Số lượng nút bấm (ví dụ: 6)


    private Boolean rgbLighting; // Đèn RGB (true/false)


    private String sensorType; // Loại cảm biến (ví dụ: "Optical", "Laser")


    private Boolean adjustableWeight; // Hỗ trợ điều chỉnh trọng lượng (true/false)


    private String batteryLife; // Thời lượng pin (ví dụ: "70 giờ", "Rechargeable")


    private Double weight; // Trọng lượng (gram)


    private String dimensions; // Kích thước (ví dụ: "125 x 65 x 40 mm")


    private String color; // Màu sắc (ví dụ: "Black", "White")


    private String warranty; // Thời gian bảo hành (ví dụ: "12 tháng")

}
