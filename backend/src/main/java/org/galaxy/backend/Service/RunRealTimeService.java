package org.galaxy.backend.Service;

import org.galaxy.backend.Model.Product;
import org.galaxy.backend.Model.Promotion;
import org.galaxy.backend.Repository.ProductRepository;
import org.galaxy.backend.Repository.PromotionRepository;
import org.galaxy.backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class RunRealTimeService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PromotionRepository promotionRepository;

    @Autowired
    private ProductRepository productRepository;

    @Scheduled(fixedRate = 600000)
    @Transactional
    public void cleanupExpiredUsers() {
        userRepository.deleteExpiredUsers();
        System.out.println("Expired unactivated users cleaned up.");
    }


    @Scheduled(cron = "0 0 0 * * ?")
   // @Scheduled(fixedRate = 2000)
    public void checkAndUpdateDiscountProgramStatus() {
        List<Promotion> discountProgramOptional = promotionRepository.findByIsActiveTrue();
        discountProgramOptional.forEach(promotion -> {
            LocalDateTime currentDateTime = LocalDateTime.now();
            if (currentDateTime.isAfter(promotion.getTime_end())) {
                List<Product> product = productRepository.findByPromotion(promotion);
                product.forEach(item -> {
                    item.setPromotion(null);
                    productRepository.save(item);
                });
                promotion.setIsActive(false);
                promotion.setProduct(null);
                promotionRepository.save(promotion);
                System.out.println("Chương trình giảm giá đã hết hạn và đã bị dừng.");
            } else {
                System.out.println("Chương trình giảm giá vẫn đang hoạt động.");
            }
        });
    }
}
