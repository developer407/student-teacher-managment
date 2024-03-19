package com.zosh.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.zosh.domain.PaymentMethod;
import com.zosh.model.Days;
import com.zosh.model.Grads;
import com.zosh.model.User;
import jakarta.persistence.*;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Data
public class TeacherDto {

    private Long id;


    private Set<Days> availability = new HashSet<>();


    private Set<String> subjects=new HashSet<>();


    private Set<Grads> grads = new HashSet<>();

    private String fullName;

    private String email;

    private double totalPaidAmount;

    private double pendingAmount;

    private String description;

    private PaymentMethod paymentMethod;

    private String accountNo;
    private String ifcCode;

    private String westernUnionName;
}
