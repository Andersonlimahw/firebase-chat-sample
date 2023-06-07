import { ArrowLineLeft } from "@phosphor-icons/react";
import { useFirebaseChat } from "../../hooks";
import { Header } from "../Header"
import { EMessagePosition, IMessageProps, Message } from "../Message";
import { MessageContainer } from "../MessageContainer"
import { SendMessageInput } from "../SendMessage";

export const ChatDetail = () => {
    const chatStore = useFirebaseChat();

    const {
        selectedContact,
        handleResetSelectedContact,
        user,
        messages,
    } = chatStore;


    const hasSelectedContact = selectedContact && selectedContact.id !== '';

    const messagesContainerClasses = {
        'mobile': !hasSelectedContact ? 'none' : 'min-[0px]:w-full',
        'default': 'max=[600px]:flex-1 w-full'
    };

    const isMobile = () => {
        return window.screen.width <= 690;
    }

    const screnType = isMobile() ? 'mobile' : 'default';
    return (

        <div className={`animate-[wiggle_1s_ease-in-out_infinite] shadow-sm flex flex-col ${messagesContainerClasses[screnType]}`
        }>
            <MessageContainer>
                <div className="w-full" >
                    <ArrowLineLeft onClick={handleResetSelectedContact} size={40} className={`text-white mx-2 py-2 cursor-pointer ${hasSelectedContact ? 'block' : 'hidden'}`} />
                </div>
                <Header />

                {messages &&
                    messages.map((msg: IMessageProps) => (
                        <Message
                            key={msg.id}
                            {...msg}
                            position={msg.from === user.email ? EMessagePosition.Right : EMessagePosition.Left}
                            userName={msg.from === user.email ? user.displayName : selectedContact.displayName}
                        />
                    ))}
            </MessageContainer>
            <SendMessageInput />
        </div >
    )
}