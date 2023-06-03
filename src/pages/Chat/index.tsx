import React, { useState, useEffect } from 'react';


import { onAuthStateChanged } from '@firebase/auth';
import { auth, get, getMessagesByUserId } from '../../services/firebase';

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
import { COLLECTION_NAME, CONTACTS_COLLECTION_NAME, CONTACTS_MESSAGE_COLLECTION_NAME } from './constants';
import { getById } from '../../services/firebase/firebaseService';

export const Chat = () => {
  const chatStore = useChat((state: any) => state);


  const {
    dispatch,
    selectedContact,
    contactList,
    user,
    messages,
    loading
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
    const contactId = selectedContact && selectedContact.id !== '' ? selectedContact.id : undefined;
    const userId = user && user.id !== '' ? selectedContact.id : undefined;
    if (!contactId || !userId) {
      return () => { };
    }

    const query = await get({ collectionName: CONTACTS_MESSAGE_COLLECTION_NAME.replace(':uid', userId).replace(':contactId', contactId) }).then(data => data);
    return onSnapshot(query, (snapshot) => {
      const updatedMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(`GET: ${CONTACTS_MESSAGE_COLLECTION_NAME} : subscribeToMessages: getMessagesByUserId => `, updatedMessages);
      callback(updatedMessages);
    });
  };


  async function subscribeToContacts(callback: any) {
    const userId = user ? user.uid : undefined;
    if (!userId) {
      return () => { };
    }
    const query = await get({ collectionName: CONTACTS_COLLECTION_NAME.replace(':uid', userId) }).then(data => data);
    return onSnapshot(query, (snapshot) => {
      const updatedContacts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      console.log(`GET: ${COLLECTION_NAME} => : subscribeToContacts `, updatedContacts);
      callback(updatedContacts);
    });
  };

  const queryContacstByUserId = async (userId: string) => await getById({ collectionName: CONTACTS_COLLECTION_NAME.replace(':uid', userId), id: userId }).then(data => data);
  const queryMessagesByContactId = async (userId: string, contactId: string) => await get({ collectionName: CONTACTS_COLLECTION_NAME.replace(':uid', userId) }).then(data => data);

  async function subscribeToChat(callback: any) {
    const query = await get({ collectionName: COLLECTION_NAME }).then(data => data);
    return onSnapshot(query, (snapshot) => {
      const updatedUsers = snapshot.docs.map(async (doc) => {
        // const contacts = await queryContacstByUserId(doc.id);
        // console.log(`GET: ${COLLECTION_NAME} => : subscribeToChat : contacts`, contacts);
        return {
          id: doc.id,
          ...doc.data(), 
        }
      });
      console.log(`GET: ${COLLECTION_NAME} => : subscribeToChat `, updatedUsers);
      callback(updatedUsers);
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

  }, [loading, user, selectedContact, contactList]);

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

  }, [user, loading]);

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: EActionType.SET_LOADING,
        payload: {
          loading: true,
        }
      });
    }

    (async () => {
      const unsubscribe = await subscribeToChat((content: any) => {
        dispatch({
          type: EActionType.SET_LOADING,
          payload: {
            loading: false,
            content
          }
        });
      });

      return () => unsubscribe();
    })();

  }, []);

  const hasSelectedContact = selectedContact && selectedContact.uid !== '';
  console.log('User => ', user);


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
