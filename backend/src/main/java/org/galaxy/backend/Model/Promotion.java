package org.galaxy.backend.Model;

import java.sql.Timestamp;
import java.util.Set;

import jakarta.persistence.*;

import org.hibernate.annotations.GenericGenerator;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
@Table(name = "promotion")
public class Promotion {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String promotion_id;

    private String pr_name;

    private Float discount;

    private Byte sort;

    private Timestamp time_started;

    private Timestamp time_end;

   @OneToMany(mappedBy = "promotion", fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    @JsonIgnoreProperties("promotion")
    private Set<Product> product;

}
