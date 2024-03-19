package com.zosh.request;

import com.zosh.domain.PaymentMethod;
import com.zosh.model.Days;
import com.zosh.model.Grads;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TeacherRequest {

    private Long userId;
    private Set<String> subjects;
    private Set<Grads> grads;
    private Set<Days> availability;
    private PaymentMethod paymentMethod;

    private String accountNo;
    private String ifcCode;

    private String westernUnionName;

    private String description;

    private String fullName;

    private String email;

}
