package org.galaxy.backend.Model;

import java.time.LocalDateTime;
import java.util.Set;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import jakarta.persistence.*;
import org.galaxy.backend.Model.Products.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@RequiredArgsConstructor
@Inheritance(strategy = InheritanceType.JOINED)
/*
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "type")
@JsonSubTypes({
        @JsonSubTypes.Type(value = ChargingCable.class, name = "ChargingCable"),
        @JsonSubTypes.Type(value = HeadPhone.class, name = "HeadPhone"),
        @JsonSubTypes.Type(value = KeyBoard.class, name = "KeyBoard"),
        @JsonSubTypes.Type(value = LapTop.class, name = "LapTop"),
        @JsonSubTypes.Type(value = Mouse.class, name = "Mouse"),
        @JsonSubTypes.Type(value = Powerbank.class, name = "Powerbank"),
        @JsonSubTypes.Type(value = SmartPhone.class, name = "SmartPhone"),
        @JsonSubTypes.Type(value = Tablet.class, name = "Tablet"),
})

 */
@Table(name = "product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String product_id;

    private String name;
    private String seotitle;
    private String image;
    private Integer quantity;
    private Double price;
    private String description;

    @Enumerated(EnumType.STRING)
    private StockStatusPr stockStatus;

    @Column(name = "time_created")  // nếu tên cột trong DB khác
    private LocalDateTime time_created = LocalDateTime.now();

    @ManyToOne
    @JsonIgnoreProperties("products")
    private Category category;

    @ManyToOne
    @JsonIgnoreProperties("product")
    private Promotion promotion;

    public enum StockStatusPr{
            In_Stock, Out_of_Stock
    }
}
