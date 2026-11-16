// src/pages/Terms/Terms.jsx

const Terms = () => {
  return (
    <main style={{ backgroundColor: '#FFFFFF', padding: '0 0.15rem' }}>
      <section style={{ backgroundColor: '#000000', padding: '6rem 5%', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', width: '100%' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h1 style={{ color: '#FFFFFF', fontFamily: "'Inknut Antiqua', serif", fontSize: '3.5rem', fontWeight: '400', marginBottom: '1rem' }}>
              Terms & Conditions
            </h1>
            <div style={{ width: '60px', height: '2px', backgroundColor: '#FFFFFF', margin: '0 auto 1.5rem' }}></div>
            <p style={{ color: '#A1A1AA', fontFamily: "'Hind', sans-serif", fontSize: '1.1rem' }}>
              Please read these terms carefully before using our services
            </p>
          </div>

          <div style={{ color: '#D1D5DB', fontFamily: "'Hind', sans-serif", lineHeight: '1.8' }}>
            
            <p style={{ color: '#888', fontSize: '0.9rem', borderBottom: '1px solid #333', paddingBottom: '1rem', marginBottom: '3rem' }}>
              Last Updated: November 16, 2026
            </p>

            <h2 style={styles.h2}>1. Agreement to Terms</h2>
            <p style={styles.p}>By accessing or using ArtxDev's services, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.</p>

            <h2 style={styles.h2}>2. Services</h2>
            <p style={styles.p}>ArtxDev provides professional web development services, including but not limited to:</p>
            <ul style={styles.ul}>
              <li>Custom website design and development</li>
              <li>E-commerce platform development</li>
              <li>Web application development</li>
              <li>Website maintenance and support</li>
              <li>SEO optimization services</li>
            </ul>

            <h3 style={styles.h3}>2.1 Service Scope</h3>
            <p style={styles.p}>The specific scope of services will be outlined in a separate Statement of Work (SOW) or project proposal.</p>

            <h3 style={styles.h3}>2.2 Revisions</h3>
            <p style={styles.p}>Each project includes a specified number of revision rounds as outlined in the project agreement. Additional revisions may be subject to additional fees.</p>

            <h2 style={styles.h2}>3. Pricing and Payment</h2>
            <p style={styles.p}>Pricing for our services is clearly stated on our website and in project proposals.</p>
            <ul style={styles.ul}>
              <li><strong>Deposit:</strong> A 50% deposit is required before work begins on any project</li>
              <li><strong>Final Payment:</strong> The remaining 50% is due upon project completion and before final delivery</li>
              <li><strong>Payment Methods:</strong> We accept major credit cards, bank transfers, and other methods as specified in the invoice</li>
              <li><strong>Late Payments:</strong> Late payments may be subject to a 1.5% monthly interest charge</li>
            </ul>

            <h2 style={styles.h2}>4. Intellectual Property Rights</h2>
            <h3 style={styles.h3}>4.1 Client Ownership</h3>
            <p style={styles.p}>Upon full payment, the client owns the final deliverables, including website design, code, and content created specifically for the project.</p>
            <h3 style={styles.h3}>4.2 ArtxDev Rights</h3>
            <p style={styles.p}>ArtxDev retains the right to:</p>
            <ul style={styles.ul}>
              <li>Use the project in our portfolio and marketing materials</li>
              <li>Reuse general code, frameworks, and methodologies developed during the project</li>
              <li>Reference the client relationship in business development activities</li>
            </ul>

            <h2 style={styles.h2}>5. Client Responsibilities</h2>
            <p style={styles.p}>The client agrees to:</p>
            <ul style={styles.ul}>
              <li>Provide timely feedback and approvals to avoid project delays</li>
              <li>Supply necessary content, images, and materials for the project</li>
              <li>Ensure all provided materials do not infringe on third-party rights</li>
              <li>Maintain hosting and domain services if applicable</li>
            </ul>

            <h2 style={styles.h2}>6. Project Timeline</h2>
            <p style={styles.p}>Project timelines are estimates based on prompt client feedback and material provision. Delays caused by client actions may result in adjusted delivery dates.</p>

            <h2 style={styles.h2}>7. Warranties and Disclaimers</h2>
            <p style={styles.p}>We warrant that our services will be performed with professional workmanship. For a period of 30 days after project delivery, we will fix any defects in our work at no additional charge.</p>
            <p style={styles.p}>EXCEPT AS EXPRESSLY PROVIDED IN THESE TERMS, ALL SERVICES ARE PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND.</p>

            <h2 style={styles.h2}>8. Limitation of Liability</h2>
            <p style={styles.p}>TO THE MAXIMUM EXTENT PERMITTED BY LAW, ARTXDEV SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES.</p>

            <h2 style={styles.h2}>9. Confidentiality</h2>
            <p style={styles.p}>Both parties agree to maintain confidentiality of sensitive information shared during the project. This obligation survives the termination of the agreement.</p>

            <h2 style={styles.h2}>10. Termination</h2>
            <p style={styles.p}>Clients may terminate a project with written notice. We reserve the right to terminate services if the client fails to make payments or violates these terms.</p>

            <h2 style={styles.h2}>11. Changes to Terms</h2>
            <p style={styles.p}>We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting to our website.</p>

            <h2 style={styles.h2}>12. Governing Law</h2>
            <p style={styles.p}>These Terms and Conditions shall be governed by and construed in accordance with the laws of Alabama, United States.</p>

            <h2 style={styles.h2}>13. Contact Information</h2>
            <p style={styles.p}>For questions about these Terms and Conditions, please contact us:</p>
            <ul style={styles.ul}>
              <li><strong>Email:</strong> raybeen@artxdevllc.com</li>
              <li><strong>Phone:</strong> (334) 218-4725</li>
              <li><strong>Address:</strong> 1650 Ole Country Rd. Deatsville, AL 36022</li>
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

export default Terms;