import { FaMagnifyingGlass } from "react-icons/fa6";
import { CommandMenu } from "./CommandMenu";
import React, { useState } from "react";

const Searchbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="p-1 flex items-center justify-between bg-slate-300 rounded-full">
        <input
          className="flex-1 m-1 rounded-full p-2 w-full"
          placeholder="Search"
          onFocus={() => setOpen(true)}
        />
        <FaMagnifyingGlass
          className="flex-2 m-2 text-gray-500 text-2xl"
          onClick={() => setOpen((prev) => !prev)}
        />
      </div>
      <CommandMenu open={open} setOpen={setOpen} />
    </>
  );
};

export default Searchbar;
