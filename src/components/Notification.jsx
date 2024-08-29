import { useSelector } from 'react-redux';

const Notification = () => {
  const { message, success } = useSelector(state => state.notification);
  const green = '#00FF00';
  const red = '#FF0000';

  const style = {
    color: `${(success)?green:red}`
  };

  if(message === '')return null;
  return(
    <h3 style={style}>{message} </h3>
  );
};

export default Notification;