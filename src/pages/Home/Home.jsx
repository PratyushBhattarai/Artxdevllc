// src/pages/Home/Home.jsx
import Hero from './sections/Hero';
import Brands from './sections/Brands';
import WhatWeDo from './sections/WhatWeDo';
import Portfolio from './sections/Portfolio';
import HowWeWork from './sections/HowWeWork';
import Testimonials from './sections/Testimonials';
import Team from './sections/Team';
import FAQ from './sections/FAQ';

const Home = () => {
  return (
    <main>
      <Hero />
      <Brands />
      <WhatWeDo />
      <Portfolio />
      <HowWeWork />
      <Testimonials />
      <Team />
      <FAQ />
    </main>
  );
};

export default Home;