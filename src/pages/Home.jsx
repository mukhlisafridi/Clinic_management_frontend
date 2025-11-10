import React from "react";
import Navbar from "../Components/Navbar";
import HospitalHeroSection from "../Components/HospitalHeroSection";
import HospitalServices from "../Components/HospitalServices";
import PatientCareSection from "../Components/PatientCareSection";
import DoctorExpertiseSection from "../Components/DoctorExpertiseSection";
import DoctorsSection from "../Components/DoctorsSection";
import ContactForm from "../Components/ContactUs";
import Footer from "../Components/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <HospitalHeroSection />
      <HospitalServices />
      <PatientCareSection />
      <DoctorExpertiseSection />
      <DoctorsSection />
      <ContactForm />
      <Footer />
    </>
  );
};

export default Home;
