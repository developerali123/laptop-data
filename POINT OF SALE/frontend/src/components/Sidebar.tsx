import { IoHome, IoPerson, IoSettings, IoLogOut, IoRocket, IoCart, IoBarChart } from "react-icons/io5";

const Sidebar = ({ isSidebarOpen, isDarkMode }) => {
  // Define the base and hover icon sizes
  const baseIconSize = 28; // Base size
  const hoverIconSize = 48; // Hover size

  return (
    <div
      className={`${
        isSidebarOpen ? "w-36" : "w-16"
      } bg-blue-800 text-white dark:bg-gray-800 transition-all duration-300 flex flex-col items-center`}
    >

      <ul className="mt-4 space-y-4 flex-1">
        {[
          { icon: IoHome, label: "Home" },
          { icon: IoPerson, label: "Customer" },
          { icon: IoCart, label: "Orders" },
          { icon: IoBarChart, label: "Statistics" },
          { icon: IoSettings, label: "Settings" },
        ].map(({ icon: Icon, label }) => (
          <li
            key={label}
            className="group flex flex-col items-center cursor-pointer"
          >
            <Icon
              size={baseIconSize}
              className="transition-transform duration-300 group-hover:scale-110"
            />
            {isSidebarOpen && (
              <span className="mt-1">{label}</span>
            )}
          </li>
        ))}
      </ul>

      <div className="mt-4">
        <li className="group flex flex-col items-center cursor-pointer">
          <IoLogOut
            size={baseIconSize}
            className="transition-transform duration-300 group-hover:scale-110"
          />
          {isSidebarOpen && (
            <span className="mt-1">Logout</span>
          )}
        </li>
      </div>
    </div>
  );
};

export default Sidebar;