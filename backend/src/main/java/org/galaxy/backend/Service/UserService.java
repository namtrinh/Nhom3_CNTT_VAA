package org.galaxy.backend.Service;

import java.util.List;
import java.util.Set;

import org.galaxy.backend.Model.Permission.Roles;
import org.galaxy.backend.ModelDTO.request.UsersRequest;
import org.galaxy.backend.ModelDTO.response.UsersResponse;

public interface UserService {

    UsersResponse CreateUser(UsersRequest usersRequest);

    void deleteById(String user_id);

    List<UsersResponse> findAllUser();

    UsersResponse editUsers(String user_id, UsersRequest usersRequest);

    UsersResponse getUser(String user_id);

    UsersResponse getInf();

    List<UsersResponse> findAllByRole(Set<Roles> role);
}
