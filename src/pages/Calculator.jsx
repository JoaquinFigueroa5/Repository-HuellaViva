import PetCostCalculator from "@/components/petCalculator/PetCalculator"
import Navbar from "@/components/common/Navbar"
import Footer from "@/components/common/Footer"
import ScrollToTop from "@/components/common/ScrollTop";

const Calculator = () => {
  return (
    <>
      <Navbar />
      <PetCostCalculator />
      <Footer />
      <ScrollToTop />
    </>
  )
}

export default Calculator