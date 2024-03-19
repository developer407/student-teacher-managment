package com.zosh.request;

import com.zosh.domain.BookingStatus;
import com.zosh.model.Grads;
import lombok.Data;

@Data
public class BookingRequest {
    private Long teacherId;
    private int totalHours;

    private String subject;

    private Grads grad;


}
