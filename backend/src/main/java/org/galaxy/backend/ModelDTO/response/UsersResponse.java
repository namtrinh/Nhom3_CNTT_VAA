package org.galaxy.backend.ModelDTO.response;

import java.sql.Timestamp;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Email;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class UsersResponse {
    private String user_id;

    @Email(message = "not correct format")
    private String email;

    private String username;

    private String password;

    private String verificationCode;

    private Boolean activated;

    private String address;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private Timestamp time_created;

    Set<RolesResponse> roles;
}
