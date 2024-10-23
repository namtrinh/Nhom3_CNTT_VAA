package org.galaxy.backend.Model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import java.sql.Timestamp;
import java.util.Set;

@Entity
@RequiredArgsConstructor
@AllArgsConstructor
@Getter
@Builder
@Setter
@Table( name ="statistic")
public class Statistic {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    private String statistic_id;
    private Integer month;
    private Integer year;
    private Integer sum_totalPrice;
    private Integer sum_totalQuantity;
    private Integer countOrder;
    private Timestamp date_created;

    @OneToMany
    private Set<Order> order;
}
