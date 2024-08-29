import { useEffect } from 'react';

import LoginForm from './components/Login';
import BLogPage from './components/BlogPage';
import blogService from './services/blogs';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './reducers/userReducer';

const App = () => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      dispatch(setUser(user));
    }
  }, []);

  return (
    <div>
      {
        user === null
          ?(<LoginForm />)
          :(<BLogPage />)
      }
    </div>
  );
};

export default App;