package com.zosh.repository;

import com.zosh.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking,Long> {
    @Query("SELECT b FROM Booking b WHERE b.student.id = ?1 OR b.teacher.id = ?1")
    List<Booking> findByStudentIdOrTeacherId(Long id);

//    List<Booking> findByTeacherId(Long id);
}
