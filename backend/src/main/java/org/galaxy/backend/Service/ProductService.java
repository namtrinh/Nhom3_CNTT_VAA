package org.galaxy.backend.Service;

import java.util.List;

import org.springframework.data.domain.Page;

import org.galaxy.backend.Model.Category;
import org.galaxy.backend.Model.Product;

public interface ProductService {
    List<Product> findAll();

    Page<Product> getProducts(int pageNo, int pageSize);

    <S extends Product> S save(S entity);

    Product findById(String integer);

    void deleteById(String integer);

    Product editProduct(String product_id, Product product);

    List<Product> findProductsByCategory(Category category);

    List<Product> searchProduct(String name);

    public List<Product> getAllSale();

    public List<Product> getAllNoSale();

    public Product getBySeotitle(String seotitle);
}
