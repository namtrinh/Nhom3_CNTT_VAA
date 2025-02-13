package org.galaxy.backend.ServiceImpl;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.TimeUnit;

import jakarta.persistence.EntityNotFoundException;

import org.galaxy.backend.Model.Product;
import org.galaxy.backend.Repository.ProductRepository;
import org.galaxy.backend.Service.CloudinaryService;
import org.galaxy.backend.Service.ProductService;
import org.galaxy.backend.Service.ReadExel.ReadExelProduct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CloudinaryService cloudinaryService;

    private static final String HASH_PR = "PR";

    private static final String HASH_PR_PROMOTION = "PR_PROMOTION";

    @Autowired
    RedisTemplate<String, Object> redisTemplate;

    HashOperations<String, String, Product> hashOperations;

    public ProductServiceImpl(RedisTemplate<String, Object> redisTemplate) {
        this.redisTemplate = redisTemplate;
        this.hashOperations = redisTemplate.opsForHash();
    }

    public void TTL(String hashKey) {
        redisTemplate.expire(hashKey, 10, TimeUnit.MINUTES);
    }

    @Scheduled(fixedRate = 300000)
    public void UpdateCache() {
        System.out.println("save to redis");
        List<Product> products = productRepository.findAll();
        for (Product product : products) {
            hashOperations.put(HASH_PR, product.getProduct_id(), product);
        }
        TTL(HASH_PR);
    }

    public List<Product> findAllProductsWithPromotion() {
        if (redisTemplate.hasKey(HASH_PR_PROMOTION)) {
            System.out.println("get product sale in redis");
            return hashOperations.values(HASH_PR_PROMOTION);
        } else {
            System.out.println("get product sale in database");
            List<Product> products = productRepository.findAllProductsWithPromotion();
            for (Product product : products) {
                hashOperations.put(HASH_PR_PROMOTION, product.getProduct_id(), product);
            }
            return products;
        }
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

    @Transactional
    public void deleteById(String productId) {
        Product product = productRepository
                .findById(productId)
                .orElseThrow(() -> new EntityNotFoundException("Product with ID " + productId + " not found"));

        product.setCategory(null);
        product.setPromotion(null);
        this.cloudinaryService.deleteFile(product.getImage());

        if (product.getImage() != null && !product.getImage().isEmpty()) {
            String publicId = product.getImage();
            cloudinaryService.deleteFile(publicId);
        }
        productRepository.delete(product);
    }

    public Product editProduct(String product_id, Product product) {
        product.setProduct_id(product_id);
        return this.productRepository.save(product);
    }

    public Product getBySeotitle(String seotitle) {
        return productRepository.getBySeotitle(seotitle);
    }

    public Page<Product> findAllByPage(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return productRepository.findAll(pageable);
    }

    public String savePrEx(MultipartFile file) {
        try {
            List<Product> stuList = ReadExelProduct.excelToStuList(file.getInputStream());
            productRepository.saveAll(stuList);
        } catch (IOException ex) {
            throw new RuntimeException("Excel data is failed to store: " + ex.getMessage());
        }
        return null;
    }

    public List<Product> getByCategory(String category) {
        return productRepository.getByCategory(category);
    }

    public List<Product> searchProductsByName(String name, String category) {
        return productRepository.searchByNameOrCategory(name, category);
    }

    public Product UpdateStatus(String product_id, Product product) {
        if (hashOperations.hasKey(HASH_PR, product_id)) {
            hashOperations.put(HASH_PR, product_id, product);
        }
        product.setProduct_id(product_id);
        return productRepository.save(product);
    }
}
