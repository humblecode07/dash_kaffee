import React from 'react'
import FacebookIcon from '../../assets/svgs/FacebookIcon'
import TwitterIcon from '../../assets/svgs/TwitterIcon'
import InstagramIcon from '../../assets/svgs/InstagramIcon'
import TikTokIcon from '../../assets/svgs/TikTokIcon'

const Footer = () => {
  return (
    <footer>
      <section className='w-full h-[27.1875rem] bg-[#363129] flex justify-between px-[9.75rem] pt-[3.375rem]'>
        <div className='flex flex-col gap-[2.9375rem]'>
          <div className='flex flex-col gap-[1.375rem]'>
            <h4 className='font-inter font-bold text-[1.25rem] text-white'>ABOUT DASH COFFEE</h4>
            <p className='font-inter text-white'>Dash Coffee is all about serving quality drinks without<br />breaking the bank. From creamy blends to refreshing<br />teas—great taste starts at just ₱39.</p>
          </div>
          <div className='flex flex-col gap-[1.375rem]'>
            <h4 className='font-inter font-bold text-[1.25rem] text-white'>SOCIALS</h4>
            <div className='flex gap-[2.5625rem]'>
              <a href=""><FacebookIcon /></a>
              <a href=""><TwitterIcon /></a>
              <a href=""><InstagramIcon /></a>
              <a href=""><TikTokIcon /></a>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-[1.375rem]'>
          <h4 className='font-inter font-bold text-[1.25rem] text-white'>NEWSLETTER</h4>
          <div className='flex gap-[1rem]'>
            <div className="w-[16.875rem] h-[3rem] border border-[#C5C5C5] rounded-[.25rem] overflow-hidden">
              <input
                name="email"
                type="email"
                placeholder="youremail@example.com"
                className="w-full h-full px-4 py-2 font-inter text-[#333] outline-none placeholder-[#999] text-[1rem]"
              />
            </div>
            <button className='w-[9.25rem] h-[3rem] bg-[#507046] flex items-center justify-center'>
              <span className='font-inter font-bold text-white'>Subscribe</span>
            </button>
          </div>
        </div>
        <div className='flex flex-col gap-[1.375rem]'>
          <h4 className='font-inter font-bold text-[1.25rem] text-white'>LINKS</h4>
          <nav>
            <ul className='flex flex-col gap-[1.375rem] text-white font-inter'>
              <li>Home</li>
              <li>Menu</li>
              <li>Our Story</li>
              <li>Events</li>
              <li>Gallery</li>
              <li>Contact</li>
            </ul>
          </nav>
        </div>
      </section>
      <section className='w-full h-[4.625rem] bg-[#25211C] flex justify-center items-center'>
        <span className='text-white font-inter font-bold'>© 2025 Dash Coffee. All rights reserved.</span>
      </section>
    </footer>
  )
}

export default Footer
