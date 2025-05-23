import React, { useState, useEffect } from 'react';
import './members.css';
import Card from '../components/card';
import SaveButton from '../components/SaveButton';

const Members = () => {
  const [members, setMembers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newMember, setNewMember] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    img: '',
  });

  // Load members from localStorage on first render
  useEffect(() => {
    const saved = localStorage.getItem('membersTextData');
    if (saved) {
      try {
        setMembers(JSON.parse(saved));
      } catch {
        console.warn('Failed to parse members from localStorage');
      }
    } else {
      // Default fallback
      setMembers([
        {
          first_name: 'John',
          middle_name: 'Q',
          last_name: 'Smith',
          img: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
        },
      ]);
    }
  }, []);

  const handleAdd = () => {
    setMembers([...members, newMember]);
    setNewMember({ first_name: '', middle_name: '', last_name: '', img: '' });
    setShowModal(false);
  };

  const handleRemove = (indexToRemove) => {
    const name = `${members[indexToRemove].first_name} ${members[indexToRemove].last_name}`;
    if (window.confirm(`Remove ${name} from the members list?`)) {
      setMembers(prev => prev.filter((_, i) => i !== indexToRemove));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setNewMember(prev => ({
        ...prev,
        img: reader.result, // Still allows temp preview
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleCancel = () => {
    setNewMember({ first_name: '', middle_name: '', last_name: '', img: '' });
    setShowModal(false);
  };

  const handleSave = () => {
    const textOnly = members.map(({ first_name, middle_name, last_name, img }) => ({
      first_name,
      middle_name,
      last_name,
      img: img?.startsWith('http') ? img : '', // Only save remote URLs
    }));
    localStorage.setItem('membersTextData', JSON.stringify(textOnly));
    window.alert('Only text-based member data has been saved to localStorage. Eventually this will be a database save.');
  };

  return (
    <div className='memberPage'>
      <h1>Current members</h1>
      <div className='memberContainer'>
        <div className="cardListContainer">
          {members.map((member, index) => (
            <Card key={index} {...member} onRemove={() => handleRemove(index)} />
          ))}
        </div>

        <div className="buttonContainer">
          <button onClick={() => setShowModal(true)}>Add Member</button>
        </div>
      </div>

      <div className="buttonContainer">
        <SaveButton
          onSave={handleSave}
          confirmText="Save only text and remote image URLs for this member list?"
          buttonLabel="Save Changes"
        />
      </div>

      {/* Add Member Modal */}
      {showModal && (
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
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            <input
              type="text"
              placeholder="First Name"
              value={newMember.first_name}
              onChange={(e) => setNewMember({ ...newMember, first_name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Middle Name (optional)"
              value={newMember.middle_name}
              onChange={(e) => setNewMember({ ...newMember, middle_name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={newMember.last_name}
              onChange={(e) => setNewMember({ ...newMember, last_name: e.target.value })}
            />
            <div className="modalButtonRow">
              <button
                className="modalButton"
                onClick={handleAdd}
                disabled={!newMember.first_name || !newMember.last_name}
              >
                Add
              </button>
              <button className="modalButton" onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Members;
