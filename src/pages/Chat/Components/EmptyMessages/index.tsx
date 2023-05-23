import { ChatsCircle  } from '@phosphor-icons/react';
export const EmptyMessages = () => {
    return(
        <div className="w-[50%] my-10 mx-auto flex flex-column p-10 items-center text-center">           
            <ChatsCircle  size={96} color="#86efac" />
            <br />
            <h3 className="text-zinc-400 ml-4">
                Selecione um contato para conversar.
            </h3>
        </div>
    )
}