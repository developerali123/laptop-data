import { IoListOutline, IoMoon, IoSunny, IoNotificationsOutline, IoClose } from "react-icons/io5";
import { useState } from "react";

const MainMenu = ({ toggleSidebar, toggleTheme, isDarkMode, isSidebarOpen }) => {
  // State to manage notification dropdown visibility
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Function to toggle the notification panel visibility
  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
  };

  return (
    <div className="flex items-center justify-between w-full">
      {/* Sidebar Toggle */}
      <button
        onClick={toggleSidebar}
        className="text-white bg-blue-600 dark:bg-gray-600 px-2 py-1 rounded-md hover:bg-blue-500 dark:hover:bg-gray-500 focus:outline-none"
      >
        {/* Conditionally render either hamburger or cross icon */}
        {isSidebarOpen ? <IoClose className="text-xl" /> : <IoListOutline className="text-xl" />}
      </button>

      {/* Title */}
      <h1 className="text-xl font-bold text-center">Dashboard</h1>

      {/* Theme Toggle and Profile */}
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleTheme}
          className="text-white bg-blue-600 dark:bg-gray-600 px-2 py-1 rounded-md hover:bg-blue-500 dark:hover:bg-gray-500 focus:outline-none"
        >
          {isDarkMode ? <IoSunny className="text-xl" /> : <IoMoon className="text-xl" />}
        </button>

        {/* Notification Icon */}
        <div className="relative flex items-center">
          <button onClick={toggleNotifications}>
            <IoNotificationsOutline className="text-2xl mr-3" />
          </button>
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            3
          </span>

          {/* Notification Dropdown */}
          {isNotificationsOpen && (
            <div className="absolute right-2  top-8 w-48 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 shadow-lg rounded-md z-10">
              <ul className=" p-2 text-sm text-gray-700 dark:text-gray-300">
                <li className="px-2 py-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md">New comment on your post</li>
                <li className="px-2 py-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md">Server downtime alert</li>
                <li className="px-2 py-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md">User requested password reset</li>
              </ul>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative flex items-center">
          <span className="font-medium">Admin</span>
          <img
            src="https://via.placeholder.com/40"
            alt="Profile"
            className="w-10 h-10 rounded-full ml-2"
          />
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
