package org.galaxy.backend.Controller;

import java.util.List;

import jakarta.mail.MessagingException;

import org.galaxy.backend.Service.EmailService1;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
public class EmailController {
    @Autowired
    private EmailService1 emailService;

    @GetMapping(value = "/send-mail")
    public String sendMail(@RequestParam List<String> to, @RequestParam String subject, @RequestParam String text)
            throws MessagingException {
        log.info("sent-mail");
        emailService.sendSimpleMail(to, subject, text);
        return "email sent successfully";
    }
}
