import React from 'react';
import { useLocation } from 'react-router-dom';
import nilPogi from '../assets/imgs/nil_igop.jpg';
import { BellIcon } from '../assets/svgs/BellIcon';

const Header = () => {
   const location = useLocation();
   const path = location.pathname;

   const pathTitleMap = {
      'contact-messages': 'Contact Messages',
      'food-items': 'Food Items',
      'branches': 'Branches',
      'dashboard': 'Dashboard',
   };

   const getTitle = () => {
      for (const key in pathTitleMap) {
         if (path.includes(key)) return pathTitleMap[key];
      }
      return 'Admin Panel';
   };

   return (
      <header className="w-full h-[78px] bg-[#507046] border-b border-[#2E4328] flex items-center justify-between px-5 text-white  pl-[20rem] pr-[4.3125rem]">
         <div>
            <h2 className="text-2xl font-semibold">{getTitle()}</h2>
            <p className="text-sm text-white/80">Welcome back, Nil! Here's what's new today.</p>
         </div>

         {/* Right side with user profile and notifications */}
         <div className="flex items-center gap-4">
            {/* Notification Icon */}
            <button className="relative hover:text-white/90 transition">
               <BellIcon />
               <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full px-1.5 text-white">
                  3
               </span>
            </button>

            {/* User Info */}
            <div className="flex items-center gap-3">
               <div className="text-right">
                  <p className="text-sm font-medium">User 123</p>
                  <p className="text-xs text-white/70">Admin</p>
               </div>
               <button className="focus:outline-none hover:opacity-90 transition">
                  <img
                     src={nilPogi}
                     alt="Profile"
                     className="w-10 h-10 rounded-full object-cover border border-white shadow"
                  />
               </button>
            </div>
         </div>
      </header>
   );
};

export default Header;
