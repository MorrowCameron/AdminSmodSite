import React from 'react';

const TextSection = ({ title, value, onChange, id = 'text-section' }) => (
  <>
    {title && <h2>{title}</h2>}
    <label htmlFor={id} className="visually-hidden">{title || 'Text input'}</label>
    <input
      id={id}
      value={value}
      onChange={onChange}
      type="text"
    />
  </>
);

export default TextSection;
