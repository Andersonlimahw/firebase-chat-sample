import React, { useState, useEffect } from 'react';


import { onAuthStateChanged, signOut } from '@firebase/auth';
import { auth, create, get, getGroupdByEmail } from '../../services/firebase';

import { onSnapshot } from 'firebase/firestore';
import { Login } from './Components/Login';
import { ContactList } from './Components/ContactList';
import { MessageContainer } from './Components/MessageContainer';
import { EMessagePosition, IMessageProps, Message } from './Components/Message';
import { SendMessageInput } from './Components/SendMessage';
import { Header } from './Components/Header';
import { useChat } from '../../store/hooks/use-chat-store';
import { EActionType, IAction } from '../../store/flux/actions';
import { EmptyMessages } from './Components/EmptyMessages';
import { Footer } from './Components/Footer';

export const Chat = () => {
  const chatStore = useChat((state: any) => state);

  const { 
      dispatch, 
      selectedContact,
      user, 
      messages
    } = chatStore;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user : any) => {
      if (user) {
        dispatch({
          type: EActionType.SET_USER,
          payload: { user: user }
        })
      } else {
        dispatch({
          type: EActionType.SET_USER,
          payload: {
            user: null
          }
        })
      }
    });

    return () => unsubscribe();
  }, []);

  async function subscribeToMessages(callback: any) {
    const query = await get({ collectionName: 'chat' }).then(data => data);

    return onSnapshot(query, (snapshot) => {
      const updatedMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));   
      callback(updatedMessages);
    });
  };


  useEffect(() => {
    (async () => {
      const unsubscribe = await subscribeToMessages((updatedMessages: any) => {
        dispatch({
          type: EActionType.SET_MESSAGES, 
          payload: {
            messages: updatedMessages
          }
        });
        dispatch({
          type: EActionType.LOAD_CONTACTS, 
          payload: { }
        });
      });

      return () => unsubscribe();
    })();

  }, []);

  

  return (
    <div>
      <div className="w-full h-32 bg-zinc-600" ></div>
      <div className="container mx-auto mt-[-128px]">
        <div className="py-6 h-screen">
          <div className="flex shadow-lg rounded h-full">
            {user ? (
              <>
                {/* Left */}
                
                <ContactList />
                <Footer />

                {/* Right */}
                <div className="w-2/3 shadow-sm flex flex-col">
                  <MessageContainer>
                    <Header />

                    {
                      !selectedContact || selectedContact.uid === '' && (<EmptyMessages />)
                    }

                    {selectedContact && selectedContact.uid !== '' && messages.map((msg: IMessageProps) => (
                      <Message key={msg.id} {...msg} position={ msg.from === user.email ? EMessagePosition.Right : EMessagePosition.Left } />
                    ))}
                  </MessageContainer>
                  <SendMessageInput />
                </div>
                
              </>
            ) : (
              <Login />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
