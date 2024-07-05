import { useState, useRef } from "react";
import { EditForm } from "./EditForm";
import { motion } from "framer-motion";

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
      `http://127.0.0.1:3000/api/message/${index}?text=${inputRef.current.value}`,
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
    fetch(`http://127.0.0.1:3000/api/message/${index}`, {
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
        <div 
          className="w-full flex flex-col items-start mt-2 gap-1 overflow-x-hidden"
        >
          <p className="text-sm md:text-xs text-slate-300">{user}</p>
          <motion.div  
            transition={{ bounce: 0, type: "spring", duration: .5 }}
            animate={{ opacity: [0,1] }}  
            className="text-white p-2 break-words max-w-[75%] rounded-lg bg-slate-700 font-normal text-sm md:text-base overflow-hidden"
          >
            {text}
          </motion.div>
        </div>
      ) : (
        <div 
          className="w-full flex flex-col items-end gap-1 mt-2 overflow-x-hidden"
        >
          <motion.div
            transition={{ bounce:0, type: "spring", duration: .5 }}
            animate={{ opacity: [0,1] }}
            onClick={toggleEditMode}
            className="cursor-pointer overflow-hidden text-white break-words p-2 max-w-[75%] rounded-lg bg-blue-700 font-normal text-sm md:text-base"
          >
            {text}
          </motion.div>
          {editMode && (
            <>
                <EditForm
                  text={text}
                  index={index}
                  update={update}
                  destroy={destroy}
                  inputRef={inputRef}
                  toggleEditMode={toggleEditMode}
                />
            </>
          )}
        </div>
      )}
    </>
  );
}
