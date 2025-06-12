import React from 'react';
import Card from './card';

interface Member {
  id: number;
  name: string;
  first_name: string; 
  last_name: string;  
  img: string;      
}

interface MemberCardListProps {
  members: Member[];
  onRemove: (index: number) => void;
}

const MemberCardList: React.FC<MemberCardListProps> = ({ members, onRemove }) => (
  <div className="cardListContainer">
    {members.map((member, index) => (
      <Card key={index} {...member} onRemove={() => onRemove(index)} />
    ))}
  </div>
);

export default MemberCardList;
