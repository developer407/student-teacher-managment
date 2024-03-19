package com.zosh.service;

import com.zosh.domain.BookingStatus;
import com.zosh.domain.UserRole;
import com.zosh.model.Booking;
import com.zosh.model.Grads;
import com.zosh.model.Teacher;
import com.zosh.model.User;
import com.zosh.repository.BookingRepository;
import com.zosh.repository.TeacherRepository;
import com.zosh.request.BookingRequest;
import com.zosh.request.UpdateBooking;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookingServiceImpl implements BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private TeacherRepository teacherRepository;

    @Override
    public Booking createBooking(BookingRequest bookingRequest, User student, User teacher) {
        Booking booking = new Booking();

        Grads grads=bookingRequest.getGrad();
        grads.setFeesPerMinute((double) grads.getFees() /60);
        double feesPerMinute= (double) grads.getFees() /60;

        System.out.println("grad --------- "+grads+"---"+grads.getFees()+"-----"+feesPerMinute);

        booking.setStudent(student);
        booking.setTeacher(teacher);
        booking.setTotalHours(bookingRequest.getTotalHours());
        booking.setPendingHours(bookingRequest.getTotalHours());
        booking.setTotalMinute(bookingRequest.getTotalHours()*60);
        booking.setPendingMinute(booking.getTotalMinute());
        booking.setCompletedMinute(0);
        booking.setSubject(bookingRequest.getSubject());
        booking.setGrad(grads);
        booking.setTotalAmount(bookingRequest.getTotalHours()*bookingRequest.getGrad().getFees());
        booking.setPendingAmount(booking.getTotalAmount());
        booking.setPaidAmount(0);
        booking.setConfirmed(false);
        booking.setCreatedAt(LocalDate.now());


        return bookingRepository.save(booking);
    }

    @Override
    public Booking updateBooking(Long id, UpdateBooking bookingRequest) {
        Booking existingBooking = getBookingById(id);
       if(bookingRequest.isConfirmed()){
           existingBooking.setConfirmed(true);
       }
       if(bookingRequest.getPaidAmount()!=0){
           existingBooking.setPaidAmount(existingBooking.getPaidAmount()+bookingRequest.getPaidAmount());
           existingBooking.setPendingAmount(existingBooking.getTotalAmount()-existingBooking.getPaidAmount());
       }


        return bookingRepository.save(existingBooking);

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

//    @Override
//    public List<Booking> getStudentsBookings(Long id) {
//        return bookingRepository.findByStudentId(id);
//    }

    @Override
    public List<Booking> getBookingHistory(Long id,User user) {
        List<Booking> bookings= bookingRepository.findByStudentIdOrTeacherId(id);
        if(user.getRole()== UserRole.ROLE_TEACHER){
            bookings=bookings.stream()
                    .filter(Booking::isConfirmed)
                    .collect(Collectors.toList());
        }

        return bookings;
    }

    @Override
    public Booking updateBookingCompletedHours(Long id, int completedMinute) throws Exception {
        Booking existingBooking = bookingRepository.findById(id).orElse(null);
        if(existingBooking==null){
            throw new Exception("booking not found");
        }
        existingBooking.setCompletedMinute(existingBooking.getCompletedMinute()+completedMinute);
        existingBooking.setPendingMinute(existingBooking.getTotalMinute()-existingBooking.getCompletedMinute());
//        existingBooking.setPendingHours(existingBooking.getTotalHours()-existingBooking.getCompletedHours());

        Teacher teacher=existingBooking.getTeacher().getTeacher();
        teacher.setPendingAmount((teacher.getPendingAmount()+existingBooking.getGrad().getFeesPerMinute())
                *existingBooking.getCompletedMinute());
        teacherRepository.save(teacher);

        if(existingBooking.getPendingMinute()==0){
            existingBooking.setStatus(BookingStatus.COMPLETED);
        }
        else{
            existingBooking.setStatus((BookingStatus.PENDING));
        }
        return bookingRepository.save(existingBooking);
    }
}
