import {configureStore} from "@reduxjs/toolkit";
import listReducer from './reducers/listSlice'

const store = configureStore({
    reducer: {
        listReducer
    }
})

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;