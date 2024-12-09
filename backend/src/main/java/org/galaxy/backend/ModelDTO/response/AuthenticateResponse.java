package org.galaxy.backend.ModelDTO.response;

import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuthenticateResponse {

    private String token;
    boolean authenticate;
}
