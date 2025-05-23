import React from 'react';

const AddMemberModal = ({
  newMember,
  onChange,
  onUpload,
  onAdd,
  onCancel,
}) => (
  <div className="modalOverlay" role="dialog" aria-modal="true" aria-labelledby="add-member-title">
    <div className="modalContent">
      <h2 id="add-member-title">Add New Member</h2>

      {newMember.img && (
        <div style={{ marginBottom: '1em' }}>
          <img
            src={newMember.img}
            alt="Selected profile preview"
            style={{ width: '150px', borderRadius: '0.5em', border: '1px solid #ccc' }}
          />
        </div>
      )}

      <div className="inputWrapper">
        <label htmlFor="member-img" className="visually-hidden">Upload image</label>
        <input
          id="member-img"
          type="file"
          accept="image/*"
          onChange={onUpload}
        />
      </div>

      <div className="inputWrapper">
        <label htmlFor="first-name" className="visually-hidden">First Name</label>
        <input
          id="first-name"
          type="text"
          placeholder="First Name"
          value={newMember.first_name}
          onChange={(e) => onChange({ ...newMember, first_name: e.target.value })}
        />
      </div>

      <div className="inputWrapper">
        <label htmlFor="middle-name" className="visually-hidden">Middle Name</label>
        <input
          id="middle-name"
          type="text"
          placeholder="Middle Name (optional)"
          value={newMember.middle_name}
          onChange={(e) => onChange({ ...newMember, middle_name: e.target.value })}
        />
      </div>

      <div className="inputWrapper">
        <label htmlFor="last-name" className="visually-hidden">Last Name</label>
        <input
          id="last-name"
          type="text"
          placeholder="Last Name"
          value={newMember.last_name}
          onChange={(e) => onChange({ ...newMember, last_name: e.target.value })}
        />
      </div>

      <div className="modalButtonRow">
        <button className="modalButton" onClick={onCancel}>
          Cancel
        </button>
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
