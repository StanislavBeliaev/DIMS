import { configureStore } from '@reduxjs/toolkit';
import dataReducer from 'features/counter/dataSilce';
import counterReducer from 'features/counter/counterSlice';
import userReducer from 'features/counter/userSlice';

export default configureStore({
    reducer: {
        counter: counterReducer,
        fulldata: dataReducer,
        user: userReducer,
    },
});
