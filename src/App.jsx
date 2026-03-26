import Navbar from "./components/common/Navbar"
import HeroCarousel from "./components/dashboard/Carrousel"
import RescueTimeline from "./components/dashboard/RescueTimeline"
import DonationSection from "./components/dashboard/Donation"
import ScrollToTop from "./components/common/ScrollTop"
import MythsVsReality from "./components/dashboard/MitoVsRealidad"

function App() {

  return (
    <>
      <Navbar />
      <HeroCarousel />
      <RescueTimeline />
      <DonationSection />
      <MythsVsReality />
      
      <ScrollToTop />
    </>
  )
}

export default App
