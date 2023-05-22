import { useState } from "react";
import { PaperPlaneRight  } from "@phosphor-icons/react";
import { create } from "../../../../services/firebase";
import { IState, useChat, IUser } from '../../../../store/hooks/use-chat-store';
import { EMessageStatus } from "../Message";


export const SendMessageInput = () => {
    const [message, setMessage] = useState('');
    const chatStore = useChat((state: any) => state);
    const { user, selectedContact } = chatStore as IState;
    const { uid, email, displayName, photoURL  } = user as IUser;

    const sendMessage = async (message: string) => {
        return create({
            collectionName: 'chat',
            payload: {                
                message: message,
                to: selectedContact?.email || 'andersonlimadeveloper@gmail.com',
                from: email,                
                displayName,
                photoURL,
                uid: uid,
                status: EMessageStatus.Sent
            }
        });
    };

    const handleSendMessage = async () => {
        if (message.trim() !== '') {
            await sendMessage(message);
            setMessage('');
        }
    };

    return (
        <div className="bg-grey-lighter px-4 py-4 flex items-center">
            <div className="flex-1 mx-4">
                <input
                    className="w-full border rounded px-2 py-2"
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    
                    onBlur={() => handleSendMessage()}
                />
            </div>
            <div>
                <PaperPlaneRight onClick={() => handleSendMessage()} size={24} color="#fff" weight="fill" />
            </div>
        </div>
    )
}