import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth, get, getMessagesByContactUserId } from "../../../services/firebase";
import { useChat } from "../../../store/hooks/use-chat-store";
import { EActionType } from "../../../store/flux";
import { CONTACTS_COLLECTION_NAME, MESSAGE_COLLECTION_NAME, USERS_COLLECTION_NAME } from "../constants";
import { onSnapshot } from "firebase/firestore";

export const useFirebaseChat = () => {
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
    const userId = user && user.uid !== '' ? user.uid : undefined;
    if (!contactId || !userId) {
      return () => { };
    }

    const query = await getMessagesByContactUserId({ 
      collectionName: MESSAGE_COLLECTION_NAME,
      userId, 
      contactUid: contactId,
    }).then(data => data);
    return onSnapshot(query, (snapshot) => {
      const updatedMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(`GET: ${MESSAGE_COLLECTION_NAME} : subscribeToMessages: getMessagesByUserId => `, updatedMessages);
      callback(updatedMessages);
    });
  };


  async function subscribeToContacts(callback: any) {
    const userId = user ? user.uid : undefined;
    if (!userId) {
      return () => { };
    }
    const query = await get({ 
      collectionName: CONTACTS_COLLECTION_NAME, 
      userId
    }).then(data => data);
    return onSnapshot(query, (snapshot) => {
      const updatedContacts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      console.log(`GET: ${CONTACTS_COLLECTION_NAME} => : subscribeToContacts `, updatedContacts);
      callback(updatedContacts);
    });
  };


  async function subscribeToChat(callback: any) {   
    const query = await get({ collectionName: USERS_COLLECTION_NAME, userId: user.uid }).then(data => data);
    return onSnapshot(query, (snapshot) => {      
      const selectedUserData = snapshot.docs.map((userDocItem) => ({        
        ...userDocItem,
        ...userDocItem.data(),
        ref: userDocItem.ref,
        id: userDocItem.id,
      })).find((userDoc) => (userDoc as any).uid === user.uid);
      console.log(`GET: ${USERS_COLLECTION_NAME} => : subscribeToChat : users `, selectedUserData);
      callback(selectedUserData);
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

  }, [user, user.uid, selectedContact, selectedContact.id]);

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

  }, [user, user.uid, user.id, user.email, dispatch, loading]);

  useEffect(() => {
    if(!user || !user.uid) return () => { };
    if (dispatch) {
      dispatch({
        type: EActionType.SET_LOADING,
        payload: {
          loading: true,
        }
      });
    }

    (async () => {
      const unsubscribe = await subscribeToChat(async (content: any) => {
        dispatch({
          type: EActionType.SET_LOADING,
          payload: {
            loading: false, 
            content
          }
        });

        dispatch({
          type: EActionType.SET_DB_DOCUMENT_REF_ID,
          payload: {
            documentRefId: user.uid,
          }
        });

      });

      return () => unsubscribe();
    })();

  }, [user, user.uid, user.id, user.email, dispatch]);

  return {
    selectedContact,
    contactList,
    user,
    messages,
    loading
  }
}