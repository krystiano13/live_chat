import { useState, useRef } from "react";

interface Props {
  index: number;
  user: string;
  text: string;
  owner: string;
}

export function Message({ user, text, owner, index }: Props) {
  const [editMode, setEditMode] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  function toggleEditMode() {
    setEditMode((prev) => !prev);
  }

  function update(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!inputRef.current) return;

    fetch(
      `http://127.0.0.1:3000/update/${index}?text=${inputRef.current.value}`,
      {
        method: "PUT",
      }
    )
      .then((res) => res.json())
      .then(() => {
        setEditMode(false);
      });
  }

  function destroy(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    fetch(`http://127.0.0.1:3000/destroy/${index}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setEditMode(false);
      });
  }

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
          <div
            onClick={toggleEditMode}
            className="cursor-pointer text-white break-words p-2 max-w-[75%] rounded-lg bg-blue-700 font-normal text-sm md:text-base"
          >
            {text}
          </div>
          {editMode && (
            <>
              <div className="bg-slate-700 p-3 rounded-lg mt-1 flex flex-col gap-1 w-[80vw] md:w-auto">
                <form
                  className="flex flex-col md:flex-row gap-1 items-center"
                  onSubmit={update}
                >
                  <input
                    className="w-full md:w-auto text-sm md:text-base p-1 bg-slate-900 outline-none text-white border-b-2 border-b-blue-600 focus:border-b-blue-500"
                    defaultValue={text}
                    ref={inputRef}
                    placeholder="Your message ..."
                    name="text"
                    type="text"
                  />
                  <button
                    className="w-full md:w-auto text-sm md:text-base p-1 bg-blue-600 text-white pl-6 pr-6 cursor-pointer hover:bg-blue-500 transition"
                    type="submit"
                  >
                    Update
                  </button>
                </form>
                <form className="flex items-center justify-between mt-0.5" onSubmit={destroy}>
                  <button
                    className="w-[49%] text-white bg-emerald-600 hover:bg-emerald-500 transition cursor-pointer p-1 pl-6 pr-6"
                    onClick={toggleEditMode}
                    type="button"
                  >
                    Cancel
                  </button>
                  <button
                    className="w-[49%] text-white bg-red-600 hover:bg-red-500 transition cursor-pointer p-1 pl-6 pr-6"
                    type="submit"
                  >
                    Delete
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
