
import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import SearchSection from '../components/SearchSection';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 bg-background/90 backdrop-blur-md z-50 shadow-sm">
        <Navbar />
      </header>
      
      <main className="flex-grow">
        <HeroSection />
        <SearchSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
