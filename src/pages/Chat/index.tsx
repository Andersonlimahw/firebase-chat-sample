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
    const unsubscribe = onAuthStateChanged(auth, (user: any) => {
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
    const query = await get({ collectionName: 'chat-messages' }).then(data => data);

    return onSnapshot(query, (snapshot) => {
      const updatedMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(updatedMessages);
    });
  };

  async function subscribeToContacts(callback: any) {
    const query = await get({ collectionName: 'chat-contacts' }).then(data => data);

    return onSnapshot(query, (snapshot) => {
      const updatedMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log('chat-contacts => ', updatedMessages);
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
      });

      return () => unsubscribe();
    })();

  }, []);

  useEffect(() => {
    (async () => {
      const unsubscribe = await subscribeToContacts((content: any) => {
        dispatch({
          type: EActionType.LOAD_CONTACTS,
          payload: {
            contactList: content
          }
        });
      });

      return () => unsubscribe();
    })();

  }, []);

  const hasSelectedContact = selectedContact && selectedContact.uid !== '';


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
                        messages.filter((message: IMessageProps) => (message.from === user.email || message.to === user.email)).map((msg: IMessageProps) => (
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
