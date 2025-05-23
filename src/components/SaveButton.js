// src/components/SaveButton.js
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import './SaveButton.css'; // for additional custom styles

const SaveButton = ({
  onSave,
  confirmText = 'Are you sure you want to save these changes?',
  buttonLabel = 'Save?',
}) => {
  const [show, setShow] = useState(false);

  const handleConfirm = () => {
    if (onSave) onSave();
    setShow(false);
  };

  return (
    <>
      <div className="saveButtonContainer">
        <button className="saveButton" onClick={() => setShow(true)}>
          {buttonLabel}
        </button>
      </div>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        centered
        dialogClassName="customSaveModal"
      >
        <Modal.Header closeButton className="saveModalHeader">
          <Modal.Title className="saveModalTitle">Confirm Save</Modal.Title>
        </Modal.Header>

        <Modal.Body className="saveModalBody">
          <p> Are you sure you want to save these changes? This will change the live Smile and Nod website.</p>
        </Modal.Body>

        <Modal.Footer className="saveModalFooter">
          <Button
            variant="secondary"
            className="cancelButton"
            onClick={() => setShow(false)}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            className="confirmButton"
            onClick={handleConfirm}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SaveButton;
