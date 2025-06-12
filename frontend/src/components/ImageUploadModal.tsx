import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface ImageUploadModalProps {
  show: boolean;
  onHide: () => void;
  onUpload: (dataUrl: string, fileName: string) => void;
}

const ImageUploadModal: React.FC<ImageUploadModalProps> = ({ show, onHide, onUpload }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      onUpload(reader.result as string, file.name);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Upload Image</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ImageUploadModal;
