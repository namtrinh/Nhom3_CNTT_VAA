package org.galaxy.backend.ModelDTO.request;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;
import java.time.LocalDateTime;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter

public class AuthUser {
    @Id
    private String user_id;

    private String password;

    private String email;

    private String verificationCode;

    private LocalDateTime verificationCodeExpiry;

    private int requestCount; // Số lần yêu cầu

    private LocalDateTime lastRequestTime; // Thời gian yêu cầu gần nhất
}
