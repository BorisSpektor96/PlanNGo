import { useState } from "react";
import style from './Alert.module.css'

const Alert = ({ isDefaultShown = false, timeout = 250, type, message }) => {

  const [ isShown, setIsShown ] = useState(isDefaultShown);
  const [ isLeaving, setIsLeaving ] = useState(false);

  let timeoutId = null;

  React.useEffect(() => {
    setIsShown(true);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [ isDefaultShown, timeout, timeoutId ]);

  const closeAlert = () => {
    setIsLeaving(true);
    timeoutId = setTimeout(() => {
      setIsLeaving(false);
      setIsShown(false);
    }, timeout);
  };

  return (
    isShown && (
      <div
        className={ `alert ${type} ${isLeaving ? 'leaving' : ''}` }
        role="alert"
      >
        <button className="close" onClick={ closeAlert } />
        { message }
      </div>
    )
  );
};