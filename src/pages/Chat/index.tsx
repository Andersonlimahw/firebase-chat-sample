import React, { useState, useEffect } from 'react';
import { ArrowLineLeft } from '@phosphor-icons/react';
import { Login } from '../Login';
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
    handleResetSelectedContact
  } = chatStore;


  const hasSelectedContact = selectedContact && selectedContact.id !== '';

  const containerClasses = {
    'mobile': 'min-[0px]:block',
    'default': 'min-[690px]:flex flex'
  };

  const messagesContainerClasses = {
    'mobile': !hasSelectedContact ? 'none' : 'min-[0px]:w-full',
    'default': 'max=[600px]:flex-1 w-full'
  };

  const isMobile = () => {
    return window.screen.width <= 690;
  }

  const screnType = isMobile() ? 'mobile' : 'default';

  return (
    <>
      <div className="w-full h-40 bg-gradient-to-r from-green-900 to-green-400" >
        <ArrowLineLeft onClick={handleResetSelectedContact} size={48} className={`mx-2 py-2 cursor-pointer ${hasSelectedContact ? 'block' : 'hidden'}`} />
      </div>

      <div className="container mx-auto mt-[-128px] rounded-sm">
        <div className="py-6 h-screen">
          <div className={`flex shadow-lg rounded h-full ${containerClasses[screnType]}`}>
            {/* Left */}
            {
              !hasSelectedContact && (
                <>
                  <ContactList />
                  <Footer />
                </>
              )
            }

            {/* Right */}
            <div className={`animate-[wiggle_1s_ease-in-out_infinite] shadow-sm flex flex-col ${messagesContainerClasses[screnType]}`}>
              <MessageContainer>
                <Header />
                {
                  !hasSelectedContact && (<EmptyMessages />)
                }
              </MessageContainer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
