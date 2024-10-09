package org.galaxy.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import org.galaxy.backend.Model.Promotion;

@Repository
public interface PromotionRepository extends JpaRepository<Promotion, String> {}
