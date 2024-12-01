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

public class HeadPhone   {

    @Column(nullable = false)
    private String type; // Loại tai nghe (ví dụ: "Over-ear", "In-ear", "On-ear")

    @Column(nullable = false)
    private Boolean wireless; // Có hỗ trợ không dây không (true/false)

    @Column(nullable = false)
    private Boolean noiseCancelling; // Hỗ trợ chống ồn không (true/false)

    @Column(nullable = false)
    private String connectionType; // Loại kết nối (ví dụ: "Bluetooth", "3.5mm Jack", "USB-C")

    @Column(nullable = false)
    private Integer batteryLife; // Thời lượng pin (đơn vị: giờ)

    @Column(nullable = false)
    private String driverSize; // Kích thước driver (đơn vị: mm)

    @Column(nullable = false)
    private Boolean microphone; // Có hỗ trợ mic không (true/false)

    @Column(nullable = false)
    private Double weight; // Trọng lượng (đơn vị: gram)

    @Column(nullable = false)
    private String brand; // Thương hiệu (ví dụ: "Sony", "Bose", "JBL")

    @Column(nullable = false)
    private String warranty; // Thời gian bảo hành (ví dụ: "12 tháng", "24 tháng")

}
