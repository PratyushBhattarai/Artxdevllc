// src/pages/Team/Team.jsx

import TeamHero from './sections/TeamHero';
import Developers from './sections/Developers';
import Sales from './sections/Sales';
import SEO from './sections/SEO';
import Culture from './sections/Culture';

const Team = () => {
  return (
    <main style={{ backgroundColor: '#FFFFFF' }}>
      <TeamHero />
      <Developers />
      <Sales />
      <SEO />
      <Culture />
    </main>
  );
};

export default Team;