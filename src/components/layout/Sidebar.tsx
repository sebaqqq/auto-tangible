import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { LayoutDashboard, Car, Shield, User } from "lucide-react";
import Logo from "../../images/logo.png";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/app" },
  { icon: Car, label: "Mis Autos", path: "/app/autos" },
  { icon: Shield, label: "Verificar Automóvil", path: "/app/verificar" },
  { icon: User, label: "Cuenta", path: "/app/cuenta" },
];

export const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-[#1A1A1A] border-r border-[#222222] h-full">
      {/* Logo */}
      <div className="p-6 border-b border-[#222222]">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-transparent rounded-lg flex items-center justify-center">
            <img src={Logo} alt="Logo" className="w-7 h-7" />
          </div>
          <span className="text-white font-bold text-lg">T4NGIBLE</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end={item.path === "/app"}
                className={({ isActive }) => `
                  flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors
                  ${
                    isActive
                      ? "bg-[#42E2E8]/20 text-[#42E2E8] border-r-2 border-[#42E2E8]"
                      : "text-gray-400 hover:text-white hover:bg-[#0D0D0D]"
                  }
                `}
              >
                {({ isActive }) => (
                  <motion.div
                    whileHover={{ x: 2 }}
                    className="flex items-center space-x-3 w-full"
                  >
                    <item.icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </motion.div>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
