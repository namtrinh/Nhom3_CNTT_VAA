package org.galaxy.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import org.galaxy.backend.Model.Brand;

@Repository
public interface Brandrepository extends JpaRepository<Brand, Integer> {
    boolean existsByName(String name);
}
