package org.galaxy.backend.Mapper;

import org.galaxy.backend.ModelDTO.response.RolesResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import org.galaxy.backend.Model.Permission.Roles;
import org.galaxy.backend.ModelDTO.request.RolesRequest;

@Mapper(componentModel = "spring")
public interface RolesMapper {
    @Mapping(target = "permissions", ignore = true)
    Roles toRolesRequest(RolesRequest rolesRequest);

    RolesResponse toRolesResponse(Roles roles);
}
