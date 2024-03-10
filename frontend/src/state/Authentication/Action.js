import {
  GET_STUDENT_LIST_FAILURE,
  GET_STUDENT_LIST_REQUEST,
  GET_STUDENT_LIST_SUCCESS,
  GET_TEACHER_LIST_FAILURE,
  GET_TEACHER_LIST_REQUEST,
  GET_TEACHER_LIST_SUCCESS,
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REQUEST_RESET_PASSWORD_FAILURE,
  REQUEST_RESET_PASSWORD_REQUEST,
  REQUEST_RESET_PASSWORD_SUCCESS,
} from "./ActionType";
import { API_URL, api } from "../../config/api";
import axios from "axios";

export const createUser = (reqData) => async (dispatch) => {
  console.log("resgister request data ",reqData.userData)
  try {
    dispatch({ type: REGISTER_REQUEST });

    const { data } = await axios.post(`${API_URL}/auth/signup`, reqData.userData);
    // if(data.jwt) localStorage.setItem("jwt",data.jwt)
    // if(data.role==="ROLE_RESTAURANT_OWNER"){
    //   reqData.navigate("/admin/restaurant")
    // }
    
      // reqData.navigate("/")
    
    dispatch({ type: REGISTER_SUCCESS, payload: data.jwt });
  } catch (error) {
    console.log("catch error ------ ",error)
    dispatch({
      type: REGISTER_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const loginUser = (reqData) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const { data } = await axios.post(`${API_URL}/auth/signin`, reqData.data);
    if(data.jwt) localStorage.setItem("jwt",data.jwt)
    // if(data.role==="ROLE_RESTAURANT_OWNER"){
    //   reqData.navigate("/admin/restaurant")
    // }
   
      reqData.navigate("/")
      console.log("login successful",data)
    
    
    dispatch({ type: LOGIN_SUCCESS, payload: data.jwt });
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const getUser = (token) => {
  return async (dispatch) => {
    dispatch({ type: GET_USER_REQUEST });
    try {
      const response = await api.get(`/api/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const user = response.data;
      
      dispatch({ type: GET_USER_SUCCESS, payload: user });
      console.log("req User ", user);
    } catch (error) {
      const errorMessage = error.message;
      dispatch({ type: GET_USER_FAILURE, payload: errorMessage });
    }
  };
};

export const getTeacherList = (jwt) => {
  return async (dispatch) => {
    dispatch({ type: GET_TEACHER_LIST_REQUEST });
    try {
      const response = await api.get(`/api/users/customers/ROLE_TEACHER`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      const teachers = response.data;
      
      dispatch({ type: GET_TEACHER_LIST_SUCCESS, payload: teachers });
      console.log("req User ", teachers);
    } catch (error) {
      const errorMessage = error.message;
      dispatch({ type: GET_TEACHER_LIST_FAILURE, payload: errorMessage });
    }
  };
};

export const getStudentList = (jwt) => {
  return async (dispatch) => {
    dispatch({ type: GET_STUDENT_LIST_REQUEST });
    try {
      const response = await api.get(`/api/users/customers/ROLE_STUDENT`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      const students = response.data;
      
      dispatch({ type: GET_STUDENT_LIST_SUCCESS, payload: students });
      console.log("req User ", students);
    } catch (error) {
      const errorMessage = error.message;
      dispatch({ type: GET_STUDENT_LIST_FAILURE, payload: errorMessage });
    }
  };
};

export const resetPasswordRequest = (email) => async (dispatch) => {
  dispatch({type:REQUEST_RESET_PASSWORD_REQUEST});
  try {
    const {data} = await axios.post(`${API_URL}/auth/reset-password-request?email=${email}`,{});
    
    console.log("reset password -: ", data);
   
    dispatch({type:REQUEST_RESET_PASSWORD_SUCCESS,payload:data});
  } catch (error) {
    console.log("error ",error)
    dispatch({type:REQUEST_RESET_PASSWORD_FAILURE,payload:error.message});
  }
};

export const resetPassword = (reqData) => async (dispatch) => {
  dispatch({type:REQUEST_RESET_PASSWORD_REQUEST});
  try {
    const {data} = await axios.post(`${API_URL}/auth/reset-password`,reqData.data);
    
    console.log("reset password -: ", data);

    reqData.navigate("/password-change-success")
   
    dispatch({type:REQUEST_RESET_PASSWORD_SUCCESS,payload:data});
  } catch (error) {
    console.log("error ",error)
    dispatch({type:REQUEST_RESET_PASSWORD_FAILURE,payload:error.message});
  }
};

export const logout = () => {
  return async (dispatch) => {
    dispatch({ type: LOGOUT });
    localStorage.clear();
  };
};



