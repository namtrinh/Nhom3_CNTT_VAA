package org.galaxy.backend.ModelDTO.request;

import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CheckTokenRequest {
    // send authenticate token
    private String token;
}
