import { IMessageProps } from "../../pages/Chat/Components/Message";
import { EActionType, IAction } from "./actions";
import { initialState } from "./initial-state";


function groupContactsById(messages : any) {
  const groupedData : any = {};
  const data = mapContactList(messages);
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    const { id } = item;

    if (!groupedData[id]) {
      groupedData[id] = [];
    }
    
    groupedData[id].push(item);
  }
  return groupedData;
}



const mapContactList =  (messages : any) => messages.map((message: any) => ({
  id: message.userId,
  photoURL: message.photoURL || 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/694px-Unknown_person.jpg',
  displayName: message.from,
  time: message.time,
  status: `${message.message.slice(0, 4)}...`,
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
        selectedContanctMessages: state.messages.filter(
          (message: IMessageProps) =>
            message.from.toLowerCase() != ""),
      };
    case EActionType.LOAD_CONTACTS:
      return {
        ...initialState,
        ...state,
        contactList: mapContactList(state.messages),
      };
  }
};
