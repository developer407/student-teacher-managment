import React, { useEffect } from 'react'
import { BookingCard } from './BookingCard'
import { getBookingHistory } from '../../state/Booking/Action';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const BookingHistory = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { booking, auth } = useSelector((store) => store);
    const jwt = localStorage.getItem("jwt");

  
    useEffect(() => {
      dispatch(getBookingHistory({ userId:auth.user.id, jwt }));
    }, []);
     
    
  
    
  return (
    <div className='p-10'>
        {booking.bookings.map((item)=> <BookingCard item={item}/>)}
    </div>
  )
}
