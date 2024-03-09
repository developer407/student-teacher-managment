package com.zosh.request;

import jakarta.persistence.Entity;
import lombok.Data;

@Data
public class UpdateBookingRequest {
    private int completedHours;
}
