package com.zosh.service;

import com.zosh.model.Teacher;
import com.zosh.model.User;
import com.zosh.repository.TeacherRepository;
import com.zosh.request.TeacherRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;

@Service
public class TeacherServiceImpl implements TeacherService {

    @Autowired
    private TeacherRepository teacherRepository;

    @Override
    public Teacher createTeacher(TeacherRequest teacherRequest,User user) {
        Teacher teacher = new Teacher();
        teacher.setAvailability(teacherRequest.getAvailability());
        teacher.setSubjects(new HashSet<>(teacherRequest.getSubjects()));
        teacher.setGrads(new HashSet<>(teacherRequest.getGrads()));
        teacher.setUser(user);
        user.setTeacher(teacher);

        return teacherRepository.save(teacher);
    }

    @Override
    public Teacher updateTeacher(User user, TeacherRequest teacherRequest) throws Exception {
        Teacher existingTeacher = teacherRepository.findByUserId(user.getId());

        if (existingTeacher != null) {
            existingTeacher.setAvailability(teacherRequest.getAvailability());
            existingTeacher.setSubjects(new HashSet<>(teacherRequest.getSubjects()));
            existingTeacher.setGrads(new HashSet<>(teacherRequest.getGrads()));
            return teacherRepository.save(existingTeacher);
        }
        throw new Exception("user not found");
    }

    @Override
    public void deleteTeacher(Long id) {
        teacherRepository.deleteById(id);
    }

    @Override
    public Teacher getTeacherById(Long id) {
        return teacherRepository.findById(id).orElse(null);
    }

    @Override
    public List<Teacher> getAllTeachers() {
        return teacherRepository.findAll();
    }

    @Override
    public Teacher getTeacherByUserId(Long userId) {
        return teacherRepository.findByUserId(userId);
    }
}

