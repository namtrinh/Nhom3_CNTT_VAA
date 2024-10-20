package org.galaxy.backend.Mapper;

import org.galaxy.backend.Model.User;
import org.galaxy.backend.ModelDTO.request.AuthUser;
import org.galaxy.backend.ModelDTO.request.UsersRequest;
import org.galaxy.backend.ModelDTO.response.UsersResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UsersMapper {

    @Mapping(target = "roles", ignore = true)
    User toUsersDTO(UsersRequest usersRequest);

 //   @Mapping(target = "activated", source = "activated")
    UsersResponse toUsers(User user);

    User toAuthUser(AuthUser authUser);
}
