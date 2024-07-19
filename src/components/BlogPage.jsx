import { useState, useEffect, useRef } from 'react';
import Blog from './Blog';
import blogService from '../services/blogs';
import CreateForm from './CreateForm';
import Notification from './Notification';
import Togglable from './Togglable';

const BlogPage = ({ user, setUser, success, setSuccess, displayMessage, setDisplayMessage }) => {
  const [blogs, setBlogs] = useState([]);
  const [liked, setLiked] = useState(false);
  const createFormRef = useRef();

  const loggedIn = () => {
    return `${user.name} logged in`;
  };

  const logout = () => {
    setUser(null);
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
          setLiked(false);
          blogsDb.sort(compareByLikes);
          setBlogs(blogsDb);
        }
      });}
  ,[blogs]);

  return (
    <>
      <h2>blogs</h2>
      <Notification displayMessage={displayMessage} success={success}/>
      {loggedIn()}
      <button onClick={logout}>
        logout
      </button>
      <br />
      <br />
      {
        blogs.map(blog => {
          //blog.user.id for blogs populated from get request
          //blog.user for newly added blogs before reload
          if(blog.user.id === user.id || blog.user === user.id){
            return (<Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs}
              setLiked={setLiked} />);
          }
          return;
        })
      }

      <Togglable showLabel="add blog" hideLabel="hide" ref={createFormRef}>
        <CreateForm setDisplayMessage={setDisplayMessage} setSuccess={setSuccess}
          blogs={blogs} setBlogs={setBlogs} formRef={createFormRef}/>
      </Togglable>

    </>
  );
};

export default BlogPage;