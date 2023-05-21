import { EActionType } from "../../../../store/flux";
import { useChat } from "../../../../store/hooks/use-chat-store";

export interface IContactItemProps {
    id: string;
    photoURL: string;
    message: string;
    displayName: string;
    time: string;
    status: string;
}

export const ContactListItem = (item: IContactItemProps) => {
    const useChatStore = useChat((state: any) => state);
    const { dispatch } = useChatStore;


    function handleContactSelection(item: IContactItemProps) {
        return dispatch({
            type: EActionType.SELECT_CONTACT, 
            payload: {                
                ...item,
                user: item, 
                userName: item.displayName || '',
            }
        });
    }

    return (
        <div className="bg-white px-3 flex items-center hover:bg-grey-lighter cursor-pointer" onClick={() => handleContactSelection(item)}>
            <div>
                <img className="h-12 w-12 rounded-full" src={item.photoURL} />
            </div>
            <div className="ml-4 flex-1 border-b border-green-lighter py-4">
                <div className="flex items-bottom justify-between">
                    <p className="text-grey-darkest">
                        {item.message}
                    </p>
                    <p className="text-xs text-grey-darkest">
                        {item.time}
                    </p>
                </div>
                <p className="text-grey-dark mt-1 text-sm">
                    {item.status}
                </p>
            </div>
        </div>
    )
}