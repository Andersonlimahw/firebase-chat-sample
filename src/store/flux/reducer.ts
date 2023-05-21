import { IMessageProps } from "../../pages/Chat/Components/Message";
import { EActionType, IAction } from "./actions";
import { initialState } from "./initial-state";

export const reducer = (state: any, { type, payload }: IAction) => {
  switch (type) {
    case EActionType.SELECT_USER:
      return {
        ...state,
        selectedUser: payload.user,
      };
    case EActionType.LOAD_USER_MESSAGES:
      return {
        ...state,
        messages: state.messages.filter(
          (message: IMessageProps) =>
            message.to.toLowerCase() === state.selectedUser.userName
        ),
      };
    case EActionType.LOAD_CONTACTS:
      return {
        ...state,
        messages: state.messages.map((message: IMessageProps) => {
          avatarUrl: message.user.avatarUrl;
          userName: message.userName;
          time: message.time;
          status: `${message.message.slice(0,10)}...`;
        }),
      };
  }
};
