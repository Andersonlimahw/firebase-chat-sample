import { useChat } from "../../../../store/hooks/use-chat-store";

interface Props { 
    children: any;
}

export const MessageContainer  = ({ children } : Props) => {
    const time = new Date().toLocaleString('pt-BR');
    const chatStore = useChat();
    const { theme } = chatStore;
  
    return (
        <div className="flex-1 overflow-auto bg-zinc-800 text-zinc-900">
            <div className="py-2 px-3">
                <div className="flex justify-center mb-2">
                    <div className={`Prounded py-2 px-4 ${theme.styles.background}`} >
                        <p className="text-sm uppercase">
                            {time}
                        </p>
                    </div>
                </div>
                { children }
            </div>
        </div>
    )
}