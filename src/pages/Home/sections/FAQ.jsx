// src/pages/Home/sections/FAQ.jsx

import { useState } from 'react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  // ==========================================
  // 🔴 ADD YOUR QUESTIONS AND ANSWERS HERE 🔴
  // ==========================================
  const faqs = [
    { 
      question: 'What services does ARTX DEV offer?', 
      answer: 'We offer a wide range of digital services including Website Design, Web Development, Web Apps, Mobile Applications, Marketing, and AI Automation.' 
    },
    { 
      question: 'How long does a typical project take?', 
      answer: 'The timeline depends on the complexity of the project. A standard website might take 4-6 weeks, while a complex web app can take 3-6 months.' 
    },
    { 
      question: 'Do you provide support after the project is launched?', 
      answer: 'Yes! We provide ongoing support and maintenance packages to ensure your product stays fast, secure, and up-to-date.' 
    },
    { 
      question: 'What is your pricing model?', 
      answer: 'We usually work on a fixed-price model based on the project scope, or a monthly retainer for ongoing development and marketing services.' 
    },
    // Add more objects here like:
    // { question: 'Your new question?', answer: 'Your new answer.' },
  ];

  const toggleFAQ = (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <div style={{ backgroundColor: '#FFFFFF', padding: '0 0.15rem' }}>
      
      <section style={{ 
        backgroundColor: '#000000', 
        padding: '2rem 5% 5rem 5%', 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        
        <h2 style={{ 
          color: '#FFFFFF', 
          fontFamily: "'Inknut Antiqua', serif", 
          fontSize: '3.5rem', 
          fontWeight: '400', 
          marginBottom: '2rem',
          marginTop: 0,
          textAlign: 'center'
        }}>
          FAQ
        </h2>

        <div style={{ 
          width: '100%', 
          maxWidth: '1000px', // Increased width so the + goes further right
          display: 'flex',
          flexDirection: 'column'
        }}>
          
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              style={{ 
                borderBottom: '1px solid #C0C0C0',
                padding: '1.5rem 0',
                cursor: 'pointer'
              }}
              onClick={() => toggleFAQ(index)}
            >
              
              {/* Question Row */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                width: '100%'
              }}>
                
                {/* Question Text - Width 100% pushes the + to the right */}
                <h3 style={{ 
                  color: '#FFFFFF', 
                  fontFamily: "'Hind', sans-serif", 
                  fontSize: '1.2rem', 
                  fontWeight: '400',
                  margin: 0,
                  width: '100%', // <--- THIS PUSHES THE PLUS SIGN TO THE FAR RIGHT
                  paddingRight: '2rem' // Adds a little breathing room between text and +
                }}>
                  {faq.question}
                </h3>
                
                {/* Plus/Minus Icon */}
                <span style={{ 
                  color: '#FFFFFF', 
                  fontSize: '2rem', 
                  lineHeight: '1',
                  transform: openIndex === index ? 'rotate(45deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease',
                  flexShrink: 0 // Prevents the + from shrinking
                }}>
                  +
                </span>
              </div>

              {/* Answer Row */}
              <div style={{ 
                maxHeight: openIndex === index ? '200px' : '0',
                overflow: 'hidden',
                transition: 'max-height 0.3s ease'
              }}>
                <p style={{ 
                  color: '#888888', 
                  fontFamily: "'Hind', sans-serif", 
                  fontSize: '1rem', 
                  lineHeight: '1.6',
                  marginTop: '1rem',
                  marginBottom: '0.5rem'
                }}>
                  {faq.answer}
                </p>
              </div>

            </div>
          ))}

        </div>

      </section>
    </div>
  );
};

export default FAQ;