// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Pages
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Services from './pages/Services/Services';
import PortfolioPage from './pages/Portfolio/Portfolio';
import Contact from './pages/Contact/Contact';
import Team from './pages/Team/Team';
import BookMeeting from './pages/BookMeeting/BookMeeting';

// New Legal Pages
import Privacy from './pages/Privacy/Privacy';
import Terms from './pages/Terms/Terms';
import SMS from './pages/SMS/SMS';

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
        
        {/* Legal Routes */}
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/sms" element={<SMS />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;