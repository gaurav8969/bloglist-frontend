import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './reducers/notificationReducer';
import bloglistReducer from './reducers/bloglistReducer';
import likeReducer from './reducers/likeReducer';
import userReducer from './reducers/userReducer';

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    bloglist: bloglistReducer,
    like: likeReducer,
    user: userReducer
  }
});

export default store;