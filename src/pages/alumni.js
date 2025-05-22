import React from 'react';
import './alumni.css'; // Import your CSS file for styling

const AlumniPage = () => {

  const fakeAlumniData = [
    { name: "John Doe"},
    { name: "Jane Smith"},
    { name: "Alice Johnson"},
    { name: "Bob Brown"},
    { name: "Charlie Davis"},
    { name: "Eve Wilson"},
    { name: "Frank Miller"},
    { name: "Grace Lee"},
    { name: "Hannah Taylor"},
    { name: "Ian Anderson"},
    { name: "Jack Thomas"},
    { name: "Kathy White"},
    { name: "Liam Harris"},
    { name: "Mia Clark"},
    { name: "Noah Lewis"},
    // Add more fake data as needed
  ];
  return (
    <div className='alumniPage'>
      <h1>Alumni Page</h1>
      {/* Add your content here */}
      <div className="alumniList">
        {fakeAlumniData.map((alumnus, index) => (
          <div key={index} className="alumniCard">
            <p>{alumnus.name}</p>
            {/* Add more details about the alumnus here */}
          </div>
        ))}
      </div>
      <div className='buttonContainer'>
        <button>
          Add Alumni
        </button>
      </div>
      <div className='buttonContainer'>
        <button>Save?</button>
      </div>
    </div>
  );
};

export default AlumniPage;
