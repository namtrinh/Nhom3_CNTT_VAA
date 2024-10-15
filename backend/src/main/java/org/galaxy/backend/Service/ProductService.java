package org.galaxy.backend.Service;

import java.util.List;

import org.galaxy.backend.Model.Category;
import org.galaxy.backend.Model.Product;
import org.springframework.data.domain.Page;

public interface ProductService {
    List<Product> findAllProductsWithPromotion();

    List<Product> findAllProductsWithoutPromotion();

    Page<Product> getProducts(int pageNo, int pageSize);

    <S extends Product> S save(S entity);

    Product findById(String integer);

    void deleteById(String integer);

    Product editProduct(String product_id, Product product);

    List<Product> findProductsByCategory(Category category);

    List<Product> searchProduct(String name);

    public Product getBySeotitle(String seotitle);
}
