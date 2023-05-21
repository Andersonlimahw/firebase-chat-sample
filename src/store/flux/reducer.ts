import { IMessageProps } from "../../pages/Chat/Components/Message";
import { EActionType, IAction } from "./actions";
import { initialState } from "./initial-state";

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
            message.from.toLowerCase() === state.user.userName.toLowercase()
        ),
      };
    case EActionType.LOAD_CONTACTS:
      return {
        ...initialState,
        ...state,
        contactList: state.messages.map((message: IMessageProps) => ({
          avatarUrl: message.user.avatarUrl,
          userName: message.from,
          time: message.time,
          status: `${message.message.slice(0, 10)}...`,
        })),
      };
  }
};
