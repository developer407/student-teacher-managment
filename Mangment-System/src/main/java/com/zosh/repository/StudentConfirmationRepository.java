package com.zosh.repository;

import com.zosh.model.StudentConfirmationRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudentConfirmationRepository extends JpaRepository<StudentConfirmationRequest,Long> {
    List<StudentConfirmationRequest> findByBooking_Student_Id(Long studentId);

    List<StudentConfirmationRequest> findByBooking_Teacher_Id(Long teacherId);

    StudentConfirmationRequest findByBookingId(Long id);
}
