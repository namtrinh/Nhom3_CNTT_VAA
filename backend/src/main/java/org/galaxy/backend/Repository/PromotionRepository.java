package org.galaxy.backend.Repository;

import org.galaxy.backend.Model.Promotion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PromotionRepository extends JpaRepository<Promotion, String> {

    List<Promotion> findByIsActiveTrue();
}
