import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import {thunk} from "redux-thunk";
import authReducer from "../Authentication/Reducer";
import bookingReducer from "../Booking/Reducer";



const rootReducer=combineReducers({

    auth:authReducer,
    booking:bookingReducer,

})

export const store=legacy_createStore(rootReducer,applyMiddleware(thunk))