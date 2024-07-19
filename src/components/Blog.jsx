import { useState, useEffect } from 'react';
import blogsHelper from '../services/blogs';

const Blog = ({ blog, blogs, setBlogs, setLiked }) => {
  const [collapsed, setCollapse] = useState(true);

  const toggleCollapse = () => {
    setCollapse(!collapsed);
  };

  const incrementLikes = async () => {
    const changedBlog = {
      ...blog,
      likes:blog.likes + 1
    };
    changedBlog.user = changedBlog.user.id;
    const savedBlog = await blogsHelper.update(changedBlog);
    const filtered = blogs.filter((blogEntry) => {
      return blogEntry.id !== blog.id;
    });

    filtered.push(savedBlog);
    setBlogs(filtered);
    setLiked(true);
  };

  const removeBlog = async () => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)){
      await blogsHelper.remove(blog.id);
      const filtered = blogs.filter((blogEntry) => {
        return blogEntry.id !== blog.id;
      });
      setBlogs(filtered);
    }
  };

  if(collapsed){
    return (
      <div>
        {blog.title} {blog.author} <button onClick={toggleCollapse}>view</button>
      </div>
    );
  }else{
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
        <button onClick={removeBlog}>remove</button>
        <br />
      </>
    );
  }
};

export default Blog;