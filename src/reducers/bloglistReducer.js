import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';
import { setNotification } from './notificationReducer';
import blogsHelper from '../services/blogs';
import { setLike } from './likeReducer';

const bloglistSlice = createSlice({
  name: 'bloglist',
  initialState: [],
  reducers: {
    addBlog(state, action) {
      state.push(action.payload);
    },
    setBlogs(state,action){
      return action.payload;
    }
  }
});

export default bloglistSlice.reducer;

export const { addBlog, setBlogs } = bloglistSlice.actions;

export const createBlog = (newBlog) => {
  return async dispatch => {
    const newBlogInDb = await blogService.add(newBlog);
    dispatch(addBlog(newBlogInDb));
    dispatch(setNotification(`new blog ${newBlog.title} by ${newBlog.author} added`, true, 5000));
  };
};

export const updateBlog = (blogs, updatedBlog) => {
  return async dispatch => {
    const savedBlog = await blogsHelper.update(updatedBlog);
    const filtered = blogs.filter((blogEntry) => {
      return blogEntry.id !== updatedBlog.id;
    });

    filtered.push(savedBlog);
    dispatch(setBlogs(filtered));
    dispatch(setLike(true));
  };
};

export const removeBlogRedux = (blogs, blog) => {
  return async dispatch => {
    await blogsHelper.remove(blog.id);
    const filtered = blogs.filter((blogEntry) => {
      return blogEntry.id !== blog.id;
    });
    dispatch(setBlogs(filtered));
    dispatch(setNotification(`${blog.title} by ${blog.author} has been deleted`, true, 3000));
  };
};