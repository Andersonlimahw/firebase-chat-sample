import { devtools } from "zustand/middleware";
import { create } from "zustand";
import { IAction, initialState, reducer } from "../flux";
import { IMessageProps } from "../../pages/Chat/Components/Message";
import { IContactItemProps } from "../../pages/Chat/Components/ContactList/ContactListItem";

interface IState { 
  user: any;
  messages: IMessageProps;
  selectedContact: any;
  selectedContactMessages: IMessageProps[];
  contactList: IContactItemProps[];
}

export const useChatStore = (set : any) => ({
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

export const useHttpList = create(devtools(useChatStore))

