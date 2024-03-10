import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import {thunk} from "redux-thunk";
import authReducer from "../Authentication/Reducer";
import bookingReducer from "../Booking/Reducer";
import teacherReducer from "../Teacher/Reducer";



const rootReducer=combineReducers({

    auth:authReducer,
    booking:bookingReducer,
    teacher:teacherReducer

})

export const store=legacy_createStore(rootReducer,applyMiddleware(thunk))