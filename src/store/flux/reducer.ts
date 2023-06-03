import { IState, IUser } from "../hooks/use-chat-store";
import { EActionType, IAction } from "./actions";
import { initialState } from "./initial-state";

export const reducer = (state: IState, { type, payload }: IAction) => {
  switch (type) {
    case EActionType.SET_USER:
      return {
        ...initialState,
        ...state,
        user: payload.user,
      };
    case EActionType.SET_DB_DOCUMENT_REF_ID:
      return {
        ...initialState,
        ...state,
        documentRefId: payload.documentRefId,
      };
    case EActionType.RESET_SELECT_CONTACT:
      return {
        ...initialState,
        ...state,
        selectedContact: initialState.selectedContact,
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
        selectedContact: payload,
      };
    case EActionType.LOAD_CONTACTS:
      return {
        ...initialState,
        ...state,
        contactList: payload.contactList,
      };
    case EActionType.SET_LOADING:
      return {
        ...initialState,
        ...state,
        loading: payload.loading,
      };
  }
};
