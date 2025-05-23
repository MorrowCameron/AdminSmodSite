import React from 'react';

const AlumniList = ({ alumni, onRemove }) => (
  <div className="alumniList">
    {alumni.map((alumnus, index) => (
      <div
        key={index}
        className="alumniCard"
        onClick={() => onRemove(index)}
        style={{ cursor: 'pointer' }}
        title="Click to remove"
      >
        <p>{alumnus.first_name} {alumnus.last_name}</p>
      </div>
    ))}
  </div>
);

export default AlumniList;
