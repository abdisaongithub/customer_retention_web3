import {createSlice} from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    initialState: {
        notification: null
    },
    name: 'notification',
    reducers: {
        setCurrentNotification: (state, action) => {
            state.notification = action.payload
        },
        removeCurrentNotification: (state, action) =>{
            state.notification = null
        }
    }
})

export const { setCurrentNotification, removeCurrentNotification } = notificationSlice.actions

export default notificationSlice