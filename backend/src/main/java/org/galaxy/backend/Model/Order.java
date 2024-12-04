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
    @GeneratedValue(strategy = GenerationType.UUID)
    private String order_id;

    private String payment_id;
    private String description;

    @ManyToOne(cascade = CascadeType.MERGE)
    private User user;

    private String status;

    private String username;

    private String phoneNumber;

    private String email;

    private String address;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private Timestamp time_created;

    private String orderDetail_id;
}
