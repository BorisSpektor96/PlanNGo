import Modal from "../UI/Modal"
import { Input, Label } from "reactstrap";
const MessageContent = ({ onClose, message }) => {

  if (!message) return

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
        <div>
          <div >
            <p className="text-center text-muted">
              Message { message.status === "sent" ? "to:  " : "from:  " } { message.businessEmail ? message.businessEmail : message.userEmail }
            </p>
          </div>
          <Label>Subject</Label>
          <fieldset disabled>
            <Input
              className=" w-100 form-control-sm"
              placeholder={ message.subject ? message.subject : "" }
              name="question"
              type="text"
            />
            <div className="mt-2">
              <Label>Content</Label>
              <textarea
                rows="13"
                placeholder={ message.content }
                className="form-control-sm form-control"
              ></textarea>
            </div>
          </fieldset>
        </div>
      </div>
    </Modal>
  )

}

export default MessageContent