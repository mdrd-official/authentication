import {configureStore} from '@reduxjs/toolkit';
import userAuthReducer from './features/auth/userSlice';
import adminAuthReducer from './features/auth/adminSlice';

const store = configureStore({
    reducer:{
        userAuth:userAuthReducer,
        adminAuth:adminAuthReducer
    }
})
export default store;

