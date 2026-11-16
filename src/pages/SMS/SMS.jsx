// src/pages/SMS/SMS.jsx

const SMS = () => {
  return (
    <main style={{ backgroundColor: '#FFFFFF', padding: '0 0.15rem' }}>
      <section style={{ backgroundColor: '#000000', padding: '6rem 5%', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', width: '100%' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h1 style={{ color: '#FFFFFF', fontFamily: "'Inknut Antiqua', serif", fontSize: '3.5rem', fontWeight: '400', marginBottom: '1rem' }}>
              SMS Terms & Conditions
            </h1>
            <div style={{ width: '60px', height: '2px', backgroundColor: '#FFFFFF', margin: '0 auto 1.5rem' }}></div>
            <p style={{ color: '#A1A1AA', fontFamily: "'Hind', sans-serif", fontSize: '1.1rem' }}>
              Information about how we use SMS communications
            </p>
          </div>

          <div style={{ color: '#D1D5DB', fontFamily: "'Hind', sans-serif", lineHeight: '1.8' }}>
            
            <p style={{ color: '#888', fontSize: '0.9rem', borderBottom: '1px solid #333', paddingBottom: '1rem', marginBottom: '3rem' }}>
              Last Updated: November 16, 2026
            </p>

            {/* Highlight Box */}
            <div style={{ backgroundColor: '#1A1A1A', borderLeft: '3px solid #FFFFFF', padding: '1.5rem', marginBottom: '3rem', borderRadius: '8px' }}>
              <p style={{ margin: 0, color: '#FFFFFF' }}>
                <strong>Quick Summary:</strong> By opting in to receive SMS messages from ArtxDev, you consent to receive text messages including project updates, appointment reminders, and promotional offers. Message and data rates may apply. You can opt out at any time by texting STOP.
              </p>
            </div>

            <h2 style={styles.h2}>1. Overview</h2>
            <p style={styles.p}>This SMS/Text Messaging Policy explains how ArtxDev uses text messaging to communicate with our clients and users.</p>

            <h2 style={styles.h2}>2. Consent to Receive Messages</h2>
            <h3 style={styles.h3}>2.1 Opt-In Requirement</h3>
            <p style={styles.p}>By providing your mobile phone number and opting in to receive SMS messages from ArtxDev, you expressly consent to receive text messages from us.</p>
            <h3 style={styles.h3}>2.2 How to Opt In</h3>
            <ul style={styles.ul}>
              <li>Checking the SMS opt-in box on our contact forms</li>
              <li>Texting a keyword to our designated number</li>
              <li>Verbally consenting during phone conversations</li>
              <li>Providing consent through our client portal</li>
            </ul>

            <h2 style={styles.h2}>3. Types of Messages</h2>
            <h3 style={styles.h3}>3.1 Transactional Messages</h3>
            <ul style={styles.ul}>
              <li><strong>Project Updates:</strong> Status updates on your web development project</li>
              <li><strong>Appointment Reminders:</strong> Reminders for scheduled meetings and consultations</li>
              <li><strong>Payment Notifications:</strong> Invoice reminders and payment confirmations</li>
              <li><strong>Delivery Notifications:</strong> Alerts when project deliverables are ready</li>
            </ul>
            <h3 style={styles.h3}>3.2 Marketing Messages</h3>
            <ul style={styles.ul}>
              <li><strong>Promotional Offers:</strong> Special discounts and service promotions</li>
              <li><strong>New Services:</strong> Information about new offerings</li>
              <li><strong>Tips and Resources:</strong> Helpful web development tips</li>
            </ul>

            <h2 style={styles.h2}>4. Message Frequency</h2>
            <ul style={styles.ul}>
              <li><strong>Transactional Messages:</strong> Sent as needed (approx. 2-8 messages/month)</li>
              <li><strong>Marketing Messages:</strong> Up to 4 promotional messages per month</li>
            </ul>

            <h2 style={styles.h2}>5. Standard Message and Data Rates</h2>
            <div style={{ backgroundColor: '#1A1A1A', borderLeft: '3px solid #FFFFFF', padding: '1.5rem', marginBottom: '2rem', borderRadius: '8px' }}>
              <p style={{ margin: 0, color: '#FFFFFF' }}>
                <strong>Important:</strong> Message and data rates may apply. Standard messaging rates from your mobile carrier will apply to all messages sent and received.
              </p>
            </div>

            <h2 style={styles.h2}>6. Opting Out (STOP)</h2>
            <p style={styles.p}>You can opt out of receiving SMS messages at any time by:</p>
            <ul style={styles.ul}>
              <li><strong>Texting "STOP":</strong> Reply STOP to any message to unsubscribe immediately</li>
              <li><strong>Alternative Keywords:</strong> STOP, UNSUBSCRIBE, CANCEL, END, or QUIT</li>
              <li><strong>Contact Us:</strong> Email raybeen@artxdevllc.com or call (334) 218-4725</li>
            </ul>
            <p style={styles.p}>After opting out, you will receive one final confirmation message confirming your unsubscription.</p>

            <h2 style={styles.h2}>7. Getting Help (HELP)</h2>
            <p style={styles.p}>For assistance with SMS messages, text <strong>HELP</strong> to our number or contact us:</p>
            <ul style={styles.ul}>
              <li><strong>Email:</strong> raybeen@artxdevllc.com</li>
              <li><strong>Phone:</strong> (334) 218-4725</li>
            </ul>

            <h2 style={styles.h2}>8. Privacy and Data Protection</h2>
            <p style={styles.p}>When you opt in to SMS, we collect your mobile phone number, opt-in date and time, and message history. We do NOT sell or rent your mobile number to third parties for their marketing purposes.</p>

            <h2 style={styles.h2}>9. Compliance</h2>
            <p style={styles.p}>We comply with the Telephone Consumer Protection Act (TCPA) and all applicable federal and state laws regarding SMS communications.</p>

            <h2 style={styles.h2}>10. Contact Information</h2>
            <p style={styles.p}>For questions, concerns, or requests regarding this SMS Policy, contact us:</p>
            <ul style={styles.ul}>
              <li><strong>Email:</strong> raybeen@artxdevllc.com</li>
              <li><strong>Phone:</strong> (334) 218-4725</li>
              <li><strong>Text:</strong> Reply HELP to any message</li>
              <li><strong>Mail:</strong> ArtxDev, 1650 Ole Country Rd. Deatsville, AL 36022</li>
            </ul>

          </div>
        </div>
      </section>
    </main>
  );
};

const styles = {
  h2: { color: '#FFFFFF', fontFamily: "'Hanuman', serif", fontSize: '1.8rem', marginTop: '3rem', marginBottom: '1rem' },
  h3: { color: '#FFFFFF', fontFamily: "'Hind', sans-serif", fontSize: '1.2rem', fontWeight: '600', marginTop: '2rem', marginBottom: '1rem' },
  p: { marginBottom: '1.2rem' },
  ul: { paddingLeft: '1.5rem', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }
};

export default SMS;