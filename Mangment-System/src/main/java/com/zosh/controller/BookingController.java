package com.zosh.controller;

import com.zosh.model.Booking;
import com.zosh.model.User;
import com.zosh.request.BookingRequest;
import com.zosh.request.UpdateBookingRequest;
import com.zosh.service.BookingService;
import com.zosh.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/booking")
public class BookingController {
    @Autowired
    private BookingService bookingService;

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<Booking> createBooking(
            @RequestHeader("Authorization") String jwt,
            @RequestBody BookingRequest bookingRequest) throws Exception {
        User teacher=userService.findUserById(bookingRequest.getTeacherId());
        User student=userService.findUserProfileByJwt(jwt);
        Booking createdBooking = bookingService.createBooking(bookingRequest,student,teacher);
        return ResponseEntity.ok(createdBooking);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Booking> updateBooking(
            @PathVariable Long id,
            @RequestBody UpdateBookingRequest bookingRequest) throws Exception {
        Booking updatedBooking = bookingService.updateBookingCompletedHours(id,
                bookingRequest.getCompletedHours());
        if (updatedBooking != null) {
            return ResponseEntity.ok(updatedBooking);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBooking(@PathVariable Long id) {
        bookingService.deleteBooking(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Booking> getBookingById(@PathVariable Long id) {
        Booking booking = bookingService.getBookingById(id);
        if (booking != null) {
            return ResponseEntity.ok(booking);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping
    public ResponseEntity<List<Booking>> getAllBookings() {
        List<Booking> bookings = bookingService.getAllBookings();
        return ResponseEntity.ok(bookings);
    }
}
