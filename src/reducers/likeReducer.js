import { createSlice } from '@reduxjs/toolkit';
import { updateBlog } from './bloglistReducer';
import { setNotification } from './notificationReducer';

const likeSlice = createSlice({
  name: 'like',
  initialState: false,
  reducers: {
    setLike(state, action){
      return action.payload;
    }
  },
});

export default likeSlice.reducer;
export const { setLike } = likeSlice.actions;

export const likeBlog = (blogs, updatedBlog) => {
  return dispatch => {
    dispatch(updateBlog(blogs, updatedBlog));
    dispatch(setNotification(`${updatedBlog.title} by ${updatedBlog.author} has been voted up`
      , true, 2000));
  };
};