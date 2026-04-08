import Navbar from "@/components/common/Navbar"
import HeroCarousel from "@/components/dashboard/Carrousel"
import RescueTimeline from "@/components/dashboard/RescueTimeline"
import DonationSection from "@/components/dashboard/Donation"
import ScrollToTop from "@/components/common/ScrollTop"
import MythsVsReality from "@/components/dashboard/MythsVsReality"
import Footer from "@/components/common/Footer"
import ReportAnimal from "@/components/reportAnimal/ReportAnimal"
import PosterGenerator from "@/components/dashboard/PosterGenerator"

function Dashboard() {

  return (
    <>
      <Navbar />
      <HeroCarousel />
      <RescueTimeline />
      <DonationSection />
      <MythsVsReality />
      {/* <ReportAnimal /> */}
      {/* <PosterGenerator /> */}
      <Footer />
      <ScrollToTop />
    </>
  )
}

export default Dashboard