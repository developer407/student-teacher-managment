package com.zosh.request;

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
    private List<String> subjects;
    private List<Grads> grads;
    private Set<Days> availability = new HashSet<>();

}
