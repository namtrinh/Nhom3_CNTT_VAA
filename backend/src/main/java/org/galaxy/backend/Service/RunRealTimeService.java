package org.galaxy.backend.Service;

import org.galaxy.backend.Model.Product;
import org.galaxy.backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class RunRealTimeService {

    @Autowired
    private UserRepository userRepository;

    @Autowired ProductService productService;

    @Scheduled(fixedRate = 600000)
    @Transactional
    public void cleanupExpiredUsers() {
        userRepository.deleteExpiredUsers();
        System.out.println("Expired unactivated users cleaned up.");
    }
}
