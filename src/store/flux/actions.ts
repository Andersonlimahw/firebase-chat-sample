export enum EActionType {
  SELECT_USER = "SELECT_USER",
  LOAD_USER_MESSAGES = "LOAD_USER_MESSAGES",
  LOAD_CONTACTS = "LOAD_CONTACTS",
  SEND_MESSAGE = "SEND_MESSAGE",
}

export interface IAction {
  type: EActionType;
  payload: any;
}
