import React, { useState, useEffect } from 'react';


import { onAuthStateChanged, signOut } from '@firebase/auth';
import { auth, create, get } from '../../services/firebase';

import { onSnapshot } from 'firebase/firestore';

const Chat = () => {
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

  async function subscribeToMessages(callback) {
    const query = await get( { collectionName: 'messages' }).then(data => data);

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
        const unsubscribe = await subscribeToMessages((updatedMessages) => {
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

  const sendMessage = async (userName: string, message: string) => {
    return create({
        collectionName: 'messages', 
        payload: {
            userName,
            message, 
            timestamp: new Date(),
        }
    });
  }

  const handleSendMessage = async () => {
    if (message.trim() !== '') {
      await sendMessage(user.displayName, message);
      setMessage('');
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <h2>Bem-vindo, {user.displayName}!</h2>
          <button onClick={handleLogout}>Sair</button>
        </div>
      ) : (
        <h2>Faça login para acessar o chat</h2>
      )}

      <div>
        {messages.map((msg : any) => (
          <div key={msg.id}>
            <p>{msg.user}: {msg.message}</p>
          </div>
        ))}
      </div>

      {user && (
        <div>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={handleSendMessage}>Enviar</button>
        </div>
      )}
    </div>
  );
};

export default Chat;
