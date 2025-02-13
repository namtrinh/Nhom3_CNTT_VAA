package org.galaxy.backend.Repository;

import org.galaxy.backend.Model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import feign.Param;

@Repository
public interface CategoryRepository extends JpaRepository<Category, String> {

    @Query("SELECT c FROM Category c WHERE c.ct_seotitle = :ct_seotitle")
    Category getByCt_seotitle(@Param("ct_seotitle") String ct_seotitle);
}
