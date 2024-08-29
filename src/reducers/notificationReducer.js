import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    success: true,
    message: ''
  },
  reducers: {
    notify(state, action){
      state.message = action.payload.message;
      state.success = action.payload.success;
    },
    hide(state, action){
      state.message = '';
    }
  },
});

export default notificationSlice.reducer;
export const { notify, hide } = notificationSlice.actions;

export const setNotification = (message, success, timeout) => {
  return dispatch => {
    dispatch(notify({
      message,
      success
    }));
    setTimeout(() => dispatch(hide()), timeout);
  };
};