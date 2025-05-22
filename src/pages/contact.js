import React from 'react';
import './contact.css';
const ContactPage = () => {
  return (
    <div className="contactPage">
      <h1>Contact Page</h1>
      <h2 className='contactLinkContainer'>
					For all business inquiries, please reach out to <a className="link email" href="mailto:smileandnodcalpoly@gmail.com">smileandnodcalpoly@gmail.com</a>.
      </h2>
      <input type="text" defaultValue="Current Email"/>
      <h2 className='contactLinkContainer'>
        For information on upcoming shows and events, follow our <a className="link Instagram" href="https://www.instagram.com/smileandnodcp?igsh=MzRlODBiNWFlZA==">Instagram</a>.
      </h2>
      <input type="text" defaultValue="Current Instagram"/>

      <h2 className='contactLinkContainer'>
        For information on workshops and auditions, join our <a className="link GroupMe" href="https://groupme.com/join_group/63039027/PT35qZCs">Workshop GroupMe</a>.
      </h2>
      <input type="text" defaultValue="Current GroupMe"/>
      <div className='buttonContainer'>
        <button>Save?</button>
      </div>
    </div>
  );
};

export default ContactPage;
