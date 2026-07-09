import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import Features from "../components/Features";

function Home() {
  return (
    <>
      <Navbar />

      <main className="pt-20">
        <Hero />
        <Features/>
        <Footer />
      </main>
    </>
  );
}

export default Home;