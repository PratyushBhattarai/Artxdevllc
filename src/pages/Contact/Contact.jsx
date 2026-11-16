// src/pages/Contact/Contact.jsx

import PageEffects from '../../components/PageEffects';
import ContactHero from './sections/ContactHero';
import ContactForm from './sections/ContactForm';

const Contact = () => {
  return (
    <main style={{ backgroundColor: '#FFFFFF' }}>
      <PageEffects />
      <ContactHero />
      <ContactForm />
    </main>
  );
};

export default Contact;