

import HeroSection from "../../components/HeroSection";

import ReviewsSection from "../../components/ReviewsSection";
import ServicesSection from "../../components/ServicesSection";
import WhoWeAre from "../../components/WhoWeAre"
import RecentProjects from '../../components/RecentProjects'
import PopularServices from "../../components/PopularServices";

export default function Home() {
  return (
    <div >
      <HeroSection/>
     
      <ServicesSection/>
      <PopularServices/>
      <WhoWeAre/>
      <RecentProjects/>
      <ReviewsSection/>
      
    </div>
  );
}
