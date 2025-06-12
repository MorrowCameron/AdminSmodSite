import React, { useState, useEffect } from 'react';
import SaveButton from '../components/SaveButton';
import ContactSection from '../components/ContactSection';
import './contact.css';
import DarkModeToggle from '../components/DarkModeToggle';

const ContactPage: React.FC<{ authToken: string }> = ({ authToken }) => {

  const [email, setEmail] = useState<string>('');
  const [instagram, setInstagram] = useState<string>('');
  const [groupMe, setGroupMe] = useState<string>('');

  useEffect(() => {
    fetch("/api/contact/links", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then(res => res.json())
      .then((data) => {
        for (const entry of data) {
          if (entry.name === "email") setEmail(entry.link);
          if (entry.name === "instagram") setInstagram(entry.link);
          if (entry.name === "groupMe") setGroupMe(entry.link);
        }
      })
      .catch(err => console.error("Failed to fetch contact links", err));
  }, []);
  

  const handlePageSave = () => {
    const contactUpdates = [
      { name: "email", link: email },
      { name: "instagram", link: instagram },
      { name: "groupMe", link: groupMe },
    ];
  
    Promise.all(
      contactUpdates.map(({ name, link }) =>
        fetch(`/api/contact/links/${name}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({ link }),
        }).then((res) => {
          if (!res.ok) {
            console.error(`Failed to update contact: ${name}`);
          }
        })
      )
    ).then(() => {
      window.alert("Contact information saved to database.");
    });
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
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        linkClass="email"
      />

      <ContactSection
        label="For information on upcoming shows and events, follow our"
        href={instagram}
        linkText="Instagram"
        value={instagram}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInstagram(e.target.value)}
        linkClass="Instagram"
      />

      <ContactSection
        label="For information on workshops and auditions, join our"
        href={groupMe}
        linkText="Workshop GroupMe"
        value={groupMe}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGroupMe(e.target.value)}
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
