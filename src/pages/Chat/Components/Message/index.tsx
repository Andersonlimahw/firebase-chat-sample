import { Check } from "@phosphor-icons/react";

export enum EMessageStatus {
    Sent = 1,
    Readed = 2,
    Error = 3
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
}

export const Message = ({ displayName, message, status }: IMessageProps) => {
    return (
        <div className="flex mb-2">
            <div className="rounded py-2 px-3 bg-zinc-300" >
                <p className="text-sm text-teal font-semibold text-zinc-950">
                    {displayName}
                </p>
                <p className="text-sm mt-1 text-zinc-800">
                    {message}
                    <span className="text-right text-xs text-grey-dark mt-1 justify-end right">
                        {status === EMessageStatus.Sent ? <Check size={16} color="green" /> : ''}
                    </span>
                </p>
               
            </div>
        </div>
    )
}