// src/components/TextSection.jsx
import React from 'react';

const TextSection = ({ title, value, onChange }) => (
  <>
    <h2>{title}</h2>
    <input value={value} onChange={onChange} type="text" />
  </>
);

export default TextSection;
