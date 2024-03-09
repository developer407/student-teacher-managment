package com.zosh.controller;

import com.zosh.domain.UserRole;

import com.zosh.model.Teacher;
import com.zosh.model.User;
import com.zosh.service.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.zosh.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

	@Autowired
	private UserService userService;
	@Autowired
	private TeacherService teacherService;
	

	
	@GetMapping("/profile")
	public ResponseEntity<?> getUserProfileHandler(@RequestHeader("Authorization") String jwt) throws Exception{

		System.out.println("/api/users/profile");
		User user=userService.findUserProfileByJwt(jwt);

		return new ResponseEntity<>(user,HttpStatus.ACCEPTED);
	}



	@GetMapping("/customers/{role}")
	public ResponseEntity<List<User>> getCustomers(
			@PathVariable UserRole role,
			@RequestHeader("Authorization") String jwt
	) {

		System.out.println("/api/users/profile");
		List<User> users=userService.findAllUsers(role);
		return new ResponseEntity<>(users,HttpStatus.ACCEPTED);
	}

}
