import React from 'react'
import Navbar from './Components/Navbar';
import HeroSection from './Components/HeroSection';
import Feature from './Components/Feature';
import MoveComponentFirst from './Components/MoveComponentFirst'
import StudySection from './Components/StudySection';
import CustomerSection from './Components/CustomerSection';
import ContactUs from './Components/ContactUs';
import Footer from './Components/Footer';
import MoveComponentSecond from './Components/MoveComponentSecond';


const App = () => {
  return (
    <>
      <Navbar/>
      <HeroSection/>
      <Feature/>
      <MoveComponentFirst/>
      <MoveComponentSecond/>
      <StudySection/>
      <CustomerSection/>
      <ContactUs/>
      <Footer/>
    </>
  )
}

export default App
