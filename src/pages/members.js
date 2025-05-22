import React from 'react';
import'./members.css';
import Card from '../components/card';
const Members = () => {
  const fakeMembersInfo = [
    {first_name: "John", middle_name: "Doe", last_name: "Smith", img: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"},
    {first_name: "John", middle_name: "Doe", last_name: "Smith", img: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"},
    {first_name: "John", middle_name: "Doe", last_name: "Smith", img: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"},
    {first_name: "John", middle_name: "Doe", last_name: "Smith", img: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"},
    {first_name: "John", middle_name: "Doe", last_name: "Smith", img: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"},

  ]
  return (
    <div className='memberPage'>
      <h1>Current members</h1>
      <div className='memberContainer'>
        <div className="cardListContainer">
          {fakeMembersInfo.map((member) => <Card {...member}/>)}
        </div>
        <div className="buttonContainer">
          <button>Add Member</button>
        </div>
      </div>
      <div className='buttonContainer'>
        <button>Save?</button>
      </div>
    </div>
  );
};

export default Members;
