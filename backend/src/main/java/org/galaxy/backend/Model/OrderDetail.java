package org.galaxy.backend.Model;

import java.io.Serializable;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import org.hibernate.annotations.GenericGenerator;

import lombok.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@Table(name = "order_detail")
@NoArgsConstructor
public class OrderDetail implements Serializable {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    private String order_detail_id;

    private Integer total_amount;

    private Double total_price;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "order_detail_products", // Tên bảng trung gian
            joinColumns = @JoinColumn(name = "order_detail_order_detail_id"),
            inverseJoinColumns = @JoinColumn(name = "products_product_id")
    )
    private Set<Product> products;

    @ManyToMany(fetch = FetchType.EAGER)
    private Set<Promotion> promotions;
}
