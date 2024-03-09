package com.zosh.request;

import com.zosh.domain.BookingStatus;
import lombok.Data;

@Data
public class BookingRequest {
    private Long teacherId;
    private int totalHours;


}
