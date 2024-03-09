package com.zosh.repository;

import com.zosh.model.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeacherRepository extends JpaRepository<Teacher,Long> {
    Teacher findByUserId(Long userId);
}
