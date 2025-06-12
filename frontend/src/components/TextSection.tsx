import React from 'react';

interface TextSectionProps {
  title?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
}

const TextSection: React.FC<TextSectionProps> = ({ title, value, onChange, id = 'text-section' }) => (
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
