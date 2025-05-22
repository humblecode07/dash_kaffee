import { motion } from 'framer-motion';
import HomeDashCoffeeIcon from '../../assets/svgs/HomeDashCoffeeIcon';
import UserIcon from '../../assets/svgs/UserIcon';

const marquee = {
   animate: {
      x: ['0%', '-100%'],
      transition: {
         duration: 100,
         ease: 'linear',
         repeat: Infinity,
      },
   },
};

const messages = [
   '☕ New Flavor Alert: Matcha Espresso Fusion!',
   '📍 Find the nearest Dash Coffee branch now!',
   '💬 Contact us for catering and event bookings.',
];

const Header = () => {
   return (
      <header className="w-full font-inter sticky top-0 z-50 overflow-x-hidden">
         {/* Marquee */}
         <section className="w-full h-[2.5rem] bg-[#2E4328] relative overflow-hidden flex items-center">
            <motion.div
               className="flex whitespace-nowrap gap-16 text-white font-bold"
               variants={marquee}
               animate="animate"
            >
               {[...messages, ...messages, ...messages].map((msg, idx) => (
                  <span key={idx}>{msg}</span>
               ))}
            </motion.div>
         </section>

         {/* Main Header */}
         <section className="w-full h-[4.375rem] bg-[#534A3C] flex items-center justify-center relative">
            <div className="w-[93.90625rem] flex items-center justify-between relative px-4 max-w-full">
               <nav>
                  <ul className="flex items-center gap-[2.5rem] font-semibold text-white">
                     <li>Stores</li>
                     <li>Learn</li>
                     <li>Subscribe</li>
                  </ul>
               </nav>
               <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <HomeDashCoffeeIcon />
               </div>
               <div className="w-[13.211rem] flex items-center justify-between gap-[2.5rem]">
                  <UserIcon />
                  <button className="w-[9.21125rem] h-[2.25rem] flex items-center justify-center rounded-full border border-[#48653F] bg-white transition-all duration-300 hover:bg-[#48653F] cursor-pointer">
                     <span className="text-[#48653F] font-semibold transition-colors duration-300 hover:text-white hover:shadow-md">
                        Order Now
                     </span>
                  </button>
               </div>
            </div>
         </section>
      </header>
   );
};

export default Header;
