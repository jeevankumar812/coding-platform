import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />

      <main className="pt-20">
        <Hero />
        <Footer />
      </main>
    </>
  );
}

export default Home;