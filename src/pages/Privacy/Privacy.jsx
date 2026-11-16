// src/pages/Privacy/Privacy.jsx

const Privacy = () => {
  return (
    <main style={{ backgroundColor: '#FFFFFF', padding: '0 0.15rem' }}>
      <section style={{ 
        backgroundColor: '#000000', 
        padding: '6rem 5%', 
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', width: '100%' }}>
          
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h1 style={{ color: '#FFFFFF', fontFamily: "'Inknut Antiqua', serif", fontSize: '3.5rem', fontWeight: '400', marginBottom: '1rem' }}>
              Privacy Policy
            </h1>
            <div style={{ width: '60px', height: '2px', backgroundColor: '#FFFFFF', margin: '0 auto 1.5rem' }}></div>
            <p style={{ color: '#A1A1AA', fontFamily: "'Hind', sans-serif", fontSize: '1.1rem' }}>
              How we collect, use, and protect your information
            </p>
          </div>

          {/* Content */}
          <div style={{ color: '#D1D5DB', fontFamily: "'Hind', sans-serif", lineHeight: '1.8' }}>
            
            <p style={{ color: '#888', fontSize: '0.9rem', borderBottom: '1px solid #333', paddingBottom: '1rem', marginBottom: '3rem' }}>
              Last Updated: November 16, 2026
            </p>

            <h2 style={styles.h2}>1. Introduction</h2>
            <p style={styles.p}>At ArtxDev ("we," "us," or "our"), we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.</p>
            <p style={styles.p}>By using our website and services, you consent to the data practices described in this policy.</p>

            <h2 style={styles.h2}>2. Information We Collect</h2>
            <h3 style={styles.h3}>2.1 Personal Information</h3>
            <p style={styles.p}>We may collect the following personal information from you:</p>
            <ul style={styles.ul}>
              <li><strong>Contact Information:</strong> Name, email address, phone number, mailing address</li>
              <li><strong>Business Information:</strong> Company name, website URL, project requirements</li>
              <li><strong>Payment Information:</strong> Billing address, payment method details (processed securely through third-party payment processors)</li>
              <li><strong>Communication Data:</strong> Information from your messages, inquiries, and support requests</li>
            </ul>

            <h3 style={styles.h3}>2.2 Automatically Collected Information</h3>
            <p style={styles.p}>When you visit our website, we automatically collect certain information:</p>
            <ul style={styles.ul}>
              <li><strong>Device Information:</strong> IP address, browser type, operating system, device identifiers</li>
              <li><strong>Usage Data:</strong> Pages visited, time spent on pages, links clicked, referring website</li>
              <li><strong>Cookies and Tracking Technologies:</strong> Data collected through cookies, web beacons, and similar technologies</li>
              <li><strong>Location Data:</strong> General geographic location based on IP address</li>
            </ul>

            <h2 style={styles.h2}>3. How We Use Your Information</h2>
            <p style={styles.p}>We use your information for the following purposes:</p>
            <ul style={styles.ul}>
              <li><strong>Service Delivery:</strong> To provide, maintain, and improve our web development services</li>
              <li><strong>Communication:</strong> To respond to inquiries, send project updates, and provide customer support</li>
              <li><strong>Billing and Payments:</strong> To process transactions and send invoices</li>
              <li><strong>Marketing:</strong> To send promotional materials and newsletters (with your consent)</li>
              <li><strong>Website Improvement:</strong> To analyze usage patterns and enhance user experience</li>
              <li><strong>Legal Compliance:</strong> To comply with legal obligations and enforce our terms</li>
              <li><strong>Security:</strong> To detect, prevent, and address fraud and security issues</li>
            </ul>

            <h2 style={styles.h2}>4. Cookies and Tracking Technologies</h2>
            <h3 style={styles.h3}>4.1 What Are Cookies?</h3>
            <p style={styles.p}>Cookies are small data files placed on your device. We use cookies to improve your browsing experience and analyze website traffic.</p>
            <h3 style={styles.h3}>4.2 Types of Cookies We Use</h3>
            <ul style={styles.ul}>
              <li><strong>Essential Cookies:</strong> Necessary for website functionality</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our website</li>
              <li><strong>Marketing Cookies:</strong> Track effectiveness of marketing campaigns</li>
              <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
            </ul>
            <h3 style={styles.h3}>4.3 Managing Cookies</h3>
            <p style={styles.p}>You can control cookies through your browser settings. Note that disabling cookies may affect website functionality.</p>

            <h2 style={styles.h2}>5. How We Share Your Information</h2>
            <p style={styles.p}>We do not sell your personal information. We may share your information with:</p>
            <h3 style={styles.h3}>5.1 Service Providers</h3>
            <ul style={styles.ul}>
              <li>Payment processing</li>
              <li>Email delivery and marketing automation</li>
              <li>Website hosting and analytics</li>
              <li>Customer relationship management (CRM)</li>
              <li>Cloud storage and backup services</li>
            </ul>
            <h3 style={styles.h3}>5.2 Legal Requirements</h3>
            <p style={styles.p}>We may disclose your information if required by law or in good faith belief such action is necessary to:</p>
            <ul style={styles.ul}>
              <li>Comply with legal obligations or court orders</li>
              <li>Protect and defend our rights or property</li>
              <li>Prevent fraud or security threats</li>
              <li>Protect the safety of users or the public</li>
            </ul>
            <h3 style={styles.h3}>5.3 Business Transfers</h3>
            <p style={styles.p}>If we are involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.</p>

            <h2 style={styles.h2}>6. Data Security</h2>
            <p style={styles.p}>We implement reasonable security measures to protect your personal information:</p>
            <ul style={styles.ul}>
              <li>Encryption of sensitive data in transit and at rest</li>
              <li>Regular security assessments and updates</li>
              <li>Access controls and authentication requirements</li>
              <li>Secure backup and disaster recovery procedures</li>
              <li>Employee training on data privacy and security</li>
            </ul>
            <p style={styles.p}><strong>Important:</strong> No method of transmission over the internet is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.</p>

            <h2 style={styles.h2}>7. Data Retention</h2>
            <p style={styles.p}>We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy.</p>
            <ul style={styles.ul}>
              <li><strong>Active Projects:</strong> Duration of project plus 3 years</li>
              <li><strong>Financial Records:</strong> 7 years for tax and legal compliance</li>
              <li><strong>Marketing Data:</strong> Until you unsubscribe or request deletion</li>
              <li><strong>Website Analytics:</strong> Typically 2-3 years</li>
            </ul>

            <h2 style={styles.h2}>8. Your Rights and Choices</h2>
            <p style={styles.p}>Depending on your location, you may have the following rights:</p>
            <h3 style={styles.h3}>8.1 Access and Portability</h3>
            <p style={styles.p}>You have the right to request access to your personal information and receive a copy in a portable format.</p>
            <h3 style={styles.h3}>8.2 Correction</h3>
            <p style={styles.p}>You can request correction of inaccurate or incomplete personal information.</p>
            <h3 style={styles.h3}>8.3 Deletion</h3>
            <p style={styles.p}>You can request deletion of your personal information, subject to legal retention requirements.</p>
            <h3 style={styles.h3}>8.4 Opt-Out</h3>
            <p style={styles.p}>You can opt out of marketing communications at any time by:</p>
            <ul style={styles.ul}>
              <li>Clicking "unsubscribe" in our emails</li>
              <li>Contacting us directly</li>
              <li>Updating your preferences in your account settings</li>
            </ul>

            <h2 style={styles.h2}>9. Third-Party Links</h2>
            <p style={styles.p}>Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies.</p>

            <h2 style={styles.h2}>10. Children's Privacy</h2>
            <p style={styles.p}>Our services are not directed to individuals under 18 years of age. We do not knowingly collect personal information from children.</p>

            <h2 style={styles.h2}>11. International Data Transfers</h2>
            <p style={styles.p}>Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place to protect your data.</p>

            <h2 style={styles.h2}>12. California Privacy Rights (CCPA)</h2>
            <p style={styles.p}>If you are a California resident, you have additional rights under the CCPA:</p>
            <ul style={styles.ul}>
              <li>Right to know what personal information is collected</li>
              <li>Right to know whether personal information is sold or disclosed</li>
              <li>Right to opt-out of the sale of personal information</li>
              <li>Right to deletion of personal information</li>
              <li>Right to non-discrimination for exercising CCPA rights</li>
            </ul>

            <h2 style={styles.h2}>13. GDPR Compliance (European Users)</h2>
            <p style={styles.p}>If you are in the EEA, you have rights under the GDPR:</p>
            <ul style={styles.ul}>
              <li>Legal basis for processing your data</li>
              <li>Right to object to processing</li>
              <li>Right to restrict processing</li>
              <li>Right to lodge a complaint with a supervisory authority</li>
            </ul>

            <h2 style={styles.h2}>14. Changes to This Privacy Policy</h2>
            <p style={styles.p}>We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on this page.</p>

            <h2 style={styles.h2}>15. Contact Us</h2>
            <p style={styles.p}>If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:</p>
            <ul style={styles.ul}>
              <li><strong>Email:</strong> raybeen@artxdevllc.com</li>
              <li><strong>Phone:</strong> (334) 218-4725</li>
              <li><strong>Mail:</strong> ArtxDev, 1650 Ole Country Rd. Deatsville, AL 36022</li>
            </ul>
            <p style={styles.p}>We will respond to your inquiry within 30 days.</p>

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

export default Privacy;