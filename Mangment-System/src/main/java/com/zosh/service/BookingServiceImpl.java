package com.zosh.service;

import com.zosh.domain.BookingStatus;
import com.zosh.model.Booking;
import com.zosh.model.Teacher;
import com.zosh.model.User;
import com.zosh.repository.BookingRepository;
import com.zosh.request.BookingRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingServiceImpl implements BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Override
    public Booking createBooking(BookingRequest bookingRequest, User student, User teacher) {
        Booking booking = new Booking();

        booking.setStudent(student);
        booking.setTeacher(teacher);
        booking.setTotalHours(bookingRequest.getTotalHours());
        booking.setPendingHours(bookingRequest.getTotalHours());

        return bookingRepository.save(booking);
    }

    @Override
    public Booking updateBooking(Long id, BookingRequest bookingRequest,User student, User teacher) {
        Booking existingBooking = bookingRepository.findById(id).orElse(null);
        if (existingBooking != null) {
            // Update properties from bookingRequest
            existingBooking.setStudent(student);
            existingBooking.setTeacher(teacher);
            existingBooking.setTotalHours(bookingRequest.getTotalHours());
            return bookingRepository.save(existingBooking);
        }
        return null; // Or throw an exception if not found
    }

    @Override
    public void deleteBooking(Long id) {
        bookingRepository.deleteById(id);
    }

    @Override
    public Booking getBookingById(Long id) {
        return bookingRepository.findById(id).orElse(null);
    }

    @Override
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @Override
    public List<Booking> getStudentsBookings(Long id) {
        return bookingRepository.findByStudentId(id);
    }

    @Override
    public List<Booking> getTeachersBookings(Long id) {
        return bookingRepository.findByTeacherId(id);
    }

    @Override
    public Booking updateBookingCompletedHours(Long id, int completedHours) throws Exception {
        Booking existingBooking = bookingRepository.findById(id).orElse(null);
        if(existingBooking==null){
            throw new Exception("booking not found");
        }
        existingBooking.setCompletedHours(completedHours);
        existingBooking.setPendingHours(existingBooking.getTotalHours()-existingBooking.getCompletedHours());
        if(existingBooking.getPendingHours()==0){
            existingBooking.setStatus(BookingStatus.COMPLETED);
        }
        return bookingRepository.save(existingBooking);
    }
}
