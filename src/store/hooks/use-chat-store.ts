import { devtools } from "zustand/middleware";
import { create } from "zustand";
import { IAction, initialState, reducer } from "../flux";
import { IMessageProps } from "../../pages/Chat/Components/Message";
import { IContactItemProps } from "../../pages/Chat/Components/ContactList/ContactListItem";

export interface IUser { 
  uid: string;
  photoURL: string;
  email: string;
  displayName: string;
}

interface IState { 
  user?: IUser;
  messages: IMessageProps;
  selectedContact?: IUser;
  selectedContactMessages: IMessageProps[];
  contactList: IContactItemProps[];
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

