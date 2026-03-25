import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import HowItWorks from "@/components/landing/HowItWorks";
import TracksSection from "@/components/landing/TracksSection";
import ProjectsFeed from "@/components/landing/ProjectsFeed";
import CommunitySection from "@/components/landing/CommunitySection";
import PricingSection from "@/components/landing/PricingSection";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <TracksSection />
      <ProjectsFeed />
      <CommunitySection />
      <PricingSection />
      <FinalCTA />
      <Footer />
    </div>
  );
}
