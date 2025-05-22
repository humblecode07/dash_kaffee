import React from 'react'
import Header from '../components/Home/Header'
import Hero from '../components/Home/Hero'
import DashMenu from '../components/Home/DashMenu'
import DashLocations from '../components/Home/DashLocations'
import ContactUs from '../components/Home/ContactUs'
import Footer from '../components/Home/Footer'

const Home = () => {
  return (
    <div className='flex flex-col '>
      <Header />
      <main>
        <Hero />
        <DashMenu />
        <DashLocations />
        <ContactUs />
      </main>
      <Footer />
    </div>
  )
}

export default Home
