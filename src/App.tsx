import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import OurServices from './components/OurServices';
import Reviews from './components/Reviews';
import GetInTouch from './components/GetInTouch';
import Footer from './components/Footer';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <Navbar />
      <main id="home">
        <Hero />
        <AboutUs />
        <OurServices />
        <Reviews />
        <GetInTouch />
      </main>
      <Footer />
    </div>
  );
};

export default App;