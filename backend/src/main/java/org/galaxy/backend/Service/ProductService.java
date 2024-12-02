package org.galaxy.backend.Service;

import java.util.List;

import org.galaxy.backend.Model.Product;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

public interface ProductService {
    List<Product> findAllProductsWithPromotion();

    List<Product> findAllProductsWithoutPromotion();

    <S extends Product> S save(S entity);

    Product findById(String integer);

    public void deleteById(String productId);

    Product editProduct(String product_id, Product product);

    Product getBySeotitle(String seotitle);

    Page<Product> findAllByPage(int pageNo, int pageSize);

    void savePrEx(MultipartFile file);

    List<Product> getByCategory(String category);

    List<Product> searchProductsByName(String name, String category);

    Product UpdateStatus(String product_id, Product product);
}
