import { useState, useEffect, useRef } from 'react';
import Blog from './Blog';
import blogService from '../services/blogs';
import CreateForm from './CreateForm';
import Notification from './Notification';
import Togglable from './Togglable';
import { useDispatch, useSelector } from 'react-redux';
import { setBlogs } from '../reducers/bloglistReducer';
import { setLike } from '../reducers/likeReducer';
import { setUser } from '../reducers/userReducer';

const BlogPage = () => {
  const blogs = useSelector(state => state.bloglist);
  const liked = useSelector(state => state.like);
  const user = useSelector(state => state.user);
  const createFormRef = useRef();
  const dispatch = useDispatch();

  const loggedIn = () => {
    return `${user.name} logged in`;
  };

  const logout = () => {
    dispatch(setUser(null));
    window.localStorage.removeItem('loggedBlogappUser');
  };

  const compareByLikes = (blog1, blog2) => {
    return blog2.likes - blog1.likes;
  };

  const isSortedByLikes = arr => arr.every((blog, i, a) => !i || a[i - 1].likes >= blog.likes);

  useEffect(() => {
    blogService.getAll()
      .then(blogsDb => {
        if(blogs.length === 0 || !isSortedByLikes(blogs) || liked){
          dispatch(setLike(false));
          blogsDb.sort(compareByLikes);
          dispatch(setBlogs(blogsDb));
        }
      });}
  ,[blogs]);

  return (
    <>
      <h2>blogs</h2>
      <Notification />
      {loggedIn()}
      <button onClick={logout}>
        logout
      </button>
      <br />
      <br />
      {
        blogs.map(blog => {
          //blog.user.id for blogs populated from get request
          //blog.user for newly added blogs before page reload
          if(blog.user.id === user.id || blog.user === user.id){
            return (<Blog key={blog.id} blog={blog} />);
          }
          return;
        })
      }

      <Togglable showLabel="add blog" hideLabel="hide" ref={createFormRef}>
        <CreateForm formRef={createFormRef}/>
      </Togglable>

    </>
  );
};

export default BlogPage;