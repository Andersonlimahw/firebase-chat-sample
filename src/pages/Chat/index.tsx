import React, { useState, useEffect } from 'react';

import { Login } from './Components/Login';
import { ContactList } from './Components/ContactList';
import { MessageContainer } from './Components/MessageContainer';
import { EMessagePosition, IMessageProps, Message } from './Components/Message';
import { SendMessageInput } from './Components/SendMessage';
import { Header } from './Components/Header';
import { EmptyMessages } from './Components/EmptyMessages';
import { Footer } from './Components/Footer';
import { useFirebaseChat } from './hooks/use-firebase-chat';

export const Chat = () => {
  const chatStore = useFirebaseChat();

  const {
    selectedContact,
    user,
    messages,
  } = chatStore;


  const hasSelectedContact = selectedContact && selectedContact.id !== '';

  return (
    <>
      {
        !user && (
          <Login />
        )
      }
      {/* TODO: react-router */}
      {user && (
        <>
          <div className="w-full h-32 bg-gradient-to-r from-green-900 to-green-400" ></div>
          <div className="container mx-auto mt-[-128px] rounded-sm">
            <div className="py-6 h-screen">
              <div className="flex shadow-lg rounded h-full">

                <>
                  {/* Left */}

                  <ContactList />
                  <Footer />

                  {/* Right */}
                  <div className="min-[300px]:w-full max=[600px]:w-2/3 shadow-sm flex flex-col">
                    <MessageContainer>
                      <Header />

                      {
                        !hasSelectedContact && (<EmptyMessages />)
                      }

                      {hasSelectedContact &&
                        messages.map((msg: IMessageProps) => (
                          <Message
                            key={msg.id}
                            {...msg}
                            position={msg.from === user.email ? EMessagePosition.Right : EMessagePosition.Left}
                            userName={msg.from === user.email ? user.displayName : selectedContact.displayName}
                          />
                        ))}
                    </MessageContainer>
                    <SendMessageInput />
                  </div>

                </>

              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Chat;
