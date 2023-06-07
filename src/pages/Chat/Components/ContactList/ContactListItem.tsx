import { useNavigate } from "react-router-dom";
import { EActionType } from "../../../../store/flux";
import { useChat } from "../../../../store/hooks/use-chat-store";

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
}

export const ContactListItem = (item: IContactItemProps) => {
    const useChatStore = useChat((state: any) => state);
    const navigate = useNavigate();
    const { dispatch } = useChatStore;


    function handleContactSelection(item: IContactItemProps | any) {
        dispatch({
            type: EActionType.SELECT_CONTACT,
            payload: {
                ...item,
                id: item.id,
            }
        });
        navigate(`/chat/${item.id}`)
    }

    return (
        <div className="bg-zinc-800 px-3 flex items-center hover:bg-zinc-600 hover:shadow-sm cursor-pointer" onClick={() => handleContactSelection(item)}>
            <div>
                <img className="h-12 w-12 rounded-full" src={item?.photoURL} />
            </div>
            <div className="ml-4 my-2 flex-1 shadow-2xl border-green-lighter py-4 align-baseline justify-start">
                <div className="flex items-bottom justify-between">
                    <p className="text-grey-darkest">
                        {item?.displayName}                       
                    </p>
                </div>
            </div>
        </div>
    )
}