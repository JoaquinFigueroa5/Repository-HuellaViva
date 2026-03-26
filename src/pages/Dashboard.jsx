import Navbar from "@/components/common/Navbar"
import HeroCarousel from "@/components/dashboard/Carrousel"
import RescueTimeline from "@/components/dashboard/RescueTimeline"
import DonationSection from "@/components/dashboard/Donation"
import ScrollToTop from "@/components/common/ScrollTop"
import MythsVsReality from "@/components/dashboard/MythsVsReality"
import Footer from "@/components/common/Footer"

function Dashboard() {

  return (
    <>
      <Navbar />
      <HeroCarousel />
      <RescueTimeline />
      <DonationSection />
      <MythsVsReality />
      <Footer />
      <ScrollToTop />
    </>
  )
}

export default Dashboard