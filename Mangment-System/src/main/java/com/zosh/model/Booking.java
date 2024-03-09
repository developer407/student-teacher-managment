package com.zosh.model;

import com.zosh.domain.BookingStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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

    private int pendingHours=totalHours;

    private int completedHours=0;

    private BookingStatus Status = BookingStatus.PENDING;

}
