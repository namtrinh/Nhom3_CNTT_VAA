package org.galaxy.backend.ModelDTO.response;

import java.sql.Timestamp;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import org.galaxy.backend.Model.User;

import lombok.*;

@Data
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class InvoiceResponse {
    private String invoice_id;
    private String payment_id;
    private String description;
    private Timestamp time_created;

    @ManyToOne
    @JoinColumn(name = "user_id") // The foreign key column that refers to the Users table
    private User user;
}
