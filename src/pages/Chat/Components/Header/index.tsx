import { ArrowLineLeft } from "@phosphor-icons/react";
import { IUser, useChat } from "../../../../store/hooks/use-chat-store";


export const Header = () => {
    const selectedContact = useChat((state: any) => state.selectedContact) as IUser;

    return (<>
        <div className="py-2 px-3 bg-grey-lighter flex flex-row justify-start items-start">
            <div className="flex items-start">
                <div>
                    <img className="w-10 h-10 rounded-full" src={selectedContact?.photoURL} />
                </div>
                <div className="text-left ml-4">
                    <p className="text-zinc-300 font-semibold">
                        {selectedContact?.displayName}
                    </p>
                    <p className="text-zinc-400 text-xs mt-1">
                        {selectedContact?.email}
                    </p>
                </div>
            </div>
        </div>
    </>

    )
}