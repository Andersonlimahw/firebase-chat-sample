export interface IMessageProps { 
    id: string;
    userName: string;
    message: string;
    time: string;
}
export const Message = ({userName, message, time } : IMessageProps) => {
    return(
        <div className="flex mb-2">
        <div className="rounded py-2 px-3 bg-[#f2f2f2]" >
            <p className="text-sm text-teal">
                {userName}
            </p>
            <p className="text-sm mt-1">
                {message}
            </p>
            <p className="text-right text-xs text-grey-dark mt-1">
                {time}
            </p>
        </div>
    </div>
    )
}