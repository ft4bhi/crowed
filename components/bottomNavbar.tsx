"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { bottomTabs } from "@/data/nav";
import { motion } from "framer-motion";

const BottomNavBar = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden pb-safe">
      <div className="absolute inset-0 bg-white/80 backdrop-blur-lg border-t border-gray-200/50 shadow-lg-up" />
      
      <div className="relative flex justify-around items-center h-16 px-2 max-w-md mx-auto">
        {bottomTabs.map(({ name, icon: Icon, href, label }) => {
          const isActive = pathname === href;
          
          return (
            <Link 
              key={name} 
              href={href}
              className="flex-1 flex flex-col items-center justify-center py-2 group relative"
            >
              <div className={`relative p-2 rounded-xl transition-all duration-300 ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-400 group-hover:text-gray-600'}`}>
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 bg-blue-100/50 rounded-xl -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </div>
              <span className={`text-[10px] font-medium mt-1 transition-colors ${isActive ? 'text-blue-600' : 'text-gray-400'}`}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavBar;
