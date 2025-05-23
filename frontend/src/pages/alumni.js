import React, { useState, useEffect } from 'react';
import SaveButton from '../components/SaveButton';
import DarkModeToggle from '../components/DarkModeToggle';
import AlumniList from '../components/AlumniList';
import AddAlumnusModal from '../components/AddAlumnusModal';
import './alumni.css';

const AlumniPage = () => {
  const [alumni, setAlumni] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newAlumnus, setNewAlumnus] = useState({ first_name: '', last_name: '' });

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

  const handleSave = () => {
    localStorage.setItem('alumniData', JSON.stringify(alumni));
    window.alert('The Alumni page will be saved to the database');
  };

  return (
    <div className='alumniPage'>
      <DarkModeToggle />
      <h1>Alumni Page</h1>

      <AlumniList alumni={alumni} onRemove={handleRemove} />

      <div className='buttonContainer'>
        <button onClick={() => setShowModal(true)}>Add Alumni</button>
      </div>

      <div className='buttonContainer'>
        <SaveButton
          onSave={handleSave}
          confirmText="Are you sure you want to save the current alumni list?"
          buttonLabel="Save Changes"
        />
      </div>

      {showModal && (
        <AddAlumnusModal
          newAlumnus={newAlumnus}
          onChange={setNewAlumnus}
          onAdd={handleAddAlumnus}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default AlumniPage;
