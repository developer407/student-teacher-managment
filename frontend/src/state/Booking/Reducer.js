import * as types from './actionTypes';

const initialState = {
  bookings: [],
  booking: null,
  loading: false,
  error: null,
  updateRequest:null
};

const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_BOOKING_REQUEST:
    case types.UPDATE_BOOKING_REQUEST:
    case types.DELETE_BOOKING_REQUEST:
    case types.GET_BOOKING_REQUEST:
    case types.GET_ALL_BOOKINGS_REQUEST:
    case types.GET_BOOKING_HISTORY_REQUEST:
    case types.GET_UPDATE_BOOKING_REQUEST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.CREATE_BOOKING_SUCCESS:
      return {
        ...state,
        loading: false,
        booking: action.payload,
      };
      case types.GET_UPDATE_BOOKING_REQUEST_SUCCESS:
      case types.CREATE_UPDATE_BOOKING_SUCCESS:
        return {
          ...state,
          loading: false,
          updateRequest: action.payload,
        };
        case types.PROCESS_UPDATE_BOOKING_SUCCESS:
          return {
            ...state,
            loading: false,
            updateRequest: null,
            booking:action.payload
          };
    case types.UPDATE_BOOKING_SUCCESS:
      return {
        ...state,
        loading: false,
        booking: action.payload,
      };
    case types.DELETE_BOOKING_SUCCESS:
      return {
        ...state,
        loading: false,
        bookings: state.bookings.filter((booking) => booking.id !== action.payload),
      };
    case types.GET_BOOKING_SUCCESS:
      
      return {
        ...state,
        loading: false,
        booking: action.payload,
      };
    case types.GET_ALL_BOOKINGS_SUCCESS:
    case types.GET_BOOKING_HISTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        bookings: action.payload,
      };
    case types.CREATE_BOOKING_FAILURE:
    case types.UPDATE_BOOKING_FAILURE:
    case types.DELETE_BOOKING_FAILURE:
    case types.GET_UPDATE_BOOKING_REQUEST_FAILURE:
    case types.GET_BOOKING_FAILURE:
    case types.GET_ALL_BOOKINGS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default bookingReducer;

