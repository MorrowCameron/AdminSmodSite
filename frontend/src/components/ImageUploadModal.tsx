import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

interface ImageUploadModalProps {
  show: boolean;
  onHide: () => void;
  onUpload: (file: File, alt: string) => void;
}

const ImageUploadModal: React.FC<ImageUploadModalProps> = ({ show, onHide, onUpload }) => {
  const [file, setFile] = useState<File | null>(null);
  const [altText, setAltText] = useState<string>("");

  const handleSubmit = () => {
    if (file) {
      onUpload(file, altText.trim());
      setFile(null);
      setAltText("");
    }
    onHide();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null;
    setFile(selected);
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Upload Image</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="formFile">
          <Form.Label>Select an image</Form.Label>
          <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
        </Form.Group>
        <Form.Group controlId="formAltText" className="mt-3">
          <Form.Label>Alt Text</Form.Label>
          <Form.Control
            type="text"
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
            placeholder="Describe the image"
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={!file}>
          Upload
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ImageUploadModal;
