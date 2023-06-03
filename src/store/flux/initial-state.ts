import { IMessageProps } from '../../pages/Chat/Components/Message/index';

export const initialState = {
  documentRefId: '',
  messages: [],
  contactList: [],
  user: {
    uid: '',
    email: '',
    photoURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/694px-Unknown_person.jpg',
    displayName: '',
  }, 
  selectedContact: {
    uid: '',
    email: 'sample@sample.com',
    photoURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/694px-Unknown_person.jpg',
    displayName: 'Hi, 😃',
  }, 
};
