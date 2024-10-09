package org.galaxy.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import org.galaxy.backend.Model.Permission.Permission;

@Repository
public interface PermissionRepository extends JpaRepository<Permission, String> {}
