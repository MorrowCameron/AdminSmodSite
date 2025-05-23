import React from 'react';
import Card from './card';

const MemberCardList = ({ members, onRemove }) => (
  <div className="cardListContainer">
    {members.map((member, index) => (
      <Card key={index} {...member} onRemove={() => onRemove(index)} />
    ))}
  </div>
);

export default MemberCardList;
