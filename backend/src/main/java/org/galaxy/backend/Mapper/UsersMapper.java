package org.galaxy.backend.Mapper;

import org.galaxy.backend.ModelDTO.response.UsersResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import org.galaxy.backend.Model.User;
import org.galaxy.backend.ModelDTO.request.UsersRequest;

@Mapper(componentModel = "spring")
public interface UsersMapper {

    @Mapping(target = "roles", ignore = true)
    User toUsersDTO(UsersRequest usersRequest);

    UsersResponse toUsers(User user);
}
