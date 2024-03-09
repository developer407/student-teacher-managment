package com.zosh.service;

import com.zosh.model.Booking;
import com.zosh.model.Teacher;
import com.zosh.model.User;
import com.zosh.request.BookingRequest;

import java.util.List;

public interface BookingService {
    Booking createBooking(BookingRequest bookingRequest,User student, User teacher);
    Booking updateBooking(Long id, BookingRequest bookingRequest, User student, User teacher);
    void deleteBooking(Long id);
    Booking getBookingById(Long id);
    List<Booking> getAllBookings();
    List<Booking> getStudentsBookings(Long id);
    List<Booking> getTeachersBookings(Long id);

    Booking updateBookingCompletedHours(Long id,int completedHours) throws Exception;
}

