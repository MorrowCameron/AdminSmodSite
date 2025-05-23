// src/pages/contact.js
import React, { useState, useEffect } from 'react';
import SaveButton from '../components/SaveButton';
import ContactSection from '../components/ContactSection';
import './contact.css';
import DarkModeToggle from '../components/DarkModeToggle';

const ContactPage = () => {
  const [email, setEmail] = useState('');
  const [instagram, setInstagram] = useState('');
  const [groupMe, setGroupMe] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('contactData');
    if (saved) {
      try {
        const { email, instagram, groupMe } = JSON.parse(saved);
        setEmail(email || '');
        setInstagram(instagram || '');
        setGroupMe(groupMe || '');
      } catch {
        console.warn('Failed to parse contact data from localStorage');
      }
    } else {
      setEmail('smileandnodcalpoly@gmail.com');
      setInstagram('https://www.instagram.com/smileandnodcp?igsh=MzRlODBiNWFlZA==');
      setGroupMe('https://groupme.com/join_group/63039027/PT35qZCs');
    }
  }, []);

  const handlePageSave = () => {
    localStorage.setItem(
      'contactData',
      JSON.stringify({ email, instagram, groupMe })
    );
    window.alert('The Contact page will be saved to the database');
  };

  return (
    <div className="contactPage">
      <DarkModeToggle />
      <h1>Contact Page</h1>

      <ContactSection
        label="For all business inquiries, please reach out to"
        href={`mailto:${email}`}
        linkText={email}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        linkClass="email"
      />

      <ContactSection
        label="For information on upcoming shows and events, follow our"
        href={instagram}
        linkText="Instagram"
        value={instagram}
        onChange={(e) => setInstagram(e.target.value)}
        linkClass="Instagram"
      />

      <ContactSection
        label="For information on workshops and auditions, join our"
        href={groupMe}
        linkText="Workshop GroupMe"
        value={groupMe}
        onChange={(e) => setGroupMe(e.target.value)}
        linkClass="GroupMe"
      />

      <SaveButton
        onSave={handlePageSave}
        confirmText="Save changes on this page?"
        buttonLabel="Save Changes"
      />
    </div>
  );
};

export default ContactPage;
