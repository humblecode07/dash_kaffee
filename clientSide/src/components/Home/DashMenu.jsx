import React, { useState } from 'react';
import { motion } from 'framer-motion';
import menuOne from '../../assets/imgs/menu_1.jpg';
import menuTwo from '../../assets/imgs/menu_2.jpg';
import menuThree from '../../assets/imgs/menu_3.jpg';
import menuFour from '../../assets/imgs/menu_4.jpg';
import menuFive from '../../assets/imgs/menu_5.jpg';

const images = [menuOne, menuTwo, menuThree, menuFour, menuFive];

// Themed gradients based on your menu type
const imageGradients = [
   'linear-gradient(180deg, #FAFFD1, #A1FFCE)',               // Fruit Tea
   'linear-gradient(180deg, #FFFBF0, #F5E6D3)',               // Dessert with salty cream
   'linear-gradient(180deg, #FAF7F2, #E8DDD4)',               // Milk tea with pearls
   'linear-gradient(180deg, #FFFFFF, #FFEFBA)',               // Fruit Soda
   'linear-gradient(180deg, #ede0d4, #7f5539)',               // Signature Milkteas
];

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

const DashMenu = () => {
   const [activeIdx, setActiveIdx] = useState(null);

   return (
      <section className="relative w-full h-[55.8125rem] flex flex-col items-center justify-center overflow-hidden">
         <div className="absolute inset-0 z-0 bg-white transition-colors duration-500" />
         {imageGradients.map((gradient, idx) => (
            <div
               key={idx}
               className="absolute inset-0 z-0 transition-opacity duration-700 pointer-events-none"
               style={{
                  background: gradient,
                  opacity: activeIdx === idx ? 1 : 0,
               }}
            />
         ))}
         <div className="relative z-10 flex flex-col gap-[1rem] text-center pt-[3.375rem] pb-[3rem]">
            <h2 className="font-nerko-one text-[3.25rem] text-[#507046]">Dash Flavors You'll Love</h2>
            <p className="font-inter font-semibold text-[1.25rem] text-[#507046]">
               From creamy blends to fruity refreshers, explore a menu made for your mood — with drinks starting at just ₱39.
            </p>
         </div>
         <div className="relative z-10 w-full overflow-hidden">
            <motion.div
               className="flex whitespace-nowrap font-bold"
               variants={marquee}
               animate="animate"
            >
               {[...images, ...images, ...images].map((img, idx) => {
                  const originalIdx = idx % images.length;
                  return (
                     <img
                        key={idx}
                        src={img}
                        alt="menu"
                        onMouseEnter={() => setActiveIdx(originalIdx)}
                        onMouseLeave={() => setActiveIdx(null)}
                        className="w-[22.5rem] h-[28.0625rem] object-cover transition-transform duration-300 hover:scale-105 cursor-pointer"
                     />
                  );
               })}
            </motion.div>
         </div>
         <button className='w-[13.6875rem] h-[3.5625rem] flex items-center justify-center mt-[3rem] bg-[#507046] rounded-full border border-[#2E4328] relative transition-all duration-300 ease-in-out hover:bg-[#3b5232] hover:scale-105 cursor-pointer'>
            <span className='font-inter font-bold text-white'>Browse All Flavors</span>
         </button>
      </section>
   );
};

export default DashMenu;
