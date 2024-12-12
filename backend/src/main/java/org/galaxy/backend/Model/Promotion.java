package org.galaxy.backend.Model;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Set;

import jakarta.persistence.*;

import org.hibernate.annotations.GenericGenerator;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.cglib.core.Local;

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

    private LocalDateTime time_started;

    private LocalDateTime time_end;

    private Boolean isActive;

   @OneToMany(mappedBy = "promotion", fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    @JsonIgnoreProperties("promotion")
    private Set<Product> product;

}
