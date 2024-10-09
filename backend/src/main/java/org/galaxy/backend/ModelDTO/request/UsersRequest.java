package org.galaxy.backend.ModelDTO.request;

import java.sql.Timestamp;
import java.util.Set;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class UsersRequest {
    private String user_id;

    @Email(message = "not correct format")
    private String email;

    private String username;

    @Size(min = 8, message = "Password must be least 8 characters")
    private String password;

    private String verificationCode;

    private String address;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private Timestamp time_created;

    Set<String> roles;
}
