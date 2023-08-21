import { createPortal } from 'react-dom';
import classes from './Modal.module.css';

const Backdrop = (props) => {
  return <div className={ classes.backdrop } onClose={ props.onClose } />;
};

const ModalOverlay = (props) => {
  return (
    <div className={ classes.modal }>
      <div className="pb-4">{ props.children }</div>
    </div>
  );
};


const portalElement = document.getElementById('overLay');
const portalCalendar = document.getElementById('calendarOverlay');
const ReviewportalElement = document.getElementById("ReviewOverLay");
const AddMessagePortalElement = document.getElementById("addMessageOverLay");
const ChangePassword = document.getElementById("ChangePassword");

const Modal = (props) => {
  return (
    <div>
      <div>
        { createPortal(<Backdrop onClose={ props.onClose } />, ChangePassword) }
        { createPortal(
          <ModalOverlay>{ props.children }</ModalOverlay>,
          ChangePassword
        )
        }
      </div>
      <div>
        { createPortal(<Backdrop onClose={ props.onClose } />, portalElement) }
        { createPortal(
          <ModalOverlay>{ props.children }</ModalOverlay>,
          portalElement
        ) }
      </div>
      <div>
        { createPortal(<Backdrop onClose={ () => props.onClose([]) } />, portalCalendar) }
        { createPortal(
          <ModalOverlay>{ props.children }</ModalOverlay>,
          portalCalendar
        )
        }
      </div>
      <div>
        { createPortal(<Backdrop onClose={ props.onClose } />, ReviewportalElement) }
        { createPortal(
          <ModalOverlay>{ props.children }</ModalOverlay>,
          ReviewportalElement
        ) }
      </div>
      <div>
        { createPortal(<Backdrop onClose={ props.onClose } />, AddMessagePortalElement) }
        { createPortal(
          <ModalOverlay>{ props.children }</ModalOverlay>,
          AddMessagePortalElement
        )
        }
      </div>
    </div>
  );
};

export default Modal;
