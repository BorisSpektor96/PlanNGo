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

const Modal = (props) => {
  return (
    <div>
      { createPortal(<Backdrop onClose={ props.onClose } />, portalElement) }
      { createPortal(
        <ModalOverlay>{ props.children }</ModalOverlay>,
        portalElement
      ) }
    </div>


  );
};

export default Modal;