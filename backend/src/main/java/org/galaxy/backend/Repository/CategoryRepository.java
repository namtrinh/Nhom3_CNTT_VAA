package org.galaxy.backend.Repository;

import org.galaxy.backend.Model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {
    Category getBySeotitle(String seotitle);
}
