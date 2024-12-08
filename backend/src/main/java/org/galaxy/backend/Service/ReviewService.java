package org.galaxy.backend.Service;

import org.galaxy.backend.Model.Product;
import org.galaxy.backend.Model.Review;
import org.galaxy.backend.Repository.ProductRepository;
import org.galaxy.backend.Repository.Reviewrepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.DecimalFormat;
import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {

    @Autowired
    private Reviewrepository reviewrepository;

    @Autowired
    private ProductRepository productRepository;

    @Transactional
    public Review save(Review entity) {
        entity.setStatusCmt(Review.StatusCmt.PENDING);
        return reviewrepository.save(entity);
    }

    public void deleteById(String string) {
        reviewrepository.deleteById(string);
    }

    public Page<Review> getReviewsForProduct(String product, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return reviewrepository.findAllByProduct(product, pageable);
    }

    @Transactional
    public Review updateById(String reviewId) {
        Review existingReview = reviewrepository.findById(reviewId)
                .orElseThrow(() -> new RuntimeException("Not found"));
        if (existingReview.getStatusCmt() == Review.StatusCmt.APPROVED) {
            existingReview.setStatusCmt(Review.StatusCmt.PENDING);
            this.updateTotalRating();
        } else {
            existingReview.setStatusCmt(Review.StatusCmt.APPROVED);
            this.updateTotalRating();
        }
        return reviewrepository.save(existingReview);
    }


    public Page<Review> findAll(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return reviewrepository.findAllReview(pageable);
    }

    private void updateTotalRating() {
        List<Product> products = productRepository.findAll();
        products.forEach(product -> {
            Product pr = productRepository.findById(product.getProduct_id())
                    .orElseThrow(() -> new RuntimeException("Product not found"));
            List<Review> reviews = reviewrepository.getAllByProductId(pr.getProduct_id());
            double totalRating = 0;
            for (Review review : reviews) {
                totalRating += review.getRating();
            }
            if (!reviews.isEmpty()) {
                DecimalFormat df = new DecimalFormat("#.#");
                pr.setTotalRating(Double.parseDouble(df.format(totalRating / reviews.size())));
            }
            productRepository.save(pr);
        });
    }
}
