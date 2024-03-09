package com.zosh.model;

import lombok.Data;

import java.time.LocalTime;

@Data
public class TimeSlot {
    private LocalTime startTime;
    private LocalTime endTime;
}