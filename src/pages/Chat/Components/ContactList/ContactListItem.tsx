import { EActionType } from "../../../../store/flux";
import { IUser, useChat } from "../../../../store/hooks/use-chat-store";

export interface IContactItemProps {
    id: string;
    photoURL: string;
    message: string;
    displayName: string;
    time: string;
    status: string;
    email: string;
    to: string;
    from: string;
    count: number;
    user: IUser;
}

export const ContactListItem = (item: IContactItemProps) => {
    const useChatStore = useChat((state: any) => state);
    const { dispatch } = useChatStore;
    const { user: contact, count } = item;


    function handleContactSelection(item: IContactItemProps | any) {
        return dispatch({
            type: EActionType.SELECT_CONTACT,
            payload: {
                ...item,
                ...contact,               
                email: item.from,
            }
        });
    }

    return (
        <div className="bg-zinc-800 px-3 flex items-center hover:bg-zinc-600 hover:shadow-sm cursor-pointer" onClick={() => handleContactSelection(item)}>
            <div>
                <img className="h-12 w-12 rounded-full" src={contact.photoURL} />
            </div>
            <div className="ml-4 flex-1 border-b border-green-lighter py-4 align-baseline justify-start">
                <div className="flex items-bottom justify-between">
                    <p className="text-grey-darkest">
                        {contact.displayName}                       
                        <span className="inline-flex items-center rounded-md bg-pink-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-700/10 ml-4">{count}</span>
                    </p>
                </div>

            </div>
        </div>
    )
}