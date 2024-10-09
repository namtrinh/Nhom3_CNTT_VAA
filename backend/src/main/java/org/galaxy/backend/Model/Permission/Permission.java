package org.galaxy.backend.Model.Permission;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import lombok.*;

@Entity
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Permission {
    @Id
    private String name;

    private String description;
}
