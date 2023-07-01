import { Check } from "@phosphor-icons/react";
import { IUser, useChat } from "../../../../store/hooks/use-chat-store";

export enum EMessageStatus {
    Sent = 1,
    Readed = 2,
    Error = 3
}

export enum EMessagePosition {
    Right = 1,
    Left = 2
}

export interface IMessageProps {
    id: string;
    to: string;
    from: string;
    message: string;
    time: string;
    status: EMessageStatus,
    userId: string,
    userName: string;
    position: EMessagePosition
}

export const Message = ({ userName, message, position }: IMessageProps) => {
    const chatStore = useChat();
    const { theme } = chatStore;
  
    const positionClass = position === EMessagePosition.Right ? 'justify-items-end' : 'justify-items-start';
    const bgColor = position === EMessagePosition.Right ? `bg-gradient-to-t ${theme.styles.gradient} rounded-bl-3xl rounded-tl-3xl rounded-tr-xl` : 'bg-gradient-to-t from-zinc-900 to-zinc-800 rounded-br-3xl rounded-tr-3xl rounded-tl-xl';
    return (
        <div className={`grid rounded-sm shadow-sm pl-4 text-left my-3 max-w-[100vw] ${positionClass}`}>
            <div className={`rounded py-2 px-3 bg-zinc-300 ${bgColor}`}>
                <p className={`text-sm text-teal font-bold ${theme.styles.text}`}>
                    {userName}
                </p>
                <p className="text-sm mt-1 text-zinc-200">
                    {message}                    
                </p>
               
            </div>
        </div>
    )
}