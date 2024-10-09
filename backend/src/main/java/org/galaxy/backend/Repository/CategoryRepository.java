package org.galaxy.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import org.galaxy.backend.Model.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {}
