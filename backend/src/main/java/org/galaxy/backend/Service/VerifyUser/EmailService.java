package org.galaxy.backend.Service.VerifyUser;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender javaMailSender;

    public void sendCodeToMail(String to, String subject, String verificationCode) {
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();

        simpleMailMessage.setTo(to);
        simpleMailMessage.setSubject(subject); // Thiết lập tiêu đề email
        simpleMailMessage.setText(verificationCode); // Thiết lập nội dung email

        javaMailSender.send(simpleMailMessage); // Gửi email
    }
}
