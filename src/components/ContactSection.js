// src/components/ContactSection.jsx
import React from 'react';

const ContactSection = ({ label, href, linkText, value, onChange, linkClass }) => (
  <>
    <h2 className="contactLinkContainer">
      {label}{' '}
      <a className={`link ${linkClass}`} href={href}>
        {linkText}
      </a>.
    </h2>
    <input
      type="text"
      value={value}
      onChange={onChange}
    />
  </>
);

export default ContactSection;
