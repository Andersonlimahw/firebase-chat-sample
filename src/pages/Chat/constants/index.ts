export const COLLECTION_NAME = 'chat';
export const CONTACTS_COLLECTION_NAME = `${COLLECTION_NAME}/:uid/contacts`;
export const CONTACTS_MESSAGE_COLLECTION_NAME = `${CONTACTS_COLLECTION_NAME}/:contactId/messages`;

// Final url:  chat/userId/contacts
// Final url:  chat/userId/contacts/contactId/messages