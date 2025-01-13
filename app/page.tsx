import Navbar from '../components/ui/Navbar';
import Hero from '../components/ui/Hero';
import InfoCard from '../components/ui/InfoCard';
import Footer from '../components/ui/Footer';
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
