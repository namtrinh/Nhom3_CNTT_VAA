package org.galaxy.backend.Service;

import org.galaxy.backend.Model.OrderDetailProduct;
import org.galaxy.backend.Repository.OrderDetailProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderDetailProductService {
    @Autowired
    private OrderDetailProductRepository orderDetailProductRepository;

    public OrderDetailProduct save(OrderDetailProduct entity) {
        return orderDetailProductRepository.save(entity);
    }

    public OrderDetailProduct findById(String orderDetailId, String productId, OrderDetailProduct orderDetailProduct) {
        OrderDetailProduct existOrderDetailProduct = orderDetailProductRepository.findByProducts_product_idAndOrder_detail_id(orderDetailId, productId);
        existOrderDetailProduct.setDiscount(orderDetailProduct.getDiscount());
        existOrderDetailProduct.setPrice(orderDetailProduct.getPrice());
        existOrderDetailProduct.setQuantity(orderDetailProduct.getQuantity());

        return orderDetailProductRepository.save(existOrderDetailProduct);
    }
}
