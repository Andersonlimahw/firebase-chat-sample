interface Props { 
    children: any;
}

export const MessageContainer  = ({ children } : Props) => {
    const time = new Date().toLocaleString('pt-BR');

    return (
        <div className="flex-1 overflow-auto bg-zinc-800 text-zinc-900 sm:w-full">
            <div className="py-2 px-3">
                <div className="flex justify-center mb-2">
                    <div className="rounded py-2 px-4 bg-green-700" >
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