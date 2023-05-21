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

export const Chat = () => {
  const [user, setUser] = useState<any>(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
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
        setMessages(updatedMessages);
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
              <div>
                <h2>Bem-vindo, {user.displayName}!</h2>
                <button onClick={handleLogout}>Sair</button>
              </div>
            ) : (
              <Login />
            )}

            {/* Left */}
            <ContactList />

            {/* Right */}
            <div className="w-2/3 border flex flex-col"> 
              {/* TODO: messages from selected contact */}

              <MessageContainer>
                <Header title={'Anderson Lima'} description={'Living...'} avatarUrl={'https://avatars.githubusercontent.com/u/15092575?s=48&v=4'} />
                {messages.map((msg: IMessageProps) => (
                  <Message key={msg.id} {...msg} />
                ))}
              </MessageContainer>
            </div>  

            {user && ( <SendMessageInput />)}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
