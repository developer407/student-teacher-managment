// actions.js

import { api } from '../../config/api';
import * as types from './actionTypes';

export const createBooking = ({jwt, bookingRequest,navigate}) => async (dispatch) => {
  dispatch({ type: types.CREATE_BOOKING_REQUEST });
  try {
    const response = await api.post('/api/booking', bookingRequest, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    dispatch({
      type: types.CREATE_BOOKING_SUCCESS,
      payload: response.data,
    });
    console.log(response.data);
    navigate(`/booking/${response.data.id}`)

  } catch (error) {
    dispatch({
      type: types.CREATE_BOOKING_FAILURE,
      payload: error.message,
    });
  }
};

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

export const getBookingHistory = ({jwt,userId}) => async (dispatch) => {
  console.log("jwt",jwt)
dispatch({ type: types.GET_BOOKING_HISTORY_FAILURE });
try {
  const response = await api.get(`/api/booking/history/${userId}`,{
      headers: { Authorization: `Bearer ${jwt}` },
    });
  dispatch({
    type: types.GET_BOOKING_HISTORY_SUCCESS,
    payload: response.data,
  });
  console.log("booking HISTORY ",response.data)
} catch (error) {
  console.log("error ",error)
  dispatch({
    type: types.GET_BOOKING_HISTORY_REQUEST,
    payload: error.message,
  });
}
};
