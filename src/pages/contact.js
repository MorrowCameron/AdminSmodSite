import React, { useState, useEffect } from 'react';
import SaveButton from '../components/SaveButton';
import './contact.css';

const ContactPage = () => {
  const [email, setEmail] = useState('');
  const [instagram, setInstagram] = useState('');
  const [groupMe, setGroupMe] = useState('');

  // Load saved data from localStorage on mount
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
      // Default values
      setEmail('smileandnodcalpoly@gmail.com');
      setInstagram('https://www.instagram.com/smileandnodcp?igsh=MzRlODBiNWFlZA==');
      setGroupMe('https://groupme.com/join_group/63039027/PT35qZCs');
    }
  }, []);

  const handlePageSave = () => {
    localStorage.setItem('contactData', JSON.stringify({ email, instagram, groupMe }));
    window.alert('The Contact page will be saved to the database');
  };

  return (
    <div className="contactPage">
      <h1>Contact Page</h1>

      <h2 className='contactLinkContainer'>
        For all business inquiries, please reach out to{' '}
        <a className="link email" href={`mailto:${email}`}>{email}</a>.
      </h2>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <h2 className='contactLinkContainer'>
        For information on upcoming shows and events, follow our{' '}
        <a className="link Instagram" href={instagram}>Instagram</a>.
      </h2>
      <input
        type="text"
        value={instagram}
        onChange={(e) => setInstagram(e.target.value)}
      />

      <h2 className='contactLinkContainer'>
        For information on workshops and auditions, join our{' '}
        <a className="link GroupMe" href={groupMe}>Workshop GroupMe</a>.
      </h2>
      <input
        type="text"
        value={groupMe}
        onChange={(e) => setGroupMe(e.target.value)}
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
