package com.zosh.service;

import com.zosh.model.Booking;
import com.zosh.model.StudentConfirmationRequest;

import java.util.List;

public interface StudentConfirmationRequestService {

    StudentConfirmationRequest processRequest(Long requestId, boolean confirmed) throws Exception;
    StudentConfirmationRequest createRequest(Booking booking,int completedMinutes) throws Exception;

    StudentConfirmationRequest getRequestByBookingId(Long bookingId);

    StudentConfirmationRequest getRequestBYId(Long requestId) throws Exception;

    void deleteRequest(Long requestId) throws Exception;
}
