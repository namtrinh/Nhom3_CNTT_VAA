package org.galaxy.backend.Model.Products;

import jakarta.persistence.*;
import lombok.*;
import org.galaxy.backend.Model.Product;



@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor

public class ChargingCable {

    private String connectorType; // Loại đầu kết nối (ví dụ: "USB-A to USB-C", "Lightning", "Micro-USB")


    private Double length; // Chiều dài dây (đơn vị: mét)


    private Integer maxPower; // Công suất tối đa hỗ trợ (đơn vị: watt)


    private Integer dataTransferRate; // Tốc độ truyền dữ liệu (Mbps hoặc Gbps)


    private String material; // Chất liệu dây (ví dụ: "Nylon braided", "PVC")


    private Boolean fastCharging; // Hỗ trợ sạc nhanh không (true/false)

    @Column(nullable = true)
    private String compatibleDevices; // Thiết bị tương thích (ví dụ: "iPhone, Samsung, Huawei")


    private String brand; // Thương hiệu sản xuất (ví dụ: "Anker", "Baseus")


    private String warranty; // Thời gian bảo hành (ví dụ: "12 tháng", "18 tháng")
}
