package org.galaxy.backend.Model;

import java.time.LocalDateTime;

import jakarta.persistence.*;

import org.hibernate.annotations.GenericGenerator;

import lombok.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@Table(name = "goodreceivenote")
@NoArgsConstructor
public class GoodReceiveNote {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    private String id;

    private String grnKey;
    private LocalDateTime time_created;
    private String note;

    @OneToOne
    private OrderDetail orderDetail;

    @OneToOne
    private User user;
}
