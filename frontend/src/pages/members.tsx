import React, { useEffect, useState } from 'react';
import DarkModeToggle from '../components/DarkModeToggle';
import MemberCardList from '../components/MemberCardList';
import SaveButton from '../components/SaveButton';
import AddMemberModal from '../components/AddMemberModal';
import './members.css';

const Members: React.FC = () => {

  type NewMember = {
    first_name: string;
    middle_name?: string; 
    last_name: string;
    img?: string;
  };

  const [members, setMembers] = useState<any[]>([]);
  const [newMember, setNewMember] = useState<NewMember>({ first_name: '', middle_name: '', last_name: '', img: '' });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const storedMembers = localStorage.getItem('membersTextData');
    if (storedMembers) {
      setMembers(JSON.parse(storedMembers));
    } else {
      setMembers([
        {
          first_name: 'John',
          middle_name: 'Q',
          last_name: 'Smith',
          img: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
        },
        {
          first_name: 'Jane',
          middle_name: '',
          last_name: 'Doe',
          img: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
        },
        {
          first_name: 'Sam',
          middle_name: '',
          last_name: 'Lee',
          img: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
        },
      ]);
    }
  }, []);

  const handleAdd = () => {
    setMembers([...members, newMember]);
    setNewMember({ first_name: '', middle_name: '', last_name: '', img: '' });
    setShowModal(false);
  };

  const handleRemove = (indexToRemove: number) => {
    const name = `${members[indexToRemove].first_name} ${members[indexToRemove].last_name}`;
    if (window.confirm(`Remove ${name} from the members list?`)) {
      setMembers(prev => prev.filter((_, i) => i !== indexToRemove));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setNewMember(prev => ({
        ...prev,
        img: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleCancel = () => {
    setNewMember({ first_name: '', middle_name: '', last_name: '', img: '' });
    setShowModal(false);
  };

  const handleSave = () => {
    const textOnly = members.map(({ first_name, middle_name, last_name, img }) => ({
      first_name,
      middle_name,
      last_name,
      img: img?.startsWith('http') ? img : 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
    }));
    localStorage.setItem('membersTextData', JSON.stringify(textOnly));
    window.alert('Only text-based member data has been saved to localStorage. Eventually this will be a database save.');
  };

  return (
    <div className='memberPage'>
      <DarkModeToggle />
      <h1>Current members</h1>

      <div className='memberContainer'>
        <MemberCardList members={members} onRemove={handleRemove} />

        <div className="buttonContainer">
          <button onClick={() => setShowModal(true)}>Add Member</button>
        </div>
      </div>

      <div className="buttonContainer">
        <SaveButton
          onSave={handleSave}
          confirmText="Save only text and remote image URLs for this member list?"
          buttonLabel="Save Changes"
        />
      </div>

      {showModal && (
        <AddMemberModal
          newMember={newMember}
          onChange={setNewMember}
          onUpload={handleImageUpload}
          onAdd={handleAdd}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default Members;
