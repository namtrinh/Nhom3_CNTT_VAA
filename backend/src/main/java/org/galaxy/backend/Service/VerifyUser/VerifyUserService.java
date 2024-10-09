package org.galaxy.backend.Service.VerifyUser;

import org.galaxy.backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.galaxy.backend.Model.User;

@Service
public class VerifyUserService {

    @Autowired
    private UserRepository userRepository;

    public boolean verifyCode(String email, String code) {
        User user = userRepository.findUsersByEmail(email);
        if (user != null & user.getVerificationCode().equals(code)) {
            // Verification successful
            return true;
        }
        // Verification failed
        return false;
    }
}
