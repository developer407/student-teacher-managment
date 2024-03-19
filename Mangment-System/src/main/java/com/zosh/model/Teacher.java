package com.zosh.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.zosh.domain.PaymentMethod;
import jakarta.persistence.*;

import lombok.Data;
import org.hibernate.annotations.GeneratorType;

import java.util.HashSet;

import java.util.Set;


@Data
@Entity
public class Teacher{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ElementCollection
    private Set<Days> availability = new HashSet<>();

    @ElementCollection
    private Set<String> subjects=new HashSet<>();

    @ElementCollection
    private Set<Grads> grads = new HashSet<>();

    @OneToOne
    @JsonIgnore
    private User user;

    private double totalPaidAmount;

    private double pendingAmount;

    private String description;

    private String fullName;

    private String email;

    @Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod;

    private String accountNo;
    private String ifcCode;

    private String westernUnionName;


}
