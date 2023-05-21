import { IUser, useChat } from "../../../../store/hooks/use-chat-store";


export const Header = () => {
    const selectedContact = useChat((state: any) => state.selectedContact) as IUser;
    return (
        <div className="py-2 px-3 bg-grey-lighter flex flex-row justify-between items-center">
            <div className="flex items-center">
                <div>
                    <img className="w-10 h-10 rounded-full" src={selectedContact?.photoURL} />
                </div>
                <div className="ml-4">
                    <p className="text-grey-darkest">
                        {selectedContact?.displayName}
                    </p>
                    <p className="text-grey-darker text-xs mt-1">
                        {selectedContact?.email}
                    </p>
                </div>
            </div>
        </div>
    )
}