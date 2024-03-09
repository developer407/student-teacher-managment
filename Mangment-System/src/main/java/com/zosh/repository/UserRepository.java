package com.zosh.repository;

import com.zosh.domain.UserRole;
import com.zosh.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User,Long> {
    public User findByEmail(String email);
    public List<User> findByRoleOrderByCreatedAtDesc(UserRole role);
}
