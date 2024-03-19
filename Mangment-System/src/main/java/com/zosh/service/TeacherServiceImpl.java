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
        teacher.setSubjects(teacherRequest.getSubjects());
        teacher.setGrads(teacherRequest.getGrads());
        teacher.setUser(user);
        user.setTeacher(teacher);

        return teacherRepository.save(teacher);
    }

    @Override
    public Teacher updateTeacher(User user, TeacherRequest teacherRequest) throws Exception {
        Teacher existingTeacher = teacherRepository.findByUserId(user.getId());

        if (existingTeacher == null) {
            throw new Exception("user not found");

        }
       if(teacherRequest.getAvailability()!=null){
           existingTeacher.setAvailability(teacherRequest.getAvailability());
       }
       if(teacherRequest.getSubjects()!=null){
           existingTeacher.setSubjects(teacherRequest.getSubjects());
       }
       if(teacherRequest.getGrads()!=null){
           existingTeacher.setGrads(teacherRequest.getGrads());
       }
       if(teacherRequest.getPaymentMethod()!=null){
           existingTeacher.setPaymentMethod(teacherRequest.getPaymentMethod());
       }
       if(teacherRequest.getAccountNo()!=null){
           existingTeacher.setAccountNo(teacherRequest.getAccountNo());
       }
       if(teacherRequest.getIfcCode()!=null){
           existingTeacher.setIfcCode(teacherRequest.getIfcCode());
       }
       if(teacherRequest.getWesternUnionName()!=null){
           existingTeacher.setWesternUnionName(teacherRequest.getWesternUnionName());
       }
       if(teacherRequest.getDescription()!=null){
           existingTeacher.setDescription(teacherRequest.getDescription());
       }
       if(teacherRequest.getFullName()!=null){
           existingTeacher.setFullName(teacherRequest.getFullName());
       }
        return teacherRepository.save(existingTeacher);
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

    @Override
    public Teacher payAmount(Long id, double amount, User admin) {
        Teacher teacher=getTeacherById(id);
        if(amount>teacher.getPendingAmount()){
            throw new Error("unsuficiant balance");
        }
        teacher.setPendingAmount(teacher.getPendingAmount()-amount);
        teacher.setTotalPaidAmount(teacher.getTotalPaidAmount()+amount);
        return teacherRepository.save(teacher);
    }
}

