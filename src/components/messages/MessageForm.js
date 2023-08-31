import React, { useContext, useState } from "react";
import { Input, Label } from "reactstrap";
import Modal from "../UI/Modal";
import { PopupMessageContext } from "./../../PopupMessage";
import { updateMessages } from "../../profileInfoSlice";
import { useDispatch } from "react-redux";
import { sendMessage, createMessage } from './sendMessage';

const MessageForm = ({ to, from, type, onClose }) => {

  const { showMessage } = useContext(PopupMessageContext);
  const [ formValues, setFormValues ] = useState({
    subject: "",
    content: "",
  });

  const dispatch = useDispatch()

  const uRead = type === "business" ? false : true;
  const bRead = type === "user" ? false : true;
  const uStatus = type === "user" ? "sent" : "received";
  const bStatus = type === "user" ? "received" : "sent";
  const reqEmailUser = type === "user" ? from : to;
  const reqEmailBusiness = type === "business" ? from : to;
  const messageEmailUser = type === "user" ? to : from;
  const messageEmailBusiness = type === "business" ? to : from;

  const onChange = (e) => {
    setFormValues({ ...formValues, [ e.target.name ]: e.target.value });
  };
  const currentDate = new Date();

  const sendMessageToBusiness = async () => {
    try {
      const messageData = createMessage(
        bRead,
        messageEmailBusiness,
        currentDate.toISOString(),
        formValues.content,
        bStatus,
        formValues.subject,
        true
      );
      const response = await sendMessage(reqEmailBusiness, messageData, true);
      showMessage(response.message, response.type);
      dispatch(updateMessages(response.messages))

    } catch (error) {
      console.log("Error:", error);
      showMessage("Failed to send message to business", "Error");
    }
  };

  const sendMessageToUser = async () => {
    try {
      const messageData = createMessage(
        uRead,
        messageEmailUser,
        currentDate.toISOString(),
        formValues.content,
        uStatus,
        formValues.subject,
        false,
      );

      const response = await sendMessage(reqEmailUser, messageData, false);
      showMessage(response.message, response ? "Success" : "Error");

      if (response) {
        dispatch(updateMessages(response.messages));
      }
    } catch (error) {
      console.log("Error:", error);
      showMessage("Failed to send message to business", "Error");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await sendMessageToBusiness();
    await sendMessageToUser();
    onClose();
  };

  return (
    <Modal>
      <div className="d-flex flex-row justify-content-end p-1 w-100 p-3 ">
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          dal
          onClick={ onClose }
        ></button>
      </div>

      <form
        className="form-check d-flex flex-column justify-content-center  p-2"
        onSubmit={ handleSubmit }
      >
        <p className="text-center display-7">Message the Business</p>
        <div className="lh-1 ">
          <div className="lh-1">
            <p style={ { fontSize: "13px" } }>to: { to }</p>
            <p style={ { fontSize: "13px" } }>from: { from }</p>
          </div>
        </div>

        <Label className="mt-2 mb-0" for="content">
          Subject
        </Label>
        <Input
          id="1"
          name="subject"
          type="text"
          placeholder="Message subject"
          errorMessage="Subject is required"
          label="Subject"
          required={ true }
          onChange={ onChange }
          className="form-control-sm"
          value={ formValues.subject }
        />

        <Label className="mt-2 mb-0" for="content">
          Content
        </Label>
        <textarea
          rows="12"
          id="2"
          name="content"
          className="form-control-sm form-control"
          placeholder="Message content"
          type="text"
          errorMessage="Content is required"
          label="Content"
          required={ true }
          onChange={ onChange }
          value={ formValues.content }
        />

        <button type="submit" className="btn btn-primary m-2">
          Submit
        </button>
      </form>
    </Modal>
  );
};

export default MessageForm;