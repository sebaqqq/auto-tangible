import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Bell, User, ChevronDown, LogOut } from "lucide-react";
import { useAuthStore } from "../../store/authStore";

export const Navbar: React.FC = () => {
  const { user, logout } = useAuthStore();
  const [showProfile, setShowProfile] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock search functionality
    console.log("Buscando:", searchValue);
  };

  return (
    <nav className="bg-[#1A1A1A] border-b border-[#222222] px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 max-w-md">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Buscar por patente o VIN..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full bg-[#0D0D0D] border border-[#222222] rounded-lg pl-10 pr-4 py-2
                       text-white placeholder:text-gray-500
                       focus:outline-none focus:ring-2 focus:ring-[#42E2E8]/20 focus:border-[#42E2E8]"
            />
          </div>
        </form>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-[#0D0D0D]"
          >
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </motion.button>

          {/* Profile Dropdown */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-[#0D0D0D] transition-colors"
            >
              <div className="w-8 h-8 bg-[#42E2E8] rounded-full flex items-center justify-center">
                <User size={16} className="text-black" />
              </div>
              <span className="text-white font-medium">{user?.name}</span>
              <ChevronDown size={16} className="text-gray-400" />
            </motion.button>

            {/* Dropdown Menu */}
            {showProfile && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 mt-2 w-48 bg-[#1A1A1A] border border-[#222222] rounded-lg shadow-lg py-2"
              >
                <div className="px-4 py-2 border-b border-[#222222]">
                  <p className="text-sm text-white font-medium">{user?.name}</p>
                  <p className="text-xs text-gray-400">{user?.email}</p>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-[#0D0D0D] transition-colors"
                >
                  <LogOut size={14} />
                  <span>Cerrar sesión</span>
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
