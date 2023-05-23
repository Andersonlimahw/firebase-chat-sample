import { Check } from "@phosphor-icons/react";

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
    uid: string;
    photoURL: string;
    email: string;
    displayName: string;
    position: EMessagePosition
}

export const Message = ({ displayName, message, status, position }: IMessageProps) => {
    const positionClass = position === EMessagePosition.Right ? 'justify-items-end' : 'justify-items-start';
    const bgColor = position === EMessagePosition.Right ? 'bg-gradient-to-t from-green-900 to-green-800 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl' : 'bg-gradient-to-t from-zinc-900 to-zinc-800 rounded-br-3xl rounded-tr-3xl rounded-tl-xl';
    return (
        <div className={`grid rounded-sm shadow-sm pl-4 text-left my-3 max-w-[100vw] ${positionClass}`}>
            <div className={`rounded py-2 px-3 bg-zinc-300 ${bgColor}`}>
                <p className="text-sm text-teal font-bold text-zinc-100">
                    {displayName}
                </p>
                <p className="text-sm mt-1 text-zinc-200">
                    {message}                    
                </p>
               
            </div>
        </div>
    )
}