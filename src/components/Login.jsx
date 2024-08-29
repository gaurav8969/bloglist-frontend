import loginService from '../services/login';
import blogService from '../services/blogs';
import { useState } from 'react';
import Notification from './Notification';
import { useDispatch } from 'react-redux';
import { setUser } from '../reducers/userReducer';
import { setNotification } from '../reducers/notificationReducer';

const LoginForm = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    try{
      const user = await loginService.login({
        username, password
      });

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      );

      dispatch(setUser(user));
      setUsername('');
      setPassword('');
      blogService.setToken(user.token);
    }catch(exception){
      dispatch(setNotification('invalid credentials', false, 5000));
    }
  };

  return(
    <form onSubmit= {handleLogin}>
      <h2>log in to application</h2>
      <Notification />
      <div>
        username: <input value={username} onChange= {(e) => {setUsername(e.target.value);}}/>
      </div>
      <div>
        password: <input value={password} onChange= {(e) => {setPassword(e.target.value);}}/>
      </div>
      <div>
        <button type="submit">login</button>
      </div>
    </form>
  );
};

export default LoginForm;