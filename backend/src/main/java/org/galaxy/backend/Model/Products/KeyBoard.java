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
public class KeyBoard   {

    @Column(nullable = false)
    private String brand; // Thương hiệu (ví dụ: "Logitech", "Razer", "Corsair")

    @Column(nullable = false)
    private String type; // Loại bàn phím (ví dụ: "Mechanical", "Membrane")

    @Column(nullable = false)
    private String connectionType; // Loại kết nối (ví dụ: "Wireless", "Wired", "Bluetooth")

    @Column(nullable = false)
    private String switchType; // Loại switch (ví dụ: "Cherry MX Red", "Razer Green")

    @Column(nullable = false)
    private String layout; // Bố cục phím (ví dụ: "ANSI", "ISO", "Tenkeyless")

    @Column(nullable = false)
    private Boolean rgbLighting; // Có đèn RGB hay không (true/false)

    @Column(nullable = false)
    private String keycapMaterial; // Chất liệu keycap (ví dụ: "ABS", "PBT")

    @Column(nullable = false)
    private Boolean hotSwappable; // Hỗ trợ thay switch nóng không (true/false)

    @Column(nullable = false)
    private Integer pollingRate; // Tần số quét (Hz)

    @Column(nullable = false)
    private String buildMaterial; // Chất liệu vỏ (ví dụ: "Plastic", "Aluminum")

    @Column(nullable = false)
    private Double weight; // Trọng lượng (gram)

    @Column(nullable = false)
    private String dimensions; // Kích thước (ví dụ: "435 x 135 x 35 mm")

    @Column(nullable = false)
    private String color; // Màu sắc (ví dụ: "Black", "White")

    @Column(nullable = false)
    private String warranty; // Thời gian bảo hành (ví dụ: "12 tháng")

    @Column(nullable = false)
    private Boolean programmableKeys; // Có hỗ trợ phím lập trình không (true/false)
}
