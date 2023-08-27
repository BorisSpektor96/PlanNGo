import Modal from "../UI/Modal"

const MessageContent = ({ onClose, message }) => {



  return (
    <Modal>
      <div class="d-flex flex-row justify-content-end p-1 w-100 ">
        <button
          type="button"
          class="btn-close"
          aria-label="Close"
          dal
          onClick={ onClose }
        ></button>
      </div>
      <div>
        <p>
          { message.content }
        </p>
      </div>
    </Modal>
  )

}

export default MessageContent