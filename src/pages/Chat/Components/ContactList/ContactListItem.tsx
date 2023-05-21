export interface IContactItemProps {
    avatarUrl: string;
    message: string;
    userName: string;
    time: string;
    status: string;
}

export const ContactListItem = (item: IContactItemProps) => {
    return (
        <div className="bg-white px-3 flex items-center hover:bg-grey-lighter cursor-pointer">
            <div>
                <img className="h-12 w-12 rounded-full" src={item.avatarUrl} />
            </div>
            <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
                <div className="flex items-bottom justify-between">
                    <p className="text-grey-darkest">
                        {item.message}
                    </p>
                    <p className="text-xs text-grey-darkest">
                        {item.time}
                    </p>
                </div>
                <p className="text-grey-dark mt-1 text-sm">
                    {item.status}
                </p>
            </div>
        </div>
    )
}