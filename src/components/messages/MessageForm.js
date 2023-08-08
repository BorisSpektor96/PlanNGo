import React, { useContext, useState, useEffect } from "react";
import { Input, Label } from "reactstrap";
import Modal from "../UI/Modal";
import { PopupMessageContext } from "./../../PopupMessage";

const MessageForm = ({ to, from, type, onClose }) => {
  const { showMessage } = useContext(PopupMessageContext);
  const [ formValues, setFormValues ] = useState({
    subject: "",
    content: "",
  });

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
      const response = await fetch("http://localhost:3001/business/addMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: reqEmailBusiness, // Use reqEmailBusiness instead of reqEmail
          mmessage: {
            subject: formValues.subject,
            content: formValues.content,
            userEmail: messageEmailBusiness, // Use changedTo instead of to
            status: bStatus,
            read: bRead,
            date: currentDate.toISOString(),
          },
        }),
      });
      const data = await response.json();
      showMessage(data.message, data.type);
    } catch (error) {
      console.log("Error:", error);
      showMessage("Failed to send message to business", "Error");
    }
  };

  const sendMessageToUser = async () => {
    try {
      const currentDate = new Date();
      const response = await fetch("http://localhost:3001/users/addMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: reqEmailUser, // Use reqEmailUser instead of to
          mmessage: {
            subject: formValues.subject,
            content: formValues.content,
            businessEmail: messageEmailUser, // Use changedFrom instead of from
            status: uStatus,
            read: uRead,
            date: currentDate.toISOString(),
          },
        }),
      });

      const data = await response.json();
      showMessage(data.message, data.type);
    } catch (error) {
      console.log("Error:", error);
      showMessage("Failed to send message to user", "Error");
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