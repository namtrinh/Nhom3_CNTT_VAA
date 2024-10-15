package org.galaxy.backend.Controller;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

import jakarta.servlet.http.HttpServletRequest;

import org.galaxy.backend.Service.VNPayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class VNPayController {

    @Autowired
    private VNPayService vnPayService;

    @PostMapping("/submitOrder")
    public ResponseEntity<Map<String, String>> submitOrder(
            @RequestParam("amount") int orderTotal,
            @RequestParam("orderInfo") String orderInfo,
            HttpServletRequest request) {
        String baseUrl = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort();
        String vnpayUrl = vnPayService.createOrder(orderTotal, orderInfo, baseUrl);

        // Tạo map để trả về dưới dạng JSON
        Map<String, String> response = new HashMap<>();
        response.put("vnpayUrl", vnpayUrl);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/vnpay-payment")
    public ResponseEntity<Void> handlePaymentReturn(HttpServletRequest request) throws UnsupportedEncodingException {
        // Xử lý trả lại từ VNPay
        int paymentStatus = vnPayService.orderReturn(request);

        // Lấy các thông tin từ request
        String orderInfo = request.getParameter("vnp_OrderInfo");
        String paymentTime = request.getParameter("vnp_PayDate");
        String transactionId = request.getParameter("vnp_TransactionNo");
        String totalPrice = request.getParameter("vnp_Amount");

        // Mã hóa các tham số để tránh lỗi khi có ký tự đặc biệt
        String encodedOrderInfo = URLEncoder.encode(orderInfo, StandardCharsets.UTF_8.toString());
        String encodedPaymentTime = URLEncoder.encode(paymentTime, StandardCharsets.UTF_8.toString());
        String encodedTransactionId = URLEncoder.encode(transactionId, StandardCharsets.UTF_8.toString());
        String encodedTotalPrice = URLEncoder.encode(totalPrice, StandardCharsets.UTF_8.toString());

        // Tạo URL để redirect và truyền dữ liệu qua query parameters
        String redirectUrl = paymentStatus == 1
                ? String.format(
                        "http://localhost:4200/payment-success?orderId=%s&totalPrice=%s&paymentTime=%s&transactionId=%s",
                        encodedOrderInfo, encodedTotalPrice, encodedPaymentTime, encodedTransactionId)
                : String.format(
                        "http://localhost:4200/payment-fail?orderId=%s&totalPrice=%s&paymentTime=%s&transactionId=%s",
                        encodedOrderInfo, encodedTotalPrice, encodedPaymentTime, encodedTransactionId);

        // Chuyển hướng
        return ResponseEntity.status(HttpStatus.FOUND)
                .header("Location", redirectUrl)
                .build();
    }
}
