import React from 'react';

const ContactSection = ({ label, href, linkText, value, onChange, linkClass }) => {
  const inputId = `input-${linkClass}`;

  return (
    <div className="contactSection">
      <h2 className="contactLinkContainer">
        {label}{' '}
        <a className={`link ${linkClass}`} href={href}>
          {linkText}
        </a>.
      </h2>
      <div className="inputWrapper">
        <label htmlFor={inputId} className="visually-hidden">
          {linkClass} input field
        </label>
        <input
          id={inputId}
          type="text"
          value={value}
          onChange={onChange}
          aria-label={`${linkClass} link field`}
        />
      </div>
    </div>
  );
};

export default ContactSection;
