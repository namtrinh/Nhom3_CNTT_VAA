package org.galaxy.backend.ServiceImpl;

import java.util.ArrayList;
import java.util.List;

import jakarta.transaction.Transactional;

import org.galaxy.backend.Model.*;
import org.galaxy.backend.Repository.CartRepository;
import org.galaxy.backend.Repository.OrderRepository;
import org.galaxy.backend.Service.OrderDetailService;
import org.galaxy.backend.Service.OrderService;
import org.galaxy.backend.Service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class OrderServiceImpl implements OrderService {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductService productService;
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private OrderDetailService orderDetailService;

    @Override
    public List<Order> getByUser(User user) {
        return orderRepository.findByUser(user);
    }

    public List<Order> getAll() {
        return this.orderRepository.findAll();
    }

    @Override
    public Page<Order> findAll(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return orderRepository.findAllSortedByTime(pageable);
    }

    @Override
    public Order save(Order entity) {
        List<String> outOfStockProducts = new ArrayList<>();
        OrderDetail orderDetail = orderDetailService.findById(entity.getOrderDetail_id());

        for(Product product : orderDetail.getProducts()) {
            Product productExisting = productService.findById(product.getProduct_id());
            User user = entity.getUser();
            Cart cart = cartRepository.findByProductAndUser(productExisting.getProduct_id(), user.getUser_id());

            if (productExisting != null) {
                // Kiểm tra nếu sản phẩm hết hàng (số lượng <= 0)
                int a = productExisting.getQuantity() - cart.getProduct_quantity();
                if (a <= 0) {
                    // Cập nhật trạng thái sản phẩm là hết hàng
                    productExisting.setStockStatus(Product.StockStatusPr.Out_of_Stock);
                    productService.UpdateStatus(productExisting.getProduct_id(), productExisting);

                    // Thêm sản phẩm vào danh sách hết hàng để báo cho người dùng
                    outOfStockProducts.add(productExisting.getName());
                }
            }
        }

        // Nếu có sản phẩm hết hàng, trả về thông báo lỗi
        if (!outOfStockProducts.isEmpty()) {
            String outOfStockMessage = "The following products are out of stock: " + String.join(", ", outOfStockProducts);

        }
        return orderRepository.save(entity);
    }

    @Override
    public Order findById(String integer) {
        return orderRepository.findById(integer).orElseThrow(() -> new RuntimeException("Not found"));
    }

    @Override
    public void deleteById(String integer) {
        orderRepository.deleteById(integer);
    }

    public List<Order> getByTime(String startDate, String endDate) {
        return orderRepository.findByTime_createdBetween(startDate, endDate);
    }
}
