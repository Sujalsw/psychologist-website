import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import AchievementsSection from "@/components/AchievementsSection";
import AwardsSection from "@/components/AwardsSection";
import AwardsGallerySection from "@/components/AwardsGallerySection";
import MediaSection from "@/components/MediaSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <AchievementsSection />
      <AwardsSection />
      <AwardsGallerySection />
      <MediaSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
