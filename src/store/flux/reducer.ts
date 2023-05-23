import { IMessageProps } from "../../pages/Chat/Components/Message";
import { EActionType, IAction } from "./actions";
import { initialState } from "./initial-state";


const groupedData = (data : any[]) => data.reduce((groups, item) => {
  const { from, ...rest } = item;
  if (!groups[from]) {
    groups[from] = [];
  }
  groups[from].push(rest);
  return groups;
}, {});

function groupContactsById(messages : any) {
  const mappedData = mapContactList(messages);
  const contacts = groupedData(mappedData);
  return Object.entries(contacts).map(([from, messagesMapped]) => ({
    from, 
    count: (messagesMapped as any[]).length,
    user: { 
      displayName: (messagesMapped as any[])[0].displayName,
      photoURL: (messagesMapped as any[])[0].photoURL,
      uid: (messagesMapped as any[])[0].uid,
      email: from,
    }
  }));
}


const mapContactList =  (messages : any) => messages.map((message: IMessageProps) => ({
  ...message,
  id: message.id,
  uid: message.uid,
  photoURL: message.photoURL || 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/694px-Unknown_person.jpg',
  displayName: message.displayName,
  time: message.time,
  status: `${message.message.slice(0, 10)}...`,
}))

export const reducer = (state: any, { type, payload }: IAction) => {
  switch (type) {
    case EActionType.SET_USER:
      return {
        ...initialState,
        ...state,
        user: payload.user,
      };   
    case EActionType.SET_MESSAGES:
      return {
        ...initialState,
        ...state,
        messages: payload.messages,
      };
    case EActionType.SELECT_CONTACT:
      return {
        ...initialState,
        ...state,
        selectedContact: payload.user,
      };
    case EActionType.LOAD_CONTACTS:
      return {
        ...initialState,
        ...state,
        contactList: groupContactsById(state.messages),
      };
  }
};
