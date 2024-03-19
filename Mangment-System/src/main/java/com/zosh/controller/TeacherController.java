package com.zosh.controller;

import com.zosh.domain.UserRole;
import com.zosh.model.Teacher;
import com.zosh.model.User;
import com.zosh.request.PayAmountRequest;
import com.zosh.request.TeacherRequest;
import com.zosh.service.TeacherService;
import com.zosh.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/teachers")
public class TeacherController {

    @Autowired
    private TeacherService teacherService;

    @Autowired
    private UserService userService;

//    @PostMapping
//    public ResponseEntity<Teacher> createTeacher(
//            @RequestHeader("Authorization") String jwt,
//            @RequestBody TeacherRequest teacherRequest) throws Exception {
//        User user=userService.findUserProfileByJwt(jwt);
//        Teacher createdTeacher = teacherService.createTeacher(teacherRequest,user);
//
//        return ResponseEntity.ok(createdTeacher);
//    }

    @PutMapping()
    public ResponseEntity<Teacher> updateTeacher(
            @RequestHeader("Authorization") String jwt,
            @RequestBody TeacherRequest teacherRequest) throws Exception {
        User user=userService.findUserProfileByJwt(jwt);
        Teacher updatedTeacher = teacherService.updateTeacher(user, teacherRequest);
        if (updatedTeacher != null) {
            return ResponseEntity.ok(updatedTeacher);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTeacher(@PathVariable Long id) {
        teacherService.deleteTeacher(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Teacher> getTeacherById(@PathVariable Long id) throws Exception {
        Teacher teacher = teacherService.getTeacherById(id);
        if (teacher != null) {
            return ResponseEntity.ok(teacher);
        }
        throw new Exception("teacher not found with id"+id);
    }

    @GetMapping
    public ResponseEntity<List<Teacher>> getAllTeachers() {
        List<Teacher> teachers = teacherService.getAllTeachers();
        return ResponseEntity.ok(teachers);
    }

    @PutMapping("/pay")
    public ResponseEntity<Teacher> payTeacherAmount(
            @RequestHeader("Authorization") String jwt,
            @RequestBody PayAmountRequest req) throws Exception {
        User user=userService.findUserProfileByJwt(jwt);
        if(user.getRole().equals(UserRole.ROLE_ADMIN)){
            Teacher updatedTeacher = teacherService.payAmount(req.getTeacherId(), req.getAmount(), user);


            return new ResponseEntity<>(updatedTeacher, HttpStatus.OK);
        }
        throw new Exception("only admin can perform this operation");

    }
}
