package org.galaxy.backend.ModelDTO.response;

import java.util.Set;

import lombok.*;

@Data
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RolesResponse {

    private String name;
    private String description;
    Set<PermissionResponse> permissions;
}
