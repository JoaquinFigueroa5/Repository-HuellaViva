import HeroCarousel from "@/features/dashboard/components/Carrousel"
import RescueTimeline from "@/features/dashboard/components/RescueTimeline"
import DonationSection from "@/features/dashboard/components/Donation"
import MythsVsReality from "@/features/dashboard/components/MythsVsReality"
import PosterGenerator from "@/features/dashboard/components/PosterGenerator"
import SlideLogos from "@/features/dashboard/components/SlideLogos"
import RecognitionBanner from "@/features/dashboard/components/RecognitionBanner"

function Dashboard() {

  return (
    <>
      <HeroCarousel />
      <RecognitionBanner />
      <RescueTimeline />
      <DonationSection />
      <MythsVsReality />
      <SlideLogos />
      {/* <PosterGenerator /> */}
    </>
  )
}


export default Dashboard