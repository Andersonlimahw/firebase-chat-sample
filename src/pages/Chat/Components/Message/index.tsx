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
    const bgColor = position === EMessagePosition.Right ? 'bg-green-400' : ' bg-zinc-400';
    return (
        <div className={`grid pl-4 text-left my-3 max-w-[100vw] ${positionClass}`}>
            <div className={`rounded py-2 px-3 bg-zinc-300 ${bgColor}`}>
                <p className="text-sm text-teal font-semibold text-zinc-950">
                    {displayName}
                </p>
                <p className="text-sm mt-1 text-zinc-800">
                    {message}
                    {/* <span className="text-right text-xs text-grey-dark mt-1 justify-end right">
                        {status === EMessageStatus.Sent ? <Check size={16} color="green" /> : ''}
                    </span> */}
                </p>
               
            </div>
        </div>
    )
}