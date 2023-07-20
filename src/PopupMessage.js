import React, { createContext, useState } from 'react';
import Alert from '@mui/joy/Alert';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import ReportIcon from '@mui/icons-material/Report';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export const PopupMessageContext = createContext();

const PopupProvider = ({ children }) => {

  const alertType = {
    "Success": { title: 'Success', color: 'success', icon: <CheckCircleIcon /> },
    "Warning": { title: 'Warning', color: 'warning', icon: <WarningIcon /> },
    "Error": { title: 'Error', color: 'danger', icon: <ReportIcon /> },
    "Info": { title: 'Info', color: 'info', icon: <InfoIcon /> }
  }

  const [ message, setMessage ] = useState();
  const [ style, setStyle ] = useState({});
  const [ isVisible, setIsVisible ] = useState(false);

  const showMessage = (message, type, timeout = 3000) => {
    setMessage(message)
    setStyle(alertType[ type ]);
    setIsVisible(true);

    setTimeout(() => {
      setIsVisible(false);
      setMessage('');
      setStyle({})
    }, timeout);
  };

  return (
    <PopupMessageContext.Provider value={ { showMessage } }>
      { children }
      { isVisible &&
        <div className='border rounded border-dark'
          style={ {
            position: 'fixed',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 999
          } }>
          <Alert
            key={ style.title }
            startDecorator={ React.cloneElement(style.icon, {
              sx: { mt: '2px', mx: '4px' },
              fontSize: 'xl2',
            }) }
            color={ style.color }>
            { message }</Alert>
        </div> }
    </PopupMessageContext.Provider>
  );
};
export default PopupProvider;
