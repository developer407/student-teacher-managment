package com.zosh.service;

import java.util.List;

import com.zosh.domain.UserRole;
import com.zosh.model.User;

public interface UserService {
	
	public User findUserById(Long userId) throws Exception;
	
	public User findUserProfileByJwt(String jwt) throws Exception;
	
	public List<User> findAllUsers(UserRole role);


	public User createAdmin(User user);

	public User removeUser(Long userId) throws Exception;

	public List<User>getAdminList();

}
