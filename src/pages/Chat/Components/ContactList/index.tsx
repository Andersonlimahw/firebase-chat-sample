import { useChat } from "../../../../store/hooks/use-chat-store";
import { ContactListItem, IContactItemProps } from "./ContactListItem"

export const ContactList = () => {
    const useChatStore = useChat((state: any) => state);

    const { contactList, user } = useChatStore;

    return (
        <div className="w-full sm:max-sm:w-full shadow-2xl flex flex-col sm:max-sm:flex-row">
            <div className="py-2 px-3 bg-grey-lighter flex flex-row justify-between items-center">
                <div>
                    <img className="w-10 h-10 rounded-full" src={user.photoURL} />
                    <span className="text-white font-bold">{user.displayName}</span>
                </div>
            </div>

            <div className="bg-grey-lighter flex-1 overflow-auto my-6">
                {
                    contactList && contactList.map((contact : IContactItemProps, index: number) =>  (
                        <ContactListItem 
                            key={`${contact.id}__${index}`} 
                            {...contact}
                        />
                    ))
                }
               
            </div>
        </div>
    )
}