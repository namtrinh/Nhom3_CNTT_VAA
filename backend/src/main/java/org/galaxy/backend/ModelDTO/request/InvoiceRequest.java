package org.galaxy.backend.ModelDTO.request;

import java.sql.Timestamp;

import jakarta.persistence.ManyToOne;

import lombok.*;

@Data
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class InvoiceRequest {
    private String invoice_id;
    private String payment_id;
    private String description;
    private Timestamp time_created;

    @ManyToOne
    private String user;
}
