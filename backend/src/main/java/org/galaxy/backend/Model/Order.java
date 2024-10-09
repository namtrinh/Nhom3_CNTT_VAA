package org.galaxy.backend.Model;

import java.sql.Timestamp;

import jakarta.persistence.*;

import org.hibernate.annotations.GenericGenerator;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@Table(name = "orders")
@NoArgsConstructor
public class Order {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    private String order_id;

    private String payment_id;
    private String description;

    private Boolean status;

    @ManyToOne
    @JoinColumn(name = "user_id") // The foreign key column that refers to the Users table
    private User user;

    private String address;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private Timestamp time_created;

    @OneToOne
    private OrderDetail orderDetail;
}
