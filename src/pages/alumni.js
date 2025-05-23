import React, { useState, useEffect } from 'react';
import SaveButton from '../components/SaveButton';
import './alumni.css';

const AlumniPage = () => {
  const [alumni, setAlumni] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('alumniData');
    if (saved) {
      try {
        setAlumni(JSON.parse(saved));
      } catch {
        console.warn('Failed to parse alumni data from localStorage');
      }
    } else {
      setAlumni([
        { first_name: "John", last_name: "Doe" },
        { first_name: "Jane", last_name: "Smith" },
        { first_name: "Alice", last_name: "Johnson" },
      ]);
    }
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [newAlumnus, setNewAlumnus] = useState({ first_name: '', last_name: '' });

  const handleAddAlumnus = () => {
    setAlumni(prev => [...prev, newAlumnus]);
    setNewAlumnus({ first_name: '', last_name: '' });
    setShowModal(false);
  };

  const handleCancel = () => {
    setNewAlumnus({ first_name: '', last_name: '' });
    setShowModal(false);
  };

  const handleRemove = (indexToRemove) => {
    const fullName = `${alumni[indexToRemove].first_name} ${alumni[indexToRemove].last_name}`;
    if (window.confirm(`Remove ${fullName} from the alumni list?`)) {
      setAlumni(prev => prev.filter((_, i) => i !== indexToRemove));
    }
  };

  return (
    <div className='alumniPage'>
      <h1>Alumni Page</h1>
      <div className="alumniList">
        {alumni.map((alumnus, index) => (
          <div
            key={index}
            className="alumniCard"
            onClick={() => handleRemove(index)}
            style={{ cursor: 'pointer' }}
            title="Click to remove"
          >
            <p>{alumnus.first_name} {alumnus.last_name}</p>
          </div>
        ))}
      </div>

      <div className='buttonContainer'>
        <button onClick={() => setShowModal(true)}>
          Add Alumni
        </button>
      </div>
      <div className='buttonContainer'>
        <SaveButton
          onSave={() => {
            localStorage.setItem('alumniData', JSON.stringify(alumni));
            window.alert('The Alumni page will be saved to the database');
          }}
          confirmText="Are you sure you want to save the current alumni list?"
          buttonLabel="Save Changes"
        />
      </div>



      {/* Modal */}
      {showModal && (
        <div className="modalOverlay">
          <div className="modalContent">
            <h2>Add New Alumnus</h2>
            <input
              type="text"
              placeholder="First Name"
              value={newAlumnus.first_name}
              onChange={(e) => setNewAlumnus({ ...newAlumnus, first_name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={newAlumnus.last_name}
              onChange={(e) => setNewAlumnus({ ...newAlumnus, last_name: e.target.value })}
            />
            <div className="modalButtonRow">
              <button
                className="modalButton"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="modalButton"
                onClick={handleAddAlumnus}
                disabled={!newAlumnus.first_name || !newAlumnus.last_name}
              >
                Add
              </button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlumniPage;
