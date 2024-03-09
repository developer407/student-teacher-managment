package com.zosh.service;

import java.util.List;
import java.util.Optional;


import com.zosh.domain.UserRole;
import com.zosh.model.User;

import org.springframework.stereotype.Service;

import com.zosh.config.JwtTokenProvider;

import com.zosh.repository.UserRepository;

@Service
public class UserServiceImplementation implements UserService {
	
	private UserRepository userRepository;
	private JwtTokenProvider jwtTokenProvider;

	
	public UserServiceImplementation(
			UserRepository userRepository,
			JwtTokenProvider jwtTokenProvider) {
		
		this.userRepository=userRepository;
		this.jwtTokenProvider=jwtTokenProvider;

		
	}

	@Override
	public User findUserById(Long userId) throws Exception {
		Optional<User> user=userRepository.findById(userId);
		
		if(user.isPresent()){
			return user.get();
		}
		throw new Exception("user not found with id "+userId);
	}

	@Override
	public User findUserProfileByJwt(String jwt) throws Exception {
		System.out.println("user service");
		String email=jwtTokenProvider.getEmailFromJwtToken(jwt);
		
		System.out.println("email"+email);
		
		User user=userRepository.findByEmail(email);
		
		if(user==null) {
			throw new Exception("user not exist with email "+email);
		}
		System.out.println("email user"+user.getEmail());
		return user;
	}

	@Override
	public List<User> findAllUsers(UserRole role) {
		// TODO Auto-generated method stub
		return userRepository.findByRoleOrderByCreatedAtDesc(role);
	}

	@Override
	public User createAdmin(User user) {
		User admin=new User();
		admin.setEmail(user.getEmail());
		admin.setRole(UserRole.ROLE_ADMIN);
		admin.setPassword(user.getPassword());
		admin.setFullName(user.getFullName());
		return userRepository.save(admin);
	}

	@Override
	public User removeUser(Long userId) throws Exception {
		User user= findUserById(userId);
		userRepository.delete(user);
		return user;
	}

	@Override
	public List<User> getAdminList() {
		return userRepository.findByRoleOrderByCreatedAtDesc(UserRole.ROLE_ADMIN);
	}

}
