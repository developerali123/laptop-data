import { IoHome, IoPerson, IoSettings, IoLogOut } from "react-icons/io5";
const Sidebar = ({ isSidebarOpen, isDarkMode }) => {
  return (
    <div
      className={`${
        isSidebarOpen ? "w-64" : "w-16"
      }  bg-blue-800 text-white dark:bg-gray-800 transition-all duration-300 flex flex-col`}
    >
      <div className="p-4">
        <h2 className="text-lg font-bold text-center">
          {isSidebarOpen ? <h1 className="text-4xl font-serif text-white text-center mt-4"> SwiftSell</h1> : ""}
        </h2>
      </div>

      <ul className="mt-4 space-y-2">
        <li className="flex items-center px-4 py-2 hover:bg-blue-600 dark:hover:bg-gray-600 cursor-pointer">
          <IoHome className="text-xl mr-2" />
          {isSidebarOpen && "Home"}
        </li>
        <li className="flex items-center px-4 py-2 hover:bg-blue-600 dark:hover:bg-gray-600 cursor-pointer">
          <IoPerson className="text-xl mr-2" />
          {isSidebarOpen && "Profile"}
        </li>
        <li className="flex items-center px-4 py-2 hover:bg-blue-600 dark:hover:bg-gray-600 cursor-pointer">
          <IoSettings className="text-xl mr-2" />
          {isSidebarOpen && "Settings"}
        </li>
        <li className="flex items-center px-4 py-2 hover:bg-blue-600 dark:hover:bg-gray-600 cursor-pointer">
          <IoLogOut className="text-xl mr-2" />
          {isSidebarOpen && "Logout"}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;