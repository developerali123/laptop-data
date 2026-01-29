import React, { useState } from "react";
import MainMenu from "../../components/mainmenu";
import Sidebar from "../../components/Sidebar";
export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark", !isDarkMode);
  };

  return (
    <div className={`flex flex-col h-screen ${isDarkMode ? "dark" : ""}`}>
      {/* Main Menu Bar */}
      <div className="flex justify-between items-center bg-white text-black dark:bg-gray-800 dark:text-gray-100 px-4 py-3 shadow-md z-10">
        <MainMenu
          toggleSidebar={toggleSidebar}
          toggleTheme={toggleTheme}
          isDarkMode={isDarkMode}
          isSidebarOpen={isSidebarOpen}
        />
      </div>

      {/* Main Content Area with Sidebar and Content Section */}
      <div className="flex flex-row h-full">
        {/* Sidebar */}
        <div
          className={`transition-all duration-300 ${
            isSidebarOpen ? "w-64" : "w-20"
          } bg-blue-800 dark:bg-gray-800`}
        >
          <Sidebar isSidebarOpen={isSidebarOpen} isDarkMode={isDarkMode} />
        </div>
        {children}
      </div>
    </div>
  );
}
