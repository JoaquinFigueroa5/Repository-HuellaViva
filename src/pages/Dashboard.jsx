import HeroCarousel from "@/features/dashboard/components/Carrousel"
import RescueTimeline from "@/features/dashboard/components/RescueTimeline"
import DonationSection from "@/features/dashboard/components/Donation"
import MythsVsReality from "@/features/dashboard/components/MythsVsReality"
import ShopSection from "@/features/dashboard/components/Shop"
import PosterGenerator from "@/features/dashboard/components/PosterGenerator"
import BrandInvite from "@/features/dashboard/components/BrandInvite"
import SlideLogos from "@/features/dashboard/components/SlideLogos"
import RecognitionBanner from "@/features/dashboard/components/RecognitionBanner"

function Dashboard() {

  return (
    <>
      <HeroCarousel />
      <RecognitionBanner />
      <RescueTimeline />
      <DonationSection />
      <ShopSection />
      <MythsVsReality />
      <SlideLogos />
      <BrandInvite />
      {/* <PosterGenerator /> */}
    </>
  )
}


export default Dashboard