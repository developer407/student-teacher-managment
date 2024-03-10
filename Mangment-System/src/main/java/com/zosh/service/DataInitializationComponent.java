package com.zosh.service;

import com.zosh.domain.USER_ROLE;
import com.zosh.model.User;
import com.zosh.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

// DataInitializationComponent.java
@Component
public class DataInitializationComponent implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;


    @Autowired
    private PasswordEncoder passwordEncoder;



    @Override
    public void run(String... args) {
        initializeAdminUser();
    }

    private void initializeAdminUser() {
        String adminUsername = "mahmadieh8@gmail.com";

        if (userRepository.findByEmail(adminUsername)==null) {
            User adminUser = new User();

            adminUser.setPassword(passwordEncoder.encode("12345678"));
            adminUser.setFullName("Maha Hammadi");
            adminUser.setEmail(adminUsername);
            adminUser.setRole(USER_ROLE.ROLE_SUPER_ADMIN);

            User admin=userRepository.save(adminUser);
        }
    }



}
