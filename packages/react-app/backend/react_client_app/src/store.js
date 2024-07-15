import { configureStore } from '@reduxjs/toolkit'
import apiSlice from "./api/apiSlice";
import notificationSlice from "./localNotificationSlice";

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        notification: notificationSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
})

export default store