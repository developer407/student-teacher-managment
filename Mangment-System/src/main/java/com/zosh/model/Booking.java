package com.zosh.model;

import com.zosh.domain.BookingStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    private User student;

    @ManyToOne
    private User teacher;

    @Column(nullable = false)
    private int totalHours;
    private int totalMinute;

    private int pendingHours=totalHours;
    private int pendingMinute;

    private int completedHours=0;
    private int completedMinute=0;

    private BookingStatus Status = BookingStatus.PENDING;

    private String subject;

    private Grads grad;

    private int totalAmount;

    private int pendingAmount;

    private int paidAmount;

    private boolean confirmed;

    private LocalDate createdAt;

}
