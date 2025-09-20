import React from 'react';
import { Hero } from '../components/sections/Hero';
import { About } from '../components/sections/About';
import { Rooms } from '../components/sections/Rooms';
import { RoomComparison } from '../components/sections/RoomComparison';
import { SpecialOffers } from '../components/sections/SpecialOffers';
import { BlogSection } from '../components/sections/BlogSection';
import { Contact } from '../components/sections/Contact';
import { Footer } from '../components/sections/Footer';

export function Home() {
  return (
    <div className="pt-16 lg:pt-20">
      <Hero />
      <About />
      <Rooms />
      <RoomComparison />
      <SpecialOffers />
      <BlogSection />
      <Contact />
      <Footer />
    </div>
  );
}