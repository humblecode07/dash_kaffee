import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom';
import DashCoffee from '../assets/svgs/DashCoffee';
import { MessageIcon } from '../assets/svgs/MessageIcon';
import { FoodIcon } from '../assets/svgs/FoodIcon';
import { ShopIcon } from '../assets/svgs/ShopIcon';

const Sidebar = () => {
   const [isOpen, setIsOpen] = useState(false);
   const location = useLocation();

   const toggleSidebar = () => {
      setIsOpen(!isOpen)
   }

   const isActivePath = (path) => {
      const currentPath = location.pathname;

      if (path === '') {
         console.log(path);
         return currentPath === '/admin';
      }

      return currentPath.includes(path);
   }

   const handleLogout = async () => {
      try {
         const response = await fetch("http://localhost/nyehehe/logout.php", {
            method: "GET",
            credentials: "include"
         });

         if (response.ok) {
            window.location.href = "/";
         } else {
            console.error("Logout failed");
         }
      } catch (error) {
         console.error("Logout error:", error);
      }
   }

   return (
      <>
         <button
            className="fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-md md:hidden"
            onClick={toggleSidebar}
         >
            ☰
         </button>
         <div
            className={`fixed top-0 left-0 h-full w-64 flex flex-col gap-[2.5rem] bg-[#507046] shadow-lg border-r-[1px] border-r-[#2E4328] solid transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
               } transition-transform duration-300 ease-in-out md:translate-x-0`}
         >
            <div className='flex items-center justify-center pt-[2.1875rem]'>
               <DashCoffee />
            </div>
            <div className='flex flex-col gap-[0.375rem] text-white'>
               <ul className='flex flex-col justify-center items-center'>
                  <NavLink
                     to={'contact-messages'}
                     className={`w-[12.3125rem] h-[3.1156rem] rounded-[1rem] flex items-center cursor-pointer select-none ${isActivePath('contact-messages')
                        ? 'bg-[#534A3C]'
                        : 'bg-[#507046] hover:bg-[#445937]'
                        }`}
                  >
                     <div className='w-[10.5625rem] flex items-center gap-[0.875rem] px-[.875rem]'>
                        <div className={`w-[1.875rem] h-[1.875rem] rounded-full ${isActivePath('contact-messages') ? 'bg-[#507046]' : 'bg-[#534A3C]'
                           } flex justify-center items-center`}>
                           <MessageIcon />
                        </div>
                        <span className='font-roboto text-[.875rem] text-white'>Messages</span>
                     </div>
                  </NavLink>
                  <NavLink
                     to={'food-items'}
                     className={`w-[12.3125rem] h-[3.1156rem] rounded-[1rem] flex items-center cursor-pointer select-none ${isActivePath('/food-items')
                        ? 'bg-[#534A3C]'
                        : 'bg-[#507046] hover:bg-[#445937]'
                        }`}
                  >
                     <div className='w-[10.5625rem] flex items-center gap-[0.875rem] px-[.875rem]'>
                        <div className={`w-[1.875rem] h-[1.875rem] rounded-full ${isActivePath('/food-items') ? 'bg-[#507046]' : 'bg-[#534A3C]'
                           } flex justify-center items-center`}>
                           <FoodIcon />
                        </div>
                        <span className='font-roboto text-[.875rem] text-white'>Food Items</span>
                     </div>
                  </NavLink>
                  <NavLink
                     to={'branches'}
                     className={`w-[12.3125rem] h-[3.1156rem] rounded-[1rem] flex items-center cursor-pointer select-none ${isActivePath('branches')
                        ? 'bg-[#534A3C]'
                        : 'bg-[#507046] hover:bg-[#445937]'
                        }`}
                  >
                     <div className='w-[10.5625rem] flex items-center gap-[0.875rem] px-[.875rem]'>
                        <div className={`w-[1.875rem] h-[1.875rem] rounded-full ${isActivePath('branches') ? 'bg-[#507046]' : 'bg-[#534A3C]'
                           } flex justify-center items-center`}>
                           <ShopIcon />
                        </div>
                        <span className='font-roboto text-[.875rem] text-white'>Branches</span>
                     </div>
                  </NavLink>
                  <NavLink
                     to={'profile'}
                     className={`w-[12.3125rem] h-[3.1156rem] rounded-[1rem] flex items-center cursor-pointer select-none ${isActivePath('profile') ? 'bg-[#534A3C]' : 'bg-[#507046] hover:bg-[#445937]'}`}
                  >
                     <div className='w-[10.5625rem] flex items-center gap-[0.875rem] px-[.875rem] cursor-pointer'>
                        <div className={`w-[1.875rem] h-[1.875rem] rounded-full ${isActivePath('profile') ? 'bg-[#507046]' : 'bg-[#534A3C]'} flex justify-center items-center`}>
                           <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M7 0C7.92826 0 8.8185 0.368749 9.47487 1.02513C10.1313 1.6815 10.5 2.57174 10.5 3.5C10.5 4.42826 10.1313 5.3185 9.47487 5.97487C8.8185 6.63125 7.92826 7 7 7C6.07174 7 5.1815 6.63125 4.52513 5.97487C3.86875 5.3185 3.5 4.42826 3.5 3.5C3.5 2.57174 3.86875 1.6815 4.52513 1.02513C5.1815 0.368749 6.07174 0 7 0ZM7 8.75C10.8675 8.75 14 10.3162 14 12.25V14H0V12.25C0 10.3162 3.1325 8.75 7 8.75Z" fill="#ffffff" />
                           </svg>
                        </div>
                        <span className='font-roboto text-[.875rem] text-white'>Profile</span>
                     </div>
                  </NavLink>
                  <button
                     onClick={handleLogout}
                     className={`w-[12.3125rem] h-[3.1156rem] rounded-[1rem] flex items-center cursor-pointer select-none bg-[#507046] hover:bg-[#445937]`}
                  >
                     <div className='w-[10.5625rem] flex items-center gap-[0.875rem] px-[.875rem]'>
                        <div className={`w-[1.875rem] h-[1.875rem] rounded-full bg-[#534A3C] flex justify-center items-center`}>
                           <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1.55556 14C1.12778 14 0.761704 13.8478 0.457333 13.5434C0.152963 13.2391 0.000518519 12.8727 0 12.4444V1.55556C0 1.12778 0.152444 0.761704 0.457333 0.457333C0.762222 0.152963 1.1283 0.000518519 1.55556 0H7V1.55556H1.55556V12.4444H7V14H1.55556ZM10.1111 10.8889L9.04167 9.76111L11.025 7.77778H4.66667V6.22222H11.025L9.04167 4.23889L10.1111 3.11111L14 7L10.1111 10.8889Z" fill="#ffffff" />
                           </svg>
                        </div>
                        <span className='font-roboto text-[.875rem] text-white'>Logout</span>
                     </div>
                  </button>

               </ul>
            </div>
         </div>
      </>
   )
}

export default Sidebar