// src/components/AddMemberModal.jsx
import React from 'react';

const AddMemberModal = ({
  newMember,
  onChange,
  onUpload,
  onAdd,
  onCancel,
}) => (
  <div className="modalOverlay">
    <div className="modalContent">
      <h2>Add New Member</h2>

      {newMember.img && (
        <div style={{ marginBottom: '1em' }}>
          <img
            src={newMember.img}
            alt="Preview"
            style={{ width: '150px', borderRadius: '0.5em', border: '1px solid #ccc' }}
          />
        </div>
      )}

      <input type="file" accept="image/*" onChange={onUpload} />
      <input
        type="text"
        placeholder="First Name"
        value={newMember.first_name}
        onChange={(e) => onChange({ ...newMember, first_name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Middle Name (optional)"
        value={newMember.middle_name}
        onChange={(e) => onChange({ ...newMember, middle_name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={newMember.last_name}
        onChange={(e) => onChange({ ...newMember, last_name: e.target.value })}
      />

      <div className="modalButtonRow">
      <button className="modalButton" onClick={onCancel}>Cancel</button>

        <button
          className="modalButton"
          onClick={onAdd}
          disabled={!newMember.first_name || !newMember.last_name}
        >
          Add
        </button>
      </div>
    </div>
  </div>
);

export default AddMemberModal;
