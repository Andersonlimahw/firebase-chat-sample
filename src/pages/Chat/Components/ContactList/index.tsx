import { useChat } from "../../../../store/hooks/use-chat-store";
import { ContactListItem, IContactItemProps } from "./ContactListItem"

export const ContactList = () => {
    const useChatStore = useChat((state: any) => state);

    const { contactList, user } = useChatStore;

    return (
        <div className="min-[300px]:w-full max=[600px]:w-1/3 shadow-2xl flex flex-col">
            <div className="py-2 px-3 bg-grey-lighter flex flex-row justify-between items-center">
                <div>
                    <img className="w-10 h-10 rounded-full" src={user.photoURL} />
                    <span className="text-white font-bold">{user.displayName}</span>
                </div>
            </div>

            {/* <!-- Search --> */}
            {/* <div className="py-2 px-2 bg-grey-lightest">
                <input
                    type="text" className="w-full px-2 py-2 text-sm"
                    placeholder="Search or start new chat"
                />
            </div> */}

            <div className="bg-grey-lighter flex-1 overflow-auto my-6">
                {
                    contactList && contactList.map((contact : IContactItemProps, index: number) =>  (
                        <ContactListItem 
                            key={`${contact.id}__${index}`} 
                            {...contact}
                            user={contact.user} 
                        />
                    ))
                }
               
            </div>
        </div>
    )
}