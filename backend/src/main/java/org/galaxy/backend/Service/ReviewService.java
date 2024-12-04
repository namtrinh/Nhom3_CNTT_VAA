package org.galaxy.backend.Service;

import org.galaxy.backend.Model.Product;
import org.galaxy.backend.Model.Review;
import org.galaxy.backend.Repository.Reviewrepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {

    @Autowired
    private Reviewrepository reviewrepository;

    public Review save(Review entity) {
        entity.setStatusCmt(Review.StatusCmt.PENDING);
        return reviewrepository.save(entity);
    }

    public long count() {
        return reviewrepository.count();
    }

    public void deleteById(String string) {
        reviewrepository.deleteById(string);
    }

    public Page<Review> getReviewsForProduct(Product product, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return reviewrepository.findAllByProduct(product, pageable);
    }


}
