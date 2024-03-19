package com.zosh.service;

import com.zosh.model.Booking;
import com.zosh.model.StudentConfirmationRequest;
import com.zosh.repository.StudentConfirmationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudentConfirmationRequestServiceImpl implements StudentConfirmationRequestService{

    @Autowired
    private StudentConfirmationRepository requestRepository;
    @Override
    public StudentConfirmationRequest processRequest(Long requestId, boolean confirmed) throws Exception {
        StudentConfirmationRequest request = requestRepository.findById(requestId)
                .orElseThrow(() -> new Exception("Request not found with id: " + requestId));
        Booking booking=request.getBooking();

        if (confirmed) {
            request.setConfirmed(true);


        } else {
            request.setConfirmed(false);
//
        }
        return requestRepository.save(request);


    }

    @Override
    public StudentConfirmationRequest createRequest(Booking booking, int completedMinutes) throws Exception {
        StudentConfirmationRequest req=new StudentConfirmationRequest();
        req.setBooking(booking);
        req.setConfirmed(false);
        req.setCompletedMinutes(completedMinutes);
        return requestRepository.save(req);
    }

    @Override
    public StudentConfirmationRequest getRequestByBookingId(Long bookingId) {
        return requestRepository.findByBookingId(bookingId);
    }

    @Override
    public StudentConfirmationRequest getRequestBYId(Long requestId) throws Exception {
        return requestRepository.findById(requestId).orElseThrow(()->new Exception("request not found"));
    }


    @Override
    public void deleteRequest(Long requestId) throws Exception {
        StudentConfirmationRequest req=getRequestBYId(requestId);
        requestRepository.delete(req);

    }
}
