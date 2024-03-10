import * as types from './actionTypes';
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
export const updateTeacher = (jwt, teacherRequest) => async (dispatch) => {
  dispatch({ type: types.UPDATE_TEACHER_REQUEST });
  try {
    const response = await api.put('/api/teachers', teacherRequest, {
      headers: { Authorization: jwt },
    });
    dispatch({
      type: types.UPDATE_TEACHER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: types.UPDATE_TEACHER_FAILURE,
      payload: error.message,
    });
  }
};

// Action creators for deleting a teacher
export const deleteTeacher = (id) => async (dispatch) => {
  dispatch({ type: types.DELETE_TEACHER_REQUEST });
  try {
    await api.delete(`/api/teachers/${id}`);
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
export const getTeacherById = (id) => async (dispatch) => {
  dispatch({ type: types.GET_TEACHER_REQUEST });
  try {
    const response = await api.get(`/api/teachers/${id}`);
    dispatch({
      type: types.GET_TEACHER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: types.GET_TEACHER_FAILURE,
      payload: error.message,
    });
  }
};


