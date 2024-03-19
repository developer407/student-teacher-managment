package com.zosh.service;

import com.zosh.model.Teacher;
import com.zosh.model.User;
import com.zosh.request.TeacherRequest;

import java.util.List;

// TeacherService.java
public interface TeacherService {
    Teacher createTeacher(TeacherRequest teacherRequest, User user);
    Teacher updateTeacher(User user, TeacherRequest teacherRequest) throws Exception;
    void deleteTeacher(Long id);
    Teacher getTeacherById(Long id);
    List<Teacher> getAllTeachers();

    Teacher getTeacherByUserId(Long userId);

    Teacher payAmount(Long id,double amount,User admin);

}
