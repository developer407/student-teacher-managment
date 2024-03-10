// reducer.js
import * as types from './actionTypes';

const initialState = {
  teachers: [],
  teacher: null,
  loading: false,
  error: null,
};

const teacherReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_TEACHER_REQUEST:
    case types.UPDATE_TEACHER_REQUEST:
    case types.DELETE_TEACHER_REQUEST:
    case types.GET_TEACHER_REQUEST:
    case types.GET_ALL_TEACHERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.CREATE_TEACHER_SUCCESS:
    case types.UPDATE_TEACHER_SUCCESS:
    case types.GET_TEACHER_SUCCESS:
      return {
        ...state,
        loading: false,
        teacher: action.payload,
      };
    case types.DELETE_TEACHER_SUCCESS:
      return {
        ...state,
        loading: false,
        teachers: state.teachers.filter((teacher) => teacher.id !== action.payload),
      };
    case types.GET_ALL_TEACHERS_SUCCESS:
      return {
        ...state,
        loading: false,
        teachers: action.payload,
      };
    case types.CREATE_TEACHER_FAILURE:
    case types.UPDATE_TEACHER_FAILURE:
    case types.DELETE_TEACHER_FAILURE:
    case types.GET_TEACHER_FAILURE:
    case types.GET_ALL_TEACHERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default teacherReducer;
