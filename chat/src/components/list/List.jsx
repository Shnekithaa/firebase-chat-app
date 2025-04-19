import React from 'react';
import './list.css';
import UserInfo from '../userInfo/UserInfo';
import ChatList from '../chatList/ChatList';

function List() {
  return (
    <div className='list'>
      <UserInfo />
      <div className="chatList-container">
        <ChatList />
      </div>
    </div>
  );
}

export default List;
