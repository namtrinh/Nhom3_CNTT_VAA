package org.galaxy.backend.Mapper;

import org.galaxy.backend.ModelDTO.request.PermissionRequest;
import org.galaxy.backend.ModelDTO.response.PermissionResponse;
import org.mapstruct.Mapper;

import org.galaxy.backend.Model.Permission.Permission;

@Mapper(componentModel = "spring")
public interface PermissionMapper {
    Permission toPermissionRequest(PermissionRequest permissionRequest);

    PermissionResponse toPermissionResponse(Permission permission);
}
