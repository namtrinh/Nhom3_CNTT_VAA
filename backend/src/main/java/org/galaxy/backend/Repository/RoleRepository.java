package org.galaxy.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import org.galaxy.backend.Model.Permission.Roles;

@Repository
public interface RoleRepository extends JpaRepository<Roles, String> {}
