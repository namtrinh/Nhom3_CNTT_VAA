package org.galaxy.backend.Model.Products;

import jakarta.persistence.*;

import org.galaxy.backend.Model.Product;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
public class KeyBoard {

    private String brand; // Thương hiệu (ví dụ: "Logitech", "Razer", "Corsair")

    private String type; // Loại bàn phím (ví dụ: "Mechanical", "Membrane")

    private String connectionType; // Loại kết nối (ví dụ: "Wireless", "Wired", "Bluetooth")

    private String switchType; // Loại switch (ví dụ: "Cherry MX Red", "Razer Green")

    private String layout; // Bố cục phím (ví dụ: "ANSI", "ISO", "Tenkeyless")

    private Boolean rgbLighting; // Có đèn RGB hay không (true/false)

    private String keycapMaterial; // Chất liệu keycap (ví dụ: "ABS", "PBT")

    private Boolean hotSwappable; // Hỗ trợ thay switch nóng không (true/false)

    private Integer pollingRate; // Tần số quét (Hz)

    private String buildMaterial; // Chất liệu vỏ (ví dụ: "Plastic", "Aluminum")

    private Double weight; // Trọng lượng (gram)

    private String dimensions; // Kích thước (ví dụ: "435 x 135 x 35 mm")

    private String color; // Màu sắc (ví dụ: "Black", "White")

    private String warranty; // Thời gian bảo hành (ví dụ: "12 tháng")

    private Boolean programmableKeys; // Có hỗ trợ phím lập trình không (true/false)

    @MapsId
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;
}
