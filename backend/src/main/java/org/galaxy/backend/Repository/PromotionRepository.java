package org.galaxy.backend.Repository;

import java.util.List;

import org.galaxy.backend.Model.Promotion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PromotionRepository extends JpaRepository<Promotion, String> {

    List<Promotion> findByIsActiveTrue();
}
