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

  const [currentUser, setCurrentUser ] = useState<any>();

  const { 
      dispatch, 
      messages,
      selectedContactMessages, 
      user
    } = chatStore;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user : any) => {
      if (user) {
        setCurrentUser(user);
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
    const query = await get({ collectionName: 'messages' }).then(data => data);

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

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div>
      <div className="w-full h-32 bg-green-700" ></div>
      <div className="container mx-auto mt-[-128px]">
        <div className="py-6 h-screen">
          <div className="flex border border-grey rounded shadow-lg h-full">
            {user ? (
              <>
                {/* Left */}
                <ContactList />

                {/* Right */}
                <div className="w-2/3 border flex flex-col">
                  <MessageContainer>
                    <Header />
                    {
                      !selectedContactMessages || selectedContactMessages.length === 0 && (<p className='text-zinc-400'>Nenhuma mensagem encontrada...</p>)
                    }

                    {chatStore && messages.map((msg: IMessageProps) => (
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
