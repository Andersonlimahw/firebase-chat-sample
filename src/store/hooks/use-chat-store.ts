import { devtools } from "zustand/middleware";
import { create } from "zustand";
import { IAction, initialState, reducer } from "../flux";
import { IMessageProps } from "../../pages/Chat/Components/Message";
import { IContactItemProps } from "../../pages/Chat/Components/ContactList/ContactListItem";

export interface IUser { 
  id: string;
  uid: string;
  photoURL: string;
  email: string;
  displayName: string;
}

export interface IState { 
  user?: IUser;
  messages: IMessageProps[];
  selectedContact?: IUser;
  contactList: IContactItemProps[];
  theme: 'dark' | 'light' | 'green' | 'indigo' | 'purple' | 'red' | 'yellow' | 'pink'
}

const useChatStore = (set : any) => ({
  ...initialState,
  dispatch: ({ type, payload } : IAction) => set(
    (state : IState) => reducer(state, { type, payload }),
    true,
    {
      type: type, 
      payload: payload,
    }
  ),  
});

export const useChat = create(devtools(useChatStore))

