import { useChat } from "../../../../store/hooks/use-chat-store";
import { ContactListItem, IContactItemProps } from "./ContactListItem"

export const ContactList = () => {
    // TODO: connect to constact list provider
    const contactList = useChat((state: any) => state.contactList);

    return (
        <div className="w-1/3 border flex flex-col">
            <div className="py-2 px-3 bg-grey-lighter flex flex-row justify-between items-center">
                <div>
                    <img className="w-10 h-10 rounded-full" src="https://avatars.githubusercontent.com/u/15092575?s=48&v=4" />
                </div>
            </div>

            {/* <!-- Search --> */}
            <div className="py-2 px-2 bg-grey-lightest">
                <input
                    type="text" className="w-full px-2 py-2 text-sm"
                    placeholder="Search or start new chat"
                />
            </div>

            <div className="bg-grey-lighter flex-1 overflow-auto">
                {
                    contactList && contactList.map((contact : IContactItemProps) =>  (
                        <ContactListItem {...contact} />
                    ))
                }
               
            </div>
        </div>
    )
}