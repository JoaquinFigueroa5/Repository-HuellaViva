import HeroCarousel from "@/features/dashboard/components/Carrousel"
import RescueTimeline from "@/features/dashboard/components/RescueTimeline"
import DonationSection from "@/features/dashboard/components/Donation"
import MythsVsReality from "@/features/dashboard/components/MythsVsReality"
import PosterGenerator from "@/features/dashboard/components/PosterGenerator"

function Dashboard() {

  return (
    <>
      <HeroCarousel />
      <RescueTimeline />
      <DonationSection />
      <MythsVsReality />
      {/* <PosterGenerator /> */}
    </>
  )
}


export default Dashboard