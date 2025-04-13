
import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import SearchSection from '../components/SearchSection';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      
      <main className="flex-grow">
        <HeroSection />
        <SearchSection />
      </main>
      
    </div>
  );
};

export default Index;
