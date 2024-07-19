const Notification = ({ displayMessage, success }) => {
  const green = '#00FF00';
  const red = '#FF0000';

  const style = {
    color: `${(success)?green:red}`
  };

  if(displayMessage === '')return null;
  return(
    <h3 style={style}>{displayMessage} </h3>
  );
};

export default Notification;