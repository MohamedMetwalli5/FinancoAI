import { FaBell } from "react-icons/fa";

const Notifications = () => {
  return (
    <>
        <div className="relative flex items-center justify-center cursor-pointer">
                <FaBell className="text-xl" />
                <span className="absolute ml-4 bg-red-500 rounded-full w-2 h-2"></span>
        </div>
    </>
  )
}

export default Notifications