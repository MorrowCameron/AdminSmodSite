import React, { useState, useEffect } from 'react';
import SaveButton from '../components/SaveButton';
import DarkModeToggle from '../components/DarkModeToggle';
import AlumniList from '../components/AlumniList';
import AddAlumnusModal from '../components/AddAlumnusModal';
import './alumni.css';

interface Alumnus {
  first_name: string;
  last_name: string;
}

interface AlumniPageProps {
  authToken: string;
}

const AlumniPage: React.FC<AlumniPageProps> = ({ authToken }) => {
  const [alumni, setAlumni] = useState<Alumnus[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [newAlumnus, setNewAlumnus] = useState<Alumnus>({ first_name: '', last_name: '' });

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlumni = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/alumni", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch alumni list");
        }

        const data = await res.json();
        setAlumni(data);
      } catch (err: any) {
        console.error("Failed to fetch alumni:", err);
        setError(err.message || "Unable to load alumni.");
      } finally {
        setLoading(false);
      }
    };

    fetchAlumni();
  }, [authToken]);

  const handleAddAlumnus = () => {
    setAlumni(prev => [...prev, newAlumnus]);
    setNewAlumnus({ first_name: '', last_name: '' });
    setShowModal(false);
  };

  const handleCancel = () => {
    setNewAlumnus({ first_name: '', last_name: '' });
    setShowModal(false);
  };

  const handleRemove = (indexToRemove: number) => {
    const fullName = `${alumni[indexToRemove].first_name} ${alumni[indexToRemove].last_name}`;
    if (window.confirm(`Remove ${fullName} from the alumni list?`)) {
      setAlumni(prev => prev.filter((_, i) => i !== indexToRemove));
    }
  };

  const handleSave = () => {
    fetch("/api/alumni", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`
      },
      body: JSON.stringify(alumni),
    })
      .then(res => {
        if (res.ok) {
          window.alert("Alumni list saved to the database!");
        } else {
          throw new Error("Failed to save");
        }
      })
      .catch(err => {
        console.error("Error saving alumni:", err);
        window.alert("Failed to save alumni to the database");
      });
  };

  if (loading) return <p className="status">Loading alumni list...</p>;
  if (error) return <p className="status error">Error: {error}</p>;

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
