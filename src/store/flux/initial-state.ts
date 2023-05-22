import { IMessageProps } from '../../pages/Chat/Components/Message/index';

export const initialState = {
  messages: [],
  user: {
    uid: '',
    email: '',
    photoURL: '',
    displayName: '',
  }, 
  selectedContact: {
    uid: '',
    email: '',
    photoURL: '',
    displayName: '',
  }, 
  selectedContactMessages: []
};
