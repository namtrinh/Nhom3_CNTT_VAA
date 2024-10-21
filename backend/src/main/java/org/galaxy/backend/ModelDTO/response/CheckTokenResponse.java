package org.galaxy.backend.ModelDTO.response;

import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CheckTokenResponse {
    protected boolean valid;
}
