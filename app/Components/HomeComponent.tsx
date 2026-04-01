import CertificationsSection from "./CertificationSection";
import HomeHeroSection from "./HomeHeroSection";
import ReviewsSection from "./ReviewSection";
import TeachingProcessSection from "./TeachingProcessSection";

const HomeComponent = () => {
  return (
    <main>
      <HomeHeroSection />
      <ReviewsSection />
      <TeachingProcessSection />
      <CertificationsSection />
    </main>
  );
};

export default HomeComponent;
