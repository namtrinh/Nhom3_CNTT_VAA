package org.galaxy.backend.ServiceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import org.galaxy.backend.Model.Category;
import org.galaxy.backend.Model.Product;
import org.galaxy.backend.Repository.ProductRepository;
import org.galaxy.backend.Service.ProductService;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public List<Product> findAll() {
        return productRepository.findAll();
    }

    @Override
    public Product save(Product entity) {
        if (productRepository.existsByName(entity.getName())) {
            throw new RuntimeException("Product_name already exists");
        }
        return productRepository.save(entity);
    }

    @Override
    public Product findById(String product_id) {
        return productRepository.findById(product_id).orElseThrow(() -> new RuntimeException("Not found "));
    }

    @Override
    public void deleteById(String integer) {
        productRepository.deleteById(integer);
    }

    @Override
    public Product editProduct(String product_id, Product product) {
        product.setProduct_id(product_id);
        return this.productRepository.save(product);
    }

    @Override
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

    public List<Product> getByCategory(Category category_id) {
        return productRepository.findProductByCategory(category_id);
    }

    public List<Product> getAllSale() {
        return productRepository.getAllSale();
    }

    public List<Product> getAllNoSale() {
        return productRepository.getAllNoSale();
    }

    public Product getBySeotitle(String seotitle) {
        return productRepository.getBySeotitle(seotitle);
    }
}
