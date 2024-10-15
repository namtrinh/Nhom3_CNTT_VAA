package org.galaxy.backend.Service;

import java.util.List;

import org.galaxy.backend.Model.Promotion;
import org.galaxy.backend.Repository.PromotionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PromotionService {
    @Autowired
    private PromotionRepository promotionRepository;

    public Promotion getById(String string) {
        return promotionRepository.findById(string).orElseThrow();
    }

    public List<Promotion> findAll() {
        return promotionRepository.findAll();
    }

    public <S extends Promotion> S save(S entity) {
        return promotionRepository.save(entity);
    }

    public void deleteById(String string) {
        promotionRepository.deleteById(string);
    }

    public Promotion updateById(String promotion_id, Promotion promotion) {
        promotion.setPromotion_id(promotion_id);
        return promotionRepository.save(promotion);
    }
}
