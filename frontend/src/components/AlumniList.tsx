import React from 'react';

interface Alumnus {
  first_name: string;
  last_name: string;
}

interface AlumniListProps {
  alumni: Alumnus[];
  onRemove: (index: number) => void;
}

const AlumniList: React.FC<AlumniListProps> = ({ alumni, onRemove }) => (
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
