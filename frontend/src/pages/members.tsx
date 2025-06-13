import React, { useEffect, useState } from 'react';
import DarkModeToggle from '../components/DarkModeToggle';
import MemberCardList from '../components/MemberCardList';
import SaveButton from '../components/SaveButton';
import AddMemberModal from '../components/AddMemberModal';
import './members.css';
import { ObjectId } from 'mongodb';

interface Member {
  _id?: ObjectId;
  id?: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  src?: string;
  alt?: string;
  imageFile?: File;
}

const Members: React.FC<{ authToken: string }> = ({ authToken }) => {
  const [members, setMembers] = useState<Member[]>([]);
  const [originalMembers, setOriginalMembers] = useState<Member[]>([]);
  const [newMember, setNewMember] = useState<Member>({
    first_name: '',
    middle_name: '',
    last_name: '',
  });
  const [showModal, setShowModal] = useState(false);
  const [removedIds, setRemovedIds] = useState<ObjectId[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch('/api/members', {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch members');
        }
        return res.json();
      })
      .then(data => {
        console.log('Fetched members:', data);
        setMembers(data);
        setOriginalMembers(data);
        setLoading(false); // ✅ Done fetching
      })
      .catch(err => {
        console.error('Failed to load members:', err);
        setError(err.message || 'Failed to load members');
        setLoading(false); // ✅ Even if error, stop loading
      });
  }, [authToken]);

  const handleAdd = () => {
    setMembers(prev => [...prev, { ...newMember }]);
    setNewMember({ first_name: '', middle_name: '', last_name: '' });
    setShowModal(false);
  };

  const handleRemove = (index: number) => {
    const member = members[index];
    if (window.confirm(`Remove ${member.first_name} ${member.last_name}?`)) {
      console.log(member);
      if (member._id) {
        console.log(`Marking member ${member._id} for removal`);
        setRemovedIds(prev => [...prev, member._id!]);
      }
      setMembers(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setNewMember(prev => ({
      ...prev,
      imageFile: file,
      src: URL.createObjectURL(file),
    }));
  };

  const handleCancel = () => {
    setNewMember({ first_name: '', middle_name: '', last_name: '' });
    setShowModal(false);
  };

  const handleSave = async () => {
    try {
      // Save new members
      const newEntries = members.filter(m => !m.id);
      for (const member of newEntries) {
        const formData = new FormData();
        formData.append('first_name', member.first_name);
        formData.append('middle_name', member.middle_name || '');
        formData.append('last_name', member.last_name);
        formData.append('alt', member.alt || '');
        if (member.imageFile) {
          formData.append('image', member.imageFile);
        } else {
          console.warn('Skipping member with no image:', member);
          continue;
        }

        const res = await fetch('/api/members/full', {
          method: 'POST',
          headers: { Authorization: `Bearer ${authToken}` },
          body: formData,
        });

        if (!res.ok) throw new Error(`Failed to add member: ${res.status}`);
      }

      // Delete removed members
      for (const _id of removedIds) {
        const res = await fetch(`/api/members/${_id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${authToken}` },
        });

        if (!res.ok) throw new Error(`Failed to delete member ${_id}: ${res.status}`);
      }

      alert('Changes saved!');
    } catch (err) {
      console.error('Error during save:', err);
      alert('Failed to save changes.');
    }
  };

// Render loading
  if (loading) return <p className="status">Loading members...</p>;

// Render error
  if (error) return <p className="status error">Error: {error}</p>;

  return (
    <div className="memberPage">
      <DarkModeToggle />
      <h1>Current members</h1>

      <div className="memberContainer">
        <MemberCardList members={members} onRemove={handleRemove} />
        <div className="buttonContainer">
          <button onClick={() => setShowModal(true)}>Add Member</button>
        </div>
      </div>

      <div className="buttonContainer">
        <SaveButton
          onSave={handleSave}
          confirmText="Save all changes to the server?"
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
