import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import bgOne from '../../assets/imgs/hero_bg_1.jpg'
import bgTwo from '../../assets/imgs/hero_bg_2.jpg'
import bgThree from '../../assets/imgs/hero_bg_3.jpg'
import bgFour from '../../assets/imgs/hero_bg_4.jpg'
import bgFive from '../../assets/imgs/hero_bg_5.jpg'
import bgSix from '../../assets/imgs/hero_bg_6.jpg'
import SentIcon from '../../assets/svgs/SentIcon'

const images = [bgOne, bgTwo, bgThree, bgFour, bgFive, bgSix];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1)
      setCurrent(prev => (prev + 1) % images.length)
    }, 3500)
    return () => clearInterval(interval)
  }, [])

  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0,
      position: 'absolute',
    }),
    center: {
      x: 0,
      opacity: 1,
      position: 'relative',
    },
    exit: (dir) => ({
      x: dir > 0 ? '-100%' : '100%',
      opacity: 0,
      position: 'absolute',
    }),
  }

  return (
    <section className='w-full h-[90dvh] flex overflow-hidden'>
      <div className='w-[50%] h-full flex flex-col items-center justify-center gap-[2.875rem] bg-no-repeat bg-cover bg-center' style={{ backgroundImage: "url('/hero-bg.svg')" }}>
        <section className='flex flex-col items-center justify-center gap-[1.625rem]'>
          <h1 className='font-nerko-one text-[6rem] text-white text-stroke leading-[116px]'>What’s up, <br />Dashkada!</h1>
          <p className='font-inter font-medium text-[1.25rem] text-[#fef3c7] text-center'>
            Born from simple cravings and barkada moments, <br />
            CafeDash brews chill, quality cups for as <br />
            low as ₱39—made for your everyday sip.
          </p>
        </section>
        <button className='w-[13.6875rem] h-[3.5625rem] flex items-center justify-center gap-[1.125rem] font-inter font-bold text-white rounded-full bg-[#534A3C] border border-[#2E4328] transition-all duration-300 hover:bg-[#2E4328] hover:scale-105 cursor-pointer'>
          <SentIcon />
          Find a Branch
        </button>
      </div>
      <div className='w-[50%] h-full border-l border-[#2E4328] relative overflow-hidden bg-[#25211C] bg-no-repeat bg-cover bg-center' style={{ backgroundImage: "url('/nil_igop.jpg')" }}>
        <AnimatePresence custom={direction} mode="wait">
          <motion.img
            key={current}
            src={images[current]}
            alt=""
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className='w-full h-full object-cover'
          />
        </AnimatePresence>
      </div>
    </section>
  )
}

export default Hero
