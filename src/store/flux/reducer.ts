import { IMessageProps } from "../../pages/Chat/Components/Message";
import { IState } from "../hooks/use-chat-store";
import { EActionType, IAction } from "./actions";
import { initialState } from "./initial-state";

const groupedData = (data: any[]) =>
  data.reduce((groups, item) => {
    const { from, ...rest } = item;
    if (!groups[from]) {
      groups[from] = [];
    }
    groups[from].push(rest);
    return groups;
  }, {});

function groupContactsById(messages: any, userEmail: string) {
  const mappedData = mapContactList(messages, userEmail);
  const contacts = groupedData(mappedData);
  return Object.entries(contacts).map(([from, messagesMapped]) => ({
    from,
    count: (messagesMapped as any[]).length,
    user: {
      displayName: (messagesMapped as any[])[0].user.displayName,
      photoURL: (messagesMapped as any[])[0].user.photoURL,
      uid: (messagesMapped as any[])[0].user.uid,
      email: from,
    },
  }));
}

const mapContactList = (messages: any, userEmail: string) =>
  messages
    .filter((message: any) => message.from != userEmail)
    .map((message: IMessageProps) => ({
      ...message,
      id: message.id,
      user: message.user,
      time: message.time,
      status: `${message.message.slice(0, 10)}...`,
    }));

export const reducer = (state: IState, { type, payload }: IAction) => {
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
        messages: state.messages.filter((x : IMessageProps) => x.from === state.user?.email && x.to === payload.user.email)
      };
    case EActionType.LOAD_CONTACTS:
      return {
        ...initialState,
        ...state,
        contactList: groupContactsById(payload.messages, state?.user?.email as string),
      };
  }
};
