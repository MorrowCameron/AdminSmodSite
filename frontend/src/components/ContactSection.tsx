import React from 'react';

interface ContactSectionProps {
  label: string;
  href: string;
  linkText: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  linkClass: string;
}

const ContactSection: React.FC<ContactSectionProps> = ({ label, href, linkText, value, onChange, linkClass }) => {
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
          value={value} // BEGIN: ed8c6549bwf9
          onChange={onChange}
          aria-label={`${linkClass} link field`}
        />
      </div>
    </div>
  );
};

export default ContactSection;
