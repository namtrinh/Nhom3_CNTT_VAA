package org.galaxy.backend.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
@Table(name = "review")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String reviewId;

    @ManyToOne
    @JoinColumn(nullable =false)
    private Product product;

    @Column(nullable = false)
    private int rating;

    private String customerName;

    @Column(nullable =true)
    private int phoneNumber;

    @Column(columnDefinition = "TEXT")
    private String comment;

    @Column(nullable =true)
    private boolean sharedWith;

    @Column(name = "review_date", nullable = false)
    private LocalDateTime reviewDate = LocalDateTime.now();

    @Enumerated(EnumType.STRING)
    private StatusCmt statusCmt;

    public enum StatusCmt{
        PENDING, APPROVED
    }
}
