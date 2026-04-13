import Navbar from "@/components/common/Navbar";
import EmergencyGuide from "src/components/emergencyGuide/EmergencyGuide";
import ScrollToTop from "@/components/common/ScrollTop";
import Footer from "@/components/common/Footer";

function Emergency() {
  return (
    <>
      <Navbar />
      <EmergencyGuide />
      <Footer />
      <ScrollToTop />
    </>
  )
}

export default Emergency;