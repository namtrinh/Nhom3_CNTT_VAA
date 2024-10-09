package org.galaxy.backend.ModelDTO.request;

import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
//
public class AuthenticateRequest {

    private String email;
    private String password;
}
