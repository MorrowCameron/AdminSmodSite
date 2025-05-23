// src/components/AddAlumnusModal.jsx
import React from 'react';

const AddAlumnusModal = ({ newAlumnus, onChange, onAdd, onCancel }) => (
  <div className="modalOverlay" role="dialog" aria-modal="true" aria-labelledby="add-alumnus-title">
    <div className="modalContent">
      <h2 id="add-alumnus-title">Add New Alumnus</h2>

      <div className="inputWrapper">
        <label htmlFor="first-name" className="visually-hidden">First Name</label>
        <input
          id="first-name"
          type="text"
          placeholder="First Name"
          value={newAlumnus.first_name}
          onChange={(e) => onChange({ ...newAlumnus, first_name: e.target.value })}
        />
      </div>

      <div className="inputWrapper">
        <label htmlFor="last-name" className="visually-hidden">Last Name</label>
        <input
          id="last-name"
          type="text"
          placeholder="Last Name"
          value={newAlumnus.last_name}
          onChange={(e) => onChange({ ...newAlumnus, last_name: e.target.value })}
        />
      </div>

      <div className="modalButtonRow">
        <button className="modalButton" onClick={onCancel}>
          Cancel
        </button>
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
