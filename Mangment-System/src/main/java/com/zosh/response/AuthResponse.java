package com.zosh.response;


import com.zosh.domain.UserRole;
import lombok.Data;

@Data
public class AuthResponse {
	
	private String message;
	private String jwt;
	private UserRole role;
	


}
