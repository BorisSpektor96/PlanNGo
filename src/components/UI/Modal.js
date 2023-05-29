import { createPortal } from 'react-dom';
import classes from './Modal.module.css';


const Backdrop = (props) => {
  return <div className={ classes.backdrop } onClose={ props.onClose } />;
};

const ModalOverlay = (props) => {

  return (
    <div className={ classes.modal }>
      {/* <div class="d-flex flex-row justify-content-end p-1 w-100 p-3 ">
        <button
          type="button"
          class="btn-close"
          aria-label="Close"
          dal
          onClick={ props.onClose }
        ></button>
      </div> */}
      <div className="pb-4">{ props.children }</div>
    </div>
  );
};


const portalElement = document.getElementById('overLay');
const portalCalendar = document.getElementById('calendarOverlay');
const ReviewportalElement = document.getElementById("ReviewOverLay");

const Modal = (props) => {
  return (
    <div>
      <div>
        { createPortal(<Backdrop onClose={ props.onClose } />, portalElement) }
        { createPortal(
          <ModalOverlay>{ props.children }</ModalOverlay>,
          portalElement
        ) }
      </div>
      <div>
        { createPortal(<Backdrop onClose={ props.onClose } />, portalCalendar) }
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
    </div>
  );
};

export default Modal;