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
public class ChargingCable  {
    @Column(nullable = false)
    private String connectorType; // Loại đầu kết nối (ví dụ: "USB-A to USB-C", "Lightning", "Micro-USB")

    @Column(nullable = false)
    private Double length; // Chiều dài dây (đơn vị: mét)

    @Column(nullable = false)
    private Integer maxPower; // Công suất tối đa hỗ trợ (đơn vị: watt)

    @Column(nullable = false)
    private Integer dataTransferRate; // Tốc độ truyền dữ liệu (Mbps hoặc Gbps)

    @Column(nullable = false)
    private String material; // Chất liệu dây (ví dụ: "Nylon braided", "PVC")

    @Column(nullable = false)
    private Boolean fastCharging; // Hỗ trợ sạc nhanh không (true/false)

    @Column(nullable = false)
    private String compatibleDevices; // Thiết bị tương thích (ví dụ: "iPhone, Samsung, Huawei")

    @Column(nullable = false)
    private String brand; // Thương hiệu sản xuất (ví dụ: "Anker", "Baseus")

    @Column(nullable = false)
    private String warranty; // Thời gian bảo hành (ví dụ: "12 tháng", "18 tháng")
}
