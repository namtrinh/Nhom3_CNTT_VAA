package org.galaxy.backend.Model;

import java.io.Serializable;
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
public class Order implements Serializable {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    private String order_id;

    private String payment_id;
    private String description;

    @ManyToOne(cascade = CascadeType.MERGE)
    private User user;

    @Enumerated(EnumType.STRING)
    private StatusPayment status;

    private String username;

    private String phoneNumber;

    private String email;

    private String address;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private Timestamp time_created;

    private String orderDetail_id;

    enum StatusPayment{
        Cancelled, Completed
    }
}
