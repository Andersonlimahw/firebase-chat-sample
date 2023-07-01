import { PlusCircle } from '@phosphor-icons/react';

import React from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import clsx from 'clsx';
import { useChat } from '../../../../store/hooks/use-chat-store';
import { ContactListItem, IContactItemProps } from './ContactListItem';
import { create, list } from '../../../../services';
import { CONTACTS_COLLECTION_NAME } from '../../constants/index';
import { onSnapshot } from 'firebase/firestore';
import { toast } from 'react-toastify';


export const AddContact = () => {
    const [open, setOpen] = React.useState(false);
    const [showAddSelfHasContact, setShowAddSelfHasContact] = React.useState(false);
    const [completeContactList, setCompleteContactList] = React.useState<IContactItemProps[]>([]);
    const useChatStore = useChat((state: any) => state);

    const { contactList, user, canAddSelfHasContact } = useChatStore;

    async function handleAddContactItem(contact: IContactItemProps) {
        console.log('[handleAddContactItem] :  contact => ', contact);
        await create({
            collectionName: CONTACTS_COLLECTION_NAME,
            payload: {
                email: contact.email,
                displayName: contact.displayName,
                photoURL: contact.photoURL,
                id: contact.id,
                userId: user.uid,
            }
        }).then(() => {
            toast('Success! nice chat!', { type: 'success' });
        }).catch(() => {
            toast('Sorry! Error to add contact.', { type: 'error' });
        });

    }

    async function handleListsContacts() {
        console.log('[handleAddContactItem] :  contact => ');

        const query = await list({
            collectionName: CONTACTS_COLLECTION_NAME,
            userId: user.uid
        }).then(data => data);
        return onSnapshot(query, (snapshot) => {
            const hasContact = (id : string) => contactList && contactList.find((contactItem : IContactItemProps) => contactItem.id === id);

            setShowAddSelfHasContact(canAddSelfHasContact);
            if (canAddSelfHasContact) {
                const updatedContacts = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })).filter((x : any) => !hasContact(x.id) && (x.userId  != user.uid && x.id != user.uid));
                console.log(`GET: ${CONTACTS_COLLECTION_NAME} : handleListsContacts: list => `, updatedContacts);
                setCompleteContactList(updatedContacts as IContactItemProps[]);
            } else {
                const updatedContacts = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })).filter((x : any) =>  !hasContact(x.id) && (x.id != user.uid && x.userId !== user.uid));
                console.log(`GET: ${CONTACTS_COLLECTION_NAME} : handleListsContacts: list => `, updatedContacts);
                setCompleteContactList(updatedContacts as IContactItemProps[]);                
            }
        });
    }

    // 1 - Construir modal 
    // 2 - Botão de adicionar contato 
    // 3 - Listar contatos
    // 4 - Selecionar contato
    // 5 - Adicionar contato
    // 6 - Fechar modal no sucesso e trativas de erros.
    // 7 - Adicionar contatos disponíveis quando o usuário efetuar login.

    return (
        <AlertDialog.Root open={open} onOpenChange={setOpen}>
            <AlertDialog.Trigger>
                <PlusCircle
                    color="#f1f1f1"
                    size={32}
                    onClick={() => handleListsContacts()}
                />
            </AlertDialog.Trigger>

            <AlertDialog.Portal>
                <AlertDialog.Overlay className='w-full bg-black bg-opacity-80' />
                <AlertDialog.Content
                    forceMount
                    className={clsx(
                        "fixed z-50",
                        "w-[95vw] max-w-md rounded-lg p-4 md:w-full",
                        "top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]",
                        "bg-white dark:bg-gray-800",
                        "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
                    )}
                >
                    <AlertDialog.Title className='text-sm font-medium text-gray-900 dark:text-gray-100'>
                        Add contact
                    </AlertDialog.Title>
                    <AlertDialog.Description className='mt-2 text-sm font-normal text-gray-700 dark:text-gray-400'>
                        add  a new contact to text with you!
                        {
                            showAddSelfHasContact && (
                                <>
                                    <p className='text=sm text-white'>
                                        Add you has contact
                                    </p>
                                    <PlusCircle
                                        color="#f1f1f1"
                                        size={32}
                                        onClick={() => handleAddContactItem({
                                            email: user.email,
                                            displayName: user.displayName,
                                            photoURL: user.photoURL,
                                            id: user.uid,
                                            userId: user.uid,
                                        } as any)}
                                    />
                                </>

                            )
                        }
                        <div className="bg-grey-lighter flex-1 overflow-auto my-6">
                            {
                                completeContactList && completeContactList.map((contact: IContactItemProps, index: number) => (
                                    <ContactListItem
                                        key={`${contact.id}__${index}`}
                                        handleOnClick={handleAddContactItem}
                                        {...contact}
                                    />
                                ))
                            }
                        </div>
                    </AlertDialog.Description>
                    <div className="mt-4 flex justify-end space-x-2">
                        <AlertDialog.Cancel
                            className={clsx(
                                "inline-flex select-none justify-center rounded-md px-4 py-2 text-sm font-medium",
                                "bg-white text-gray-900 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-100 hover:dark:bg-gray-600",
                                "border border-gray-300 dark:border-transparent",
                                "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
                            )}
                        >
                            Cancel
                        </AlertDialog.Cancel>
                        <AlertDialog.Action
                            className={clsx(
                                "inline-flex select-none justify-center rounded-md px-4 py-2 text-sm font-medium",
                                "bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-700 dark:text-gray-100 dark:hover:bg-purple-600",
                                "border border-transparent",
                                "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
                            )}
                        >
                            Confirm
                        </AlertDialog.Action>
                    </div>
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog.Root>
    );
};
