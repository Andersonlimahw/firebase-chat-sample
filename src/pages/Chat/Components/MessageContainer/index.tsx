interface Props { 
    children: any;
}

export const MessageContainer  = ({ children } : Props) => {
    const time = new Date().toISOString();

    return (
        <div className="flex-1 overflow-auto bg-[#161311] text-zinc-400">
            <div className="py-2 px-3">
                <div className="flex justify-center mb-2">
                    <div className="rounded py-2 px-4 bg-[#DDECF2]" >
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