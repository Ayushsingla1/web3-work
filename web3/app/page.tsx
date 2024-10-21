import Navbar from './components/Navbar';
import Hero from './components/Hero';
import InfoCard from './components/InfoCard';
import Footer from './components/Footer';
export default function Home() {
  return (
    <div className='overflow-x-hidden'>
      <Navbar />
      <Hero />
      <InfoCard />
      <Footer />
    </div>
  );
}
