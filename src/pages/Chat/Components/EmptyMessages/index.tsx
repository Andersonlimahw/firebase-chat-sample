import { User } from '@phosphor-icons/react';
export const EmptyMessages = () => {
    return(
        <div className="w-[50%] my-10 mx-auto flex flex-row p-10 items-center text-center">           
            <User size={96} color="#86efac" />
            <h3 className="text-zinc-400">
                Selecione um contato para conversar.
            </h3>
        </div>
    )
}