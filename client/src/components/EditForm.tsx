interface Props {
    text: string;
    index: number;
    update: (e: React.FormEvent<HTMLFormElement>) => void;
    destroy: (e: React.FormEvent<HTMLFormElement>) => void;
    inputRef: React.RefObject<HTMLInputElement>;
    toggleEditMode: () => void;
}

export const EditForm:React.FC<Props> = ({ text, index, update, destroy, inputRef, toggleEditMode }) => {
    return (
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
        <form
          className="flex items-center justify-between mt-0.5"
          onSubmit={destroy}
        >
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
    );
}