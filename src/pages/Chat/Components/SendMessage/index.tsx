import { useState } from "react";
import { PaperPlaneRight } from "@phosphor-icons/react";
import { create } from "../../../../services/firebase";
import { IState, useChat, IUser } from '../../../../store/hooks/use-chat-store';
import { EMessageStatus } from "../Message";
import { MESSAGE_COLLECTION_NAME } from "../../constants";


export const SendMessageInput = () => {
    const [message, setMessage] = useState('');
    const chatStore = useChat((state: any) => state);
    const { user, selectedContact } = chatStore as IState;
    const { uid, email, displayName, photoURL } = user as IUser;

    const sendMessage = async (message: string) => {
        const messagePayload = {                
            userId: uid,
            contactUid: selectedContact?.id || 'teste',
            message: message,
            from: email,
            to: selectedContact?.email,                
            status: EMessageStatus.Sent
        };

        return create({
            collectionName: MESSAGE_COLLECTION_NAME,
            payload: messagePayload
        });
    };

    const handleSendMessage = async (event: any) => {
        event.preventDefault();
        const messageIsValid = message && message.trim() !== '';
        if (messageIsValid) {            
            await sendMessage(message);
            setMessage('');
        }
    };

    return (
        <div className="bg-grey-lighter px-4 py-4 flex items-start">
            <form className="flex-1 flex-row mx-4 items-baseline" onSubmit={handleSendMessage}>
                <div className="flex-inline">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className={`w-[92%] border-t-zinc-400 rounded px-2 py-2 flex-inline ${selectedContact?.id === '' && 'hidden'}`}
                    />
                    {
                        selectedContact?.id !== '' && message && message.length > 1 && (
                            <span className="inline-block absolute ml-2 pt-1 items-center justify-items-center">
                                <PaperPlaneRight onClick={handleSendMessage} size={24} color="#fff" weight="fill" />
                            </span>
                        )
                    }
                </div>
            </form>
        </div>
    )
}