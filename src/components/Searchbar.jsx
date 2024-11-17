import { FaMagnifyingGlass } from "react-icons/fa6";
import { CommandMenu } from "./CommandMenu";

const Searchbar = () => {
  return (
    <>
        <div className="p-1 flex items-center justify-between bg-slate-300 rounded-full">
            <input className="flex-1 m-1 rounded-full p-2" placeholder="Search"/>
            <FaMagnifyingGlass className="flex-2 m-2 cursor-pointer text-black"/>
        </div>
        {/* <CommandMenu /> */}
    </>
  )
}

export default Searchbar