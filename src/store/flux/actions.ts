export enum EActionType {
  SELECT_CONTACT = "SELECT_CONTACT",
  SET_USER = "SET_USER",
  SET_MESSAGES = "SET_MESSAGES",
  LOAD_CONTACTS = "LOAD_CONTACTS",
  SEND_MESSAGE = "SEND_MESSAGE",
  SET_LOADING = "SET_LOADING",
}

export interface IAction {
  type: EActionType;
  payload: any;
}
