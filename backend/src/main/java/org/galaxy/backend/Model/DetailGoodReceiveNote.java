package org.galaxy.backend.Model;

import java.util.Set;

import jakarta.persistence.*;

import org.hibernate.annotations.GenericGenerator;

import lombok.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@Table(name = "detailgoodreceivnote")
@NoArgsConstructor
public class DetailGoodReceiveNote {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    private String id;

    private String quantity;
    private Double price;

    @OneToMany
    private Set<Product> product;
}
