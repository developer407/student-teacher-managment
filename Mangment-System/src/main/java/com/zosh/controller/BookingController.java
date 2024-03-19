package com.zosh.controller;

import com.zosh.model.Booking;
import com.zosh.model.StudentConfirmationRequest;
import com.zosh.model.User;
import com.zosh.request.BookingRequest;
import com.zosh.request.UpdateBooking;
import com.zosh.request.UpdateBookingRequest;
import com.zosh.service.BookingService;
import com.zosh.service.StudentConfirmationRequestService;
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

    @Autowired
    private StudentConfirmationRequestService studentConfirmationRequestService;

    @PostMapping
    public ResponseEntity<Booking> createBooking(
            @RequestHeader("Authorization") String jwt,
            @RequestBody BookingRequest bookingRequest) throws Exception {
        User teacher=userService.findUserById(bookingRequest.getTeacherId());
        User student=userService.findUserProfileByJwt(jwt);
        Booking createdBooking = bookingService.createBooking(bookingRequest,student,teacher);
        return ResponseEntity.ok(createdBooking);
    }

    @PutMapping("/send_request/{id}")
    public ResponseEntity<StudentConfirmationRequest> sendUpdateBookingRequest(
            @PathVariable Long id,
            @RequestBody UpdateBookingRequest bookingRequest) throws Exception {
        Booking booking=bookingService.getBookingById(id);
        StudentConfirmationRequest updatedRequest = studentConfirmationRequestService
                .createRequest(booking,bookingRequest.getCompletedMinutes());

            return ResponseEntity.ok(updatedRequest);
    }

    @GetMapping("/{id}/request")
    public ResponseEntity<StudentConfirmationRequest> getUpdateBookingRequest(@PathVariable Long id) {
        StudentConfirmationRequest req=studentConfirmationRequestService.getRequestByBookingId(id);

            return ResponseEntity.ok(req);
    }

    @PutMapping("/process_request/{id}")
    public ResponseEntity<Booking> processUpdateBookingRequest(
            @PathVariable Long id,
            @RequestParam boolean confirmed) throws Exception {

        StudentConfirmationRequest req = studentConfirmationRequestService.processRequest(id, confirmed);
        Booking booking = bookingService.getBookingById(req.getBooking().getId());
        if (req.isConfirmed()){

            Booking updatedBooking = bookingService.updateBookingCompletedHours(req.getBooking().getId(),
                    req.getCompletedMinutes());
            studentConfirmationRequestService.deleteRequest(id);
            return ResponseEntity.ok(updatedBooking);
        }
        studentConfirmationRequestService.deleteRequest(id);
        return ResponseEntity.ok(booking);

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

    @GetMapping("/history/{id}")
    public ResponseEntity<List<Booking>> getBookingHistoryHandler(
            @PathVariable Long id,
            @RequestHeader("Authorization") String jwt
    ) throws Exception {
        User user=userService.findUserProfileByJwt(jwt);
        List<Booking> bookings = bookingService.getBookingHistory(id,user);
        return ResponseEntity.ok(bookings);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Booking> updateBookingDetails(
            @PathVariable Long id,
            @RequestBody UpdateBooking bookingRequest) throws Exception {
        Booking booking=bookingService.getBookingById(id);
        Booking updatedBooking=bookingService.updateBooking(id,bookingRequest);

        return ResponseEntity.ok(updatedBooking);
    }



}
