import { useChat } from "../../../../store/hooks/use-chat-store";


export const Header = () => {
    const selectedContact = useChat((state: any) => state.selectedContact);
    // const { photoUrl, title, description } = selectedContact as any;
    return (
        <div className="py-2 px-3 bg-grey-lighter flex flex-row justify-between items-center">
            <div className="flex items-center">
                <div>
                    <img className="w-10 h-10 rounded-full" src={selectedContact?.photoUrl} />
                </div>
                <div className="ml-4">
                    <p className="text-grey-darkest">
                        {selectedContact?.title}
                    </p>
                    <p className="text-grey-darker text-xs mt-1">
                        {selectedContact?.description}
                    </p>
                </div>
            </div>
        </div>
    )
}