import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  LOGOUT,
  RESET_PASSWORD_REQUEST,
  REQUEST_RESET_PASSWORD_REQUEST,
  REQUEST_RESET_PASSWORD_SUCCESS,
  REQUEST_RESET_PASSWORD_FAILURE,
  GET_TEACHER_LIST_SUCCESS,
  GET_STUDENT_LIST_SUCCESS,
  GET_STUDENT_LIST_REQUEST,
  GET_TEACHER_LIST_REQUEST,
  GET_STUDENT_LIST_FAILURE,
  GET_TEACHER_LIST_FAILURE,
} from "./ActionType";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  jwt: null,
  favorites: [],
  success: null,
  teachers: [],
  students: [],
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
    case GET_USER_REQUEST:
    case RESET_PASSWORD_REQUEST:
    case REQUEST_RESET_PASSWORD_REQUEST:
    case GET_STUDENT_LIST_REQUEST:
    case GET_TEACHER_LIST_REQUEST:
      return { ...state, isLoading: true, error: null, success: null };

    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        jwt: action.payload,
        success: "Register Success",
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        jwt: action.payload,
        success: "Login success",
      };

    case GET_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
        favorites: action.payload.favorites,
      };

    case GET_TEACHER_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        teachers: action.payload,
      };
    case GET_STUDENT_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        students: action.payload,
      };

    case REQUEST_RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: action.payload?.message,
      };

    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    case GET_USER_FAILURE:
    case REQUEST_RESET_PASSWORD_FAILURE:
    case GET_STUDENT_LIST_FAILURE:
    case GET_TEACHER_LIST_FAILURE:
      return { ...state, isLoading: false, error: action.payload };

    case LOGOUT:
      localStorage.removeItem("jwt");
      return { ...state, jwt: null, user: null, success: "logout success" };
    default:
      return state;
  }
};

export default authReducer;
