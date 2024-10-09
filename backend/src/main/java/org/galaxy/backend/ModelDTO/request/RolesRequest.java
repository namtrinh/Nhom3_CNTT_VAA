package org.galaxy.backend.ModelDTO.request;

import java.util.Set;

import lombok.*;

@Data
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RolesRequest {

    private String name;
    private String description;

    Set<String> permissions;
}
