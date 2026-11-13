// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Services from './pages/Services/Services';
import PortfolioPage from './pages/Portfolio/Portfolio';
import Contact from './pages/Contact/Contact';
import Team from './pages/Team/Team';
import BookMeeting from './pages/BookMeeting/BookMeeting';
import ScrollToTop from './components/ScrollToTop'; 

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/team" element={<Team />} />
        <Route path="/book-meeting" element={<BookMeeting />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;