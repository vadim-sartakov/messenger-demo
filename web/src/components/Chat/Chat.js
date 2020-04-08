import React from 'react';
import EmptyChat from './EmptyChat';

function Chat({ chat, location }) {
  return chat.participants.length === 0 ? <EmptyChat chat={chat} location={location} /> : <div>This is a chat</div>;
}

export default Chat;