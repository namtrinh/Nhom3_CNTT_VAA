package org.galaxy.backend.ServiceImpl;

import java.util.List;

import jakarta.persistence.EntityNotFoundException;

import org.galaxy.backend.Model.Category;
import org.galaxy.backend.Model.Product;
import org.galaxy.backend.Repository.ProductRepository;
import org.galaxy.backend.Service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<Product> findAllProductsWithPromotion() {
        return productRepository.findAllProductsWithPromotion();
    }

    public List<Product> findAllProductsWithoutPromotion() {
        return productRepository.findAllProductsWithoutPromotion();
    }

    public Product save(Product entity) {
        if (productRepository.existsByName(entity.getName())) {
            throw new RuntimeException("Product_name already exists");
        }
        return productRepository.save(entity);
    }

    public Product findById(String product_id) {
        return productRepository.findById(product_id).orElseThrow(() -> new RuntimeException("Not found "));
    }

    public void deleteById(String productId) {
        if (!productRepository.existsById(productId)) {
            throw new EntityNotFoundException("Product not found"); // Thông báo nếu không tìm thấy sản phẩm
        }
        productRepository.deleteById(productId);
    }

    public Product editProduct(String product_id, Product product) {
        product.setProduct_id(product_id);
        return this.productRepository.save(product);
    }

    public List<Product> findProductsByCategory(Category category) {
        return productRepository.findProductByCategory(category);
    }

    public Page<Product> getProducts(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return productRepository.findAll(pageable);
    }

    public List<Product> searchProduct(String name) {
        return productRepository.findByNameContainingIgnoreCase(name);
    }

    public Product getBySeotitle(String seotitle) {
        return productRepository.getBySeotitle(seotitle);
    }
}
