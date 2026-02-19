import React from 'react'
import HeroSection from "./components/HeroSection"
import WhoWeAre from "./components/WhoWeAre"
import ServicesSection from "./components/ServicesSection"
import PopularServices from "./components/PopularServices"
import OurWorkSection from "./components/OurWorkSection"
import RecentProjects from "./components/RecentProjects"
import ReviewsSection from "./components/ReviewsSection"
import Faqs from "./components/Faqs"
import OrderNowSection from "./components/OrderNowSection"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

export default function HomePage() {
  return (
    <>
      <Navbar />
      
      {/* Hero Section with Quote Form */}
      <HeroSection />
      
      {/* Who We Are Section */}
      <WhoWeAre />
      
      {/* Services Overview */}
      <ServicesSection />
      
      {/* Popular Services */}
      <PopularServices />
      
      {/* Our Work Portfolio */}
      <OurWorkSection />
      
      {/* Recent Projects */}
      <RecentProjects />
      
      {/* Customer Reviews */}
      <ReviewsSection />
      
      {/* FAQ Section */}
      <Faqs />
      
      {/* Call to Action */}
      <OrderNowSection />
      
      <Footer />
    </>
  )
}
