package org.galaxy.backend.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import org.galaxy.backend.Model.Permission.Roles;
import org.galaxy.backend.Model.User;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    @Query(
            nativeQuery = true,
            value = "select * from users JOIN users_roles ON users.user_id = users_roles.users_user_id"
                    + " JOIN roles ON roles.name = users_roles.roles_name "
                    + " where roles.name = 'USER' or roles.name = 'MANAGER'")
    List<User> findAllUser();

    boolean existsByEmail(String email);

    Optional<User> findByEmail(String email);

    List<User> findAllByRoles(Set<Roles> roles);

    User findUsersByEmail(String email);




}
