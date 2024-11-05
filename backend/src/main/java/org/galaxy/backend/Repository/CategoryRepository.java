package org.galaxy.backend.Repository;

import feign.Param;
import org.galaxy.backend.Model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, String> {

    @Query("SELECT c FROM Category c WHERE c.ct_seotitle = :ct_seotitle")
    Category getByCt_seotitle(@Param("ct_seotitle") String ct_seotitle);

}
