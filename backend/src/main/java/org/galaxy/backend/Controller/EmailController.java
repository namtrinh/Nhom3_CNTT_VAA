package org.galaxy.backend.Controller;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import jakarta.mail.MessagingException;
import org.galaxy.backend.Service.VerifyUser.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequestMapping(value = "email")
public class EmailController {
    @Autowired
    private EmailService emailService;

    @PostMapping("/send")
    public String sendEmail(@RequestBody Map<String, Object> requestData) {
        String email = (String) requestData.get("email");
        String orderInf = (String) requestData.get("orderInf");
        Double totalPrice = Double.valueOf(requestData.get("totalPrice").toString());
        String paymentTime = (String) requestData.get("paymentTime");
        String transactionId = (String) requestData.get("transactionId");

        // Tạo nội dung email HTML
        String emailContent = String.format(
                "<div style=\"font-family: Arial, sans-serif; line-height: 1.6; max-width: 700px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);\">" +
                        "<h1 style=\"color: #28a745; text-align: center;\">Thanh toán thành công!</h1>" +
                        "<p style=\"text-align: center;\">Cảm ơn bạn đã mua sắm tại Firefly Galaxy. Dưới đây là chi tiết đơn hàng của bạn:</p>" +
                        "<table style=\"border-collapse: collapse; width: 100%%;\">" +
                        "<tr style=\"background-color: #f2f2f2;\">" +
                        "<td style=\"border: 1px solid #ddd; padding: 12px; font-weight: bold;\">Thông tin đơn hàng:</td>" +
                        "<td style=\"border: 1px solid #ddd; padding: 12px;\">%s</td>" +
                        "</tr>" +
                        "<tr>" +
                        "<td style=\"border: 1px solid #ddd; padding: 12px; font-weight: bold;\">Tổng tiền:</td>" +
                        "<td style=\"border: 1px solid #ddd; padding: 12px;\">%,.0f₫</td>" +
                        "</tr>" +
                        "<tr style=\"background-color: #f2f2f2;\">" +
                        "<td style=\"border: 1px solid #ddd; padding: 12px; font-weight: bold;\">Thời gian thanh toán:</td>" +
                        "<td style=\"border: 1px solid #ddd; padding: 12px;\">%s</td>" +
                        "</tr>" +
                        "<tr>" +
                        "<td style=\"border: 1px solid #ddd; padding: 12px; font-weight: bold;\">Mã giao dịch:</td>" +
                        "<td style=\"border: 1px solid #ddd; padding: 12px;\">%s</td>" +
                        "</tr>" +
                        "</table>" +
                        "<footer style=\"margin-top: 20px; text-align: center; color: #777; font-size: 12px;\">" +
                        "Firefly Galaxy &copy; 2024" +
                        "</footer>" +
                        "</div>",
                orderInf, totalPrice, paymentTime, transactionId
        );

        // Gửi email
        emailService.sendHtmlMail(email, "Xác nhận thanh toán từ Firefly Galaxy", emailContent);

        return "Email sent successfully!";
    }
}
