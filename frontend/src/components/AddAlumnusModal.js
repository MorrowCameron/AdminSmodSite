// src/components/AddAlumnusModal.jsx
import React from 'react';

const AddAlumnusModal = ({ newAlumnus, onChange, onAdd, onCancel }) => (
  <div className="modalOverlay">
    <div className="modalContent">
      <h2>Add New Alumnus</h2>
      <input
        type="text"
        placeholder="First Name"
        value={newAlumnus.first_name}
        onChange={(e) => onChange({ ...newAlumnus, first_name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={newAlumnus.last_name}
        onChange={(e) => onChange({ ...newAlumnus, last_name: e.target.value })}
      />
      <div className="modalButtonRow">
        <button className="modalButton" onClick={onCancel}>Cancel</button>
        <button
          className="modalButton"
          onClick={onAdd}
          disabled={!newAlumnus.first_name || !newAlumnus.last_name}
        >
          Add
        </button>
      </div>
    </div>
  </div>
);

export default AddAlumnusModal;
