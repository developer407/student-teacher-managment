package com.zosh.service;

import com.zosh.model.Booking;
import com.zosh.model.Teacher;
import com.zosh.model.User;
import com.zosh.request.BookingRequest;
import com.zosh.request.UpdateBooking;

import java.util.List;

public interface BookingService {
    Booking createBooking(BookingRequest bookingRequest,User student, User teacher);
    Booking updateBooking(Long id, UpdateBooking bookingRequest);
    void deleteBooking(Long id);
    Booking getBookingById(Long id);
    List<Booking> getAllBookings();
    List<Booking> getBookingHistory(Long id,User user);

    Booking updateBookingCompletedHours(Long id,int completedHours) throws Exception;
}

