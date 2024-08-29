import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { likeBlog, setLike } from '../reducers/likeReducer';
import { removeBlogRedux } from '../reducers/bloglistReducer';

const Blog = ({ blog }) => {
  const [collapsed, setCollapse] = useState(true);
  const blogs = useSelector(state => state.bloglist);
  const dispatch = useDispatch();

  const toggleCollapse = () => {
    setCollapse(!collapsed);
  };

  const incrementLikes = async () => {
    const changedBlog = {
      ...blog,
      likes:blog.likes + 1
    };
    changedBlog.user = changedBlog.user.id;
    dispatch(likeBlog(blogs, changedBlog));
  };

  const removeBlogListener = () => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)){
      dispatch(removeBlogRedux(blogs, blog));
    }
  };

  if(collapsed){
    return (
      <div>
        {blog.title} {blog.author} <button onClick={toggleCollapse}>view</button>
      </div>
    );
  }else{
    //console.log('user is', blog.user);
    return (
      <>
        {blog.title} {blog.author} <button onClick={toggleCollapse}>hide</button>
        <br />
        {blog.url}
        <br />
        likes {blog.likes} <button onClick={incrementLikes}>like</button>
        <br />
        {blog.author}
        <br />
        {blog.user.name}
        <br />
        <button onClick={removeBlogListener}>remove</button>
        <br />
      </>
    );
  }
};

export default Blog;