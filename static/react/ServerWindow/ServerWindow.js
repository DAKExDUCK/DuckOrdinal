import React from 'react';
import ChannelsList from './ChannelsList/ChannelsList';
import ChatWindow from './ChatWindow/ChatWindow';

const Home = () => {
  return (
    <div>
      <h2>Main</h2>
      <ChannelsList />
      <ChatWindow />
    </div>
  );
};

export default Home;
