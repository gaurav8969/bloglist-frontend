import { useState, useEffect } from 'react';

import LoginForm from './components/Login';
import BLogPage from './components/BlogPage';
import blogService from './services/blogs';

const App = () => {
  const [user, setUser] = useState(null);
  const [displayMessage, setDisplayMessage] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      setUser(user);
    }
  }, []);

  return (
    <div>
      {
        user === null
          ?(<LoginForm setUser={setUser} success={success} setSuccess={setSuccess}
            displayMessage={displayMessage} setDisplayMessage={setDisplayMessage}/>)
          :(<BLogPage user={user} setUser={setUser} success={success} setSuccess={setSuccess}
            displayMessage={displayMessage} setDisplayMessage={setDisplayMessage}/>)
      }
    </div>
  );
};

export default App;