import { useChatStore } from "../../../../store/hooks/use-chat-store";


export const Header = () => {
    const selectedContact = useChatStore((state: any) => state.selectedContact);
    const { avatarUrl, title, description} = selectedContact as any;
    return (
        <div className="py-2 px-3 bg-grey-lighter flex flex-row justify-between items-center">
            <div className="flex items-center">
                <div>
                    <img className="w-10 h-10 rounded-full" src={avatarUrl} />
                </div>
                <div className="ml-4">
                    <p className="text-grey-darkest">
                        {title}
                    </p>
                    <p className="text-grey-darker text-xs mt-1">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    )
}