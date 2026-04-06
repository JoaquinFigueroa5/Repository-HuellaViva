import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import ScrollToTop from "@/components/common/ScrollTop";
import PosterGenerator from "@/components/dashboard/PosterGenerator";

export default function GeneratePoster() {
  return (
    <>
      <Navbar />
      <PosterGenerator />
      <Footer />
      <ScrollToTop />
    </>
  );
}
