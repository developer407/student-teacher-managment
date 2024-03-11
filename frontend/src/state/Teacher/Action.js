import * as types from './ActionTypes';
import { api } from '../../config/api';

export const createTeacher = (jwt, teacherRequest) => async (dispatch) => {
  dispatch({ type: types.CREATE_TEACHER_REQUEST });
  try {
    const response = await api.post('/api/teachers', teacherRequest, {
      headers: { Authorization: jwt },
    });
    dispatch({
      type: types.CREATE_TEACHER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: types.CREATE_TEACHER_FAILURE,
      payload: error.message,
    });
  }
};

// Action creators for updating a teacher
export const updateTeacher = ({jwt, teacherRequest}) => async (dispatch) => {
  dispatch({ type: types.UPDATE_TEACHER_REQUEST });
  try {
    const response = await api.put('/api/teachers', teacherRequest, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    dispatch({
      type: types.UPDATE_TEACHER_SUCCESS,
      payload: response.data,
    });
    console.log("updated teacher",response.data);
  } catch (error) {
    console.log("error ",error)
    dispatch({
      type: types.UPDATE_TEACHER_FAILURE,
      payload: error.message,
    });
  }
};

// Action creators for deleting a teacher
export const deleteTeacher = ({id,jwt}) => async (dispatch) => {
  dispatch({ type: types.DELETE_TEACHER_REQUEST });
  try {
    await api.delete(`/api/teachers/${id}`,
    {
      headers: { Authorization: `Bearer ${jwt}` },
    }
    );
    dispatch({
      type: types.DELETE_TEACHER_SUCCESS,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: types.DELETE_TEACHER_FAILURE,
      payload: error.message,
    });
  }
};

// Action creators for getting a teacher by ID
export const getTeacherById = ({id,jwt}) => async (dispatch) => {
  dispatch({ type: types.GET_TEACHER_REQUEST });
  try {
    const response = await api.get(`/api/teachers/${id}`,{
      headers: { Authorization: `Bearer ${jwt}` },
    });
    dispatch({
      type: types.GET_TEACHER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.log("error",error)
    dispatch({
      type: types.GET_TEACHER_FAILURE,
      payload: error.message,
    });
  }
};


export const payTeacherAmount = ({jwt, teacherRequest}) => async (dispatch) => {
  dispatch({ type: types.PAY_TEACHER_AMOUNT_REQUEST });
  try {
    const response = await api.put('/api/teachers/pay', teacherRequest, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    dispatch({
      type: types.PAY_TEACHER_AMOUNT_SUCCESS,
      payload: response.data,
    });
    console.log("updated teacher",response.data);
  } catch (error) {
    console.log("error ",error)
    dispatch({
      type: types.PAY_TEACHER_AMOUNT_FAILURE,
      payload: error.message,
    });
  }
};

