package com.zosh.controller;

import com.zosh.domain.UserRole;
import com.zosh.model.Teacher;
import com.zosh.model.User;
import com.zosh.repository.TeacherRepository;
import com.zosh.service.CustomeUserServiceImplementation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zosh.config.JwtTokenProvider;

import com.zosh.repository.UserRepository;
import com.zosh.request.LoginRequest;
import com.zosh.response.AuthResponse;


@RestController
@RequestMapping("/auth")
public class AuthController {

	private UserRepository userRepository;
	private PasswordEncoder passwordEncoder;
	private JwtTokenProvider jwtTokenProvider;
	private CustomeUserServiceImplementation customUserDetails;

	private TeacherRepository teacherRepository;
	
	public AuthController(UserRepository userRepository,
						  PasswordEncoder passwordEncoder,
						  JwtTokenProvider jwtTokenProvider,
						  CustomeUserServiceImplementation customUserDetails,
						  TeacherRepository teacherRepository) {
		this.userRepository=userRepository;
		this.passwordEncoder=passwordEncoder;
		this.jwtTokenProvider=jwtTokenProvider;
		this.customUserDetails=customUserDetails;
		this.teacherRepository=teacherRepository;

	}
	
	@PostMapping("/signup")
	public ResponseEntity<User> createUserHandler(@RequestBody User user) throws Exception {
		
		  	String email = user.getEmail();
	        String password = user.getPassword();
	       	String fullName=user.getFullName();
	        UserRole role = user.getRole();
	        
	        User isEmailExist=userRepository.findByEmail(email);

	        if (isEmailExist!=null) {
	        	
	            throw new Exception("Email Is Already Used With Another Account");
	        }

			User createdUser= new User();
			createdUser.setEmail(email);
			createdUser.setFullName(fullName);
	        createdUser.setPassword(passwordEncoder.encode(password));
	        createdUser.setRole(role);

	        User savedUser= userRepository.save(createdUser);

			Teacher teacher=new Teacher();
			teacher.setFullName(fullName);
			teacher.setEmail(email);

			teacher.setUser(savedUser);
			savedUser.setTeacher(teacher);

			teacherRepository.save(teacher);

	        Authentication authentication = new UsernamePasswordAuthenticationToken(email, password);
	        SecurityContextHolder.getContext().setAuthentication(authentication);
	        
	        String token = jwtTokenProvider.generateToken(authentication);

	        AuthResponse authResponse= new AuthResponse();
			authResponse.setMessage("signup success");
			authResponse.setRole(savedUser.getRole());
			authResponse.setJwt(token);
			
	        return new ResponseEntity<>(savedUser,HttpStatus.OK);
		
	}
	
	@PostMapping("/signin")
    public ResponseEntity<AuthResponse> signin(@RequestBody LoginRequest loginRequest) {
        String username = loginRequest.getEmail();
        String password = loginRequest.getPassword();
        
        System.out.println(username +" ----- "+password);
        
        Authentication authentication = authenticate(username, password);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        
        
        String token = jwtTokenProvider.generateToken(authentication);
        AuthResponse authResponse= new AuthResponse();
		
		authResponse.setMessage("signin success");
		authResponse.setJwt(token);
		
        return new ResponseEntity<AuthResponse>(authResponse,HttpStatus.OK);
    }
	
	private Authentication authenticate(String username, String password) {
        UserDetails userDetails = customUserDetails.loadUserByUsername(username);
        
        System.out.println("sign in userDetails - "+userDetails);
        
        if (userDetails == null) {
        	System.out.println("sign in userDetails - null " + userDetails);
            throw new BadCredentialsException("Invalid username or password");
        }
        if (!passwordEncoder.matches(password, userDetails.getPassword())) {
        	System.out.println("sign in userDetails - password not match " + userDetails);
            throw new BadCredentialsException("Invalid username or password");
        }
        return new UsernamePasswordAuthenticationToken(
				userDetails,
				null,
				userDetails.getAuthorities());
    }
}
