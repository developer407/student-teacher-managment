// actions.js

import { api } from '../../config/api';
import * as types from './actionTypes';

// Action creators for creating a booking
export const createBooking = ({jwt, bookingRequest}) => async (dispatch) => {
  dispatch({ type: types.CREATE_BOOKING_REQUEST });
  try {
    const response = await api.post('/api/booking', bookingRequest, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    dispatch({
      type: types.CREATE_BOOKING_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: types.CREATE_BOOKING_FAILURE,
      payload: error.message,
    });
  }
};

// Action creators for updating a booking
export const updateBooking = ({id, bookingRequest,jwt}) => async (dispatch) => {
  dispatch({ type: types.UPDATE_BOOKING_REQUEST });
  try {
    const response = await api.put(`/api/booking/${id}`, bookingRequest,{
        headers: { Authorization: `Bearer ${jwt}` },
      });
    dispatch({
      type: types.UPDATE_BOOKING_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: types.UPDATE_BOOKING_FAILURE,
      payload: error.message,
    });
  }
};

// Action creators for deleting a booking
export const deleteBooking = ({id,jwt}) => async (dispatch) => {
  dispatch({ type: types.DELETE_BOOKING_REQUEST });
  try {
    await api.delete(`/api/booking/${id}`,{
        headers: { Authorization: `Bearer ${jwt}` },
      });
    dispatch({
      type: types.DELETE_BOOKING_SUCCESS,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: types.DELETE_BOOKING_FAILURE,
      payload: error.message,
    });
  }
};

// Action creators for getting a booking by ID
export const getBookingById = ({id,jwt}) => async (dispatch) => {
  dispatch({ type: types.GET_BOOKING_REQUEST });
  try {
    const response = await api.get(`/api/booking/${id}`,{
        headers: { Authorization: `Bearer ${jwt}` },
      });
    dispatch({
      type: types.GET_BOOKING_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: types.GET_BOOKING_FAILURE,
      payload: error.message,
    });
  }
};

// Action creators for getting all bookings
export const getBookingList = ({jwt}) => async (dispatch) => {
    console.log("jwt",jwt)
  dispatch({ type: types.GET_ALL_BOOKINGS_REQUEST });
  try {
    const response = await api.get('/api/booking',{
        headers: { Authorization: `Bearer ${jwt}` },
      });
    dispatch({
      type: types.GET_ALL_BOOKINGS_SUCCESS,
      payload: response.data,
    });
    console.log("booking list",response.data)
  } catch (error) {
    console.log("error ",error)
    dispatch({
      type: types.GET_ALL_BOOKINGS_FAILURE,
      payload: error.message,
    });
  }
};
