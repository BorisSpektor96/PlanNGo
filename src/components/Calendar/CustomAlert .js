import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const CustomAlert = ({ isOpen, toggle, message, onConfirm }) => {
  return (
    <Modal  isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Alert</ModalHeader>
      <ModalBody>{message}</ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={onConfirm}>
          I'm sure
        </Button>{" "}
        <Button color="danger" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CustomAlert;