interface Props {
    user: string;
    text: string;
    owner: string;
}

export function Message({ user, text, owner }:Props) {
    return (
      <>
        {user !== owner ? (
          <div className="w-full flex flex-col items-start mt-2 gap-1">
            <p className="text-sm md:text-xs text-slate-300">{user}</p>
            <div className="text-white p-2 break-words max-w-[75%] rounded-lg bg-slate-700 font-normal text-sm md:text-base">
              {text}
            </div>
          </div>
        ) : (
          <div className="w-full flex flex-col items-end gap-1 mt-2">
            <div className="text-white break-words p-2 max-w-[75%] rounded-lg bg-blue-700 font-normal text-sm md:text-base">
              {text}
            </div>
          </div>
        )}
      </>
    );
}