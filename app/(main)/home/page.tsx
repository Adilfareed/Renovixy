import React from 'react'
import HeroSection from '../../components/HeroSection'
import WhoWeAre from '../../components/WhoWeAre'
import ServicesSection from '../../components/ServicesSection'
import PopularServices from '../../components/PopularServices'
import OurWorkSection from '../../components/OurWorkSection'
import RecentProjects from '../../components/RecentProjects'
import ReviewsSection from '../../components/ReviewsSection'
import Faqs from '../../components/Faqs'
import OrderNowSection from '../../components/OrderNowSection'

const HomePage = () => {
  return (
    <>
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
    </>
  )
}

export default HomePage