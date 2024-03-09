package com.zosh.controller;

import com.zosh.model.Teacher;
import com.zosh.model.User;
import com.zosh.request.TeacherRequest;
import com.zosh.service.TeacherService;
import com.zosh.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
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

    @PostMapping
    public ResponseEntity<Teacher> createTeacher(
            @RequestHeader("Authorization") String jwt,
            @RequestBody TeacherRequest teacherRequest) throws Exception {
        User user=userService.findUserProfileByJwt(jwt);
        Teacher createdTeacher = teacherService.createTeacher(teacherRequest,user);

        return ResponseEntity.ok(createdTeacher);
    }

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
    public ResponseEntity<Teacher> getTeacherById(@PathVariable Long id) {
        Teacher teacher = teacherService.getTeacherById(id);
        if (teacher != null) {
            return ResponseEntity.ok(teacher);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping
    public ResponseEntity<List<Teacher>> getAllTeachers() {
        List<Teacher> teachers = teacherService.getAllTeachers();
        return ResponseEntity.ok(teachers);
    }
}
