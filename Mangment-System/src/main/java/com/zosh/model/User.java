package com.zosh.model;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.zosh.domain.UserRole;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String fullName;


    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;


    private String email;

    @Enumerated(EnumType.STRING)
    private UserRole role = UserRole.ROLE_STUDENT;


    private LocalDateTime createdAt;

    @OneToOne
    private Teacher teacher;

    
}
