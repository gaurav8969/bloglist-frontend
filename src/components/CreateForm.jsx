import { useState } from 'react';

import { useDispatch } from 'react-redux';
import { createBlog } from '../reducers/bloglistReducer';

const CreateForm = ({ formRef }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const dispatch = useDispatch();

  const create = async (event) => {
    event.preventDefault();

    const newBlog = {
      title,
      author,
      url
    };

    try{
      dispatch(createBlog(newBlog));
      setTitle('');
      setAuthor('');
      setUrl('');
      formRef.current.toggleVisibility();
    }catch(error){
      //notifyHelper.blogError(setDisplayMessage, setSuccess);
      console.log(error);
    }
  };

  return(
    <form onSubmit={create}>
      <h2>create new</h2>
      <div>
        title: <input value={title} onChange= {(e) => {setTitle(e.target.value);}}/>
      </div>
      <div>
        author: <input value={author} onChange= {(e) => {setAuthor(e.target.value);}}/>
      </div>
      <div>
        url: <input value={url} onChange= {(e) => {setUrl(e.target.value);}}/>
      </div>
      <div>
        <button type="submit">create</button>
      </div>
    </form>
  );
};

export default CreateForm;