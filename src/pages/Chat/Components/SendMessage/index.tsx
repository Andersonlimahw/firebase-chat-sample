import { useState } from "react";
import { PaperPlaneRight } from "@phosphor-icons/react";
import { create } from "../../../../services/firebase";
import { IState, useChat, IUser } from '../../../../store/hooks/use-chat-store';
import { EMessageStatus } from "../Message";


export const SendMessageInput = () => {
    const [message, setMessage] = useState('');
    const chatStore = useChat((state: any) => state);
    const { user, selectedContact } = chatStore as IState;
    const { uid, email, displayName, photoURL } = user as IUser;

    const sendMessage = async (message: string) => {
        return create({
            collectionName: 'chat-messages',
            payload: {
                user: {                    
                    email,
                    displayName,
                    photoURL,
                    uid,
                },
                message: message,
                from: email,
                to: selectedContact?.email,                
                status: EMessageStatus.Sent
            }
        });
    };

    const handleSendMessage = async (event: any) => {
        event.preventDefault();
        if (message.trim() !== '') {
            await sendMessage(message);
            setMessage('');
        }
    };

    return (
        <div className="bg-grey-lighter px-4 py-4 flex items-start">
            <form className="flex-1 flex-row mx-4 items-baseline" onSubmit={handleSendMessage}>
                <div className="flex-inline">
                    <input
                        className="w-[94%] border-t-zinc-400 rounded px-2 py-2 flex-inline"
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    {
                        message && message.length > 1 && (
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