import React, { useState, useEffect } from 'react';


import { onAuthStateChanged, signOut } from '@firebase/auth';
import { auth, create, get } from '../../services/firebase';

import { onSnapshot } from 'firebase/firestore';
import { Login } from './Components/Login';
import { ContactList } from './Components/ContactList';
import { MessageContainer } from './Components/MessageContainer';
import { IMessageProps, Message } from './Components/Message';
import { SendMessageInput } from './Components/SendMessage';
import { Header } from './Components/Header';
import { useChat } from '../../store/hooks/use-chat-store';
import { EActionType, IAction } from '../../store/flux/actions';

export const Chat = () => {
  const chatStore = useChat((state: any) => state);

  const { 
      dispatch, 
      selectedContact,
      selectedContactMessages, 
      user
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
    if(!selectedContact) {
      dispatch({
        type: EActionType.SELECT_CONTACT, 
        payload: {
          user: user
        }
      });
    }
    
  }, [selectedContact])

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

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div>
      <div className="w-full h-32 bg-green-800" ></div>
      <div className="container mx-auto mt-[-128px]">
        <div className="py-6 h-screen">
          <div className="flex border border-zinc-400 rounded shadow-lg h-full">
            {user ? (
              <>
                {/* Left */}
                <ContactList />

                {/* Right */}
                <div className="w-2/3 border flex flex-col">
                  <MessageContainer>
                    <Header />
                    {
                      !selectedContactMessages || selectedContactMessages.length === 0 && (<p className='text-zinc-400'>Envie uma mensagem para você como bloco de notas.</p>)
                    }

                    {chatStore && selectedContactMessages.map((msg: IMessageProps) => (
                      <Message key={msg.id} {...msg} />
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
