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

public class HeadPhone {


    private String type; // Loại tai nghe (ví dụ: "Over-ear", "In-ear", "On-ear")


    private Boolean wireless; // Có hỗ trợ không dây không (true/false)


    private Boolean noiseCancelling; // Hỗ trợ chống ồn không (true/false)


    private String connectionType; // Loại kết nối (ví dụ: "Bluetooth", "3.5mm Jack", "USB-C")


    private Integer batteryLife; // Thời lượng pin (đơn vị: giờ)


    private String driverSize; // Kích thước driver (đơn vị: mm)


    private Boolean microphone; // Có hỗ trợ mic không (true/false)


    private Double weight; // Trọng lượng (đơn vị: gram)


    private String brand; // Thương hiệu (ví dụ: "Sony", "Bose", "JBL")


    private String warranty; // Thời gian bảo hành (ví dụ: "12 tháng", "24 tháng")

}
