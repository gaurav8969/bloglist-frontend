import loginService from '../services/login';
import blogService from '../services/blogs';
import { useState } from 'react';
import Notification from './Notification';
import notifyHelper from '../../utils/notifyHelper';

const LoginForm = ({ setUser, displayMessage, success, setSuccess, setDisplayMessage }) => {
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

      setUser(user);
      setUsername('');
      setPassword('');
      blogService.setToken(user.token);
    }catch(exception){
      console.log(exception);
      notifyHelper.loginFail(setDisplayMessage, setSuccess);
    }
  };

  return(
    <form onSubmit= {handleLogin}>
      <h2>log in to application</h2>
      <Notification displayMessage={displayMessage} success={success}/>
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