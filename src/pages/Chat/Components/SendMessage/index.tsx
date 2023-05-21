import { useState } from "react";
import { create } from "../../../../services/firebase";
import { IState, useChat } from "../../../../store/hooks/use-chat-store";

export const SendMessageInput = () => {
    const [message, setMessage] = useState('');
    const chatStore = useChat((state: any) => state);
    const { user, selectedContact } = chatStore as IState;

    const sendMessage = async (message: string) => {
        return create({
            collectionName: 'chat',
            payload: {
                message,
                userId: user?.uid,             
                userName: user?.displayName,
                photoURL: user?.photoURL,
                email: user?.email,
                from: user?.email,
                fromId: user?.uid,
                toId: selectedContact?.uid,
                to: selectedContact?.email,
                sent: true,
                readed: false,
                timestamp: new Date(),
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
                    onSubmit={() => handleSendMessage()}
                    onBlur={() => handleSendMessage()}
                />
            </div>
            {/* TODO: phospro icon pra botão de enviar */}
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="#263238" fill-opacity=".45" d="M11.999 14.942c2.001 0 3.531-1.53 3.531-3.531V4.35c0-2.001-1.53-3.531-3.531-3.531S8.469 2.35 8.469 4.35v7.061c0 2.001 1.53 3.531 3.53 3.531zm6.238-3.53c0 3.531-2.942 6.002-6.237 6.002s-6.237-2.471-6.237-6.002H3.761c0 4.001 3.178 7.297 7.061 7.885v3.884h2.354v-3.884c3.884-.588 7.061-3.884 7.061-7.885h-2z"></path></svg>
            </div>
        </div>
    )
}