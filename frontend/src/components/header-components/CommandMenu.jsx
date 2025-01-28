import { Command } from "cmdk";
import React, { useState } from "react";
import { FaPlus, FaRegEnvelope } from "react-icons/fa6";
import DOMPurify from 'dompurify';



export const CommandMenu = ({ open, setOpen }) => {
  const [value, setValue] = useState("");

  const handleInputChange = (newValue) => {
    const sanitizedValue = DOMPurify.sanitize(newValue);
    setValue(sanitizedValue);
  };

  React.useEffect(() => {
    const down = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prevOpen) => !prevOpen);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [setOpen]);

  return (
    <Command.Dialog open={open} onOpenChange={setOpen} label="Global Command Menu" className="fixed inset-0 bg-slate-950/40" onClick={() => {setOpen(false)}}>
      <div onClick={(e) => {e.stopPropagation()}} className="bg-white w-full overflow-hidden shadow-xl max-w-lg m-auto mx-auto mt-20 border-stone-400 rounded-md">
      <Command.Input 
        value={value}
        onValueChange={handleInputChange}
        className="w-full text-black p-2" placeholder="What do you need?"
      />
      <Command.List>
        <Command.Empty className="p-1">
            No results found for {" "}
            <span className="text-violet-400">
                "{value}"
            </span>
        </Command.Empty>

        <Command.Group heading="Finance" className="p-1 mb-5 text-stone-300">
          <Command.Item onSelect={() => window.open("https://www.bloomberg.com/markets/stocks", "_blank")} className="flex text-slate-700 font-bold p-2 cursor-pointer hover:bg-stone-300 rounded-sm">Stocks</Command.Item>
          <Command.Item onSelect={() => window.open("https://goldprice.org", "_blank")} className="flex text-slate-700 font-bold p-2 cursor-pointer hover:bg-stone-300 rounded-sm">Gold</Command.Item>
          <Command.Item onSelect={() => window.open("https://www.globalpropertyguide.com", "_blank")} className="flex text-slate-700 font-bold p-2 cursor-pointer hover:bg-stone-300 rounded-sm">Real Estate</Command.Item>
        </Command.Group>

        <Command.Group heading="About Us" className="p-1 mb-5 text-stone-300">
            <Command.Item onSelect={() => window.open("https://www.linkedin.com/in/mohamed-metwalli5", "_blank")} className="flex text-slate-700 font-bold space-x-2 gap-2 items-center p-2 cursor-pointer hover:bg-stone-300 rounded-sm">
                <FaRegEnvelope /> Contact Me
            </Command.Item>
        </Command.Group>

        <Command.Item onSelect={() => window.open("https://github.com/MohamedMetwalli5/FinancoAI", "_blank")} className="flex items-center space-x-2 gap-2 p-2 cursor-pointer hover:bg-stone-300 rounded-sm">
            <FaPlus/> Invite Friend
        </Command.Item>
      </Command.List>
      </div>
    </Command.Dialog>
  );
};
