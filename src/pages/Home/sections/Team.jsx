// src/pages/Home/sections/Team.jsx

import { useState } from 'react';
import { Link } from 'react-router-dom';
import ankitImg from '../../../assets/team/ankit.jpg';
import prashantImg from '../../../assets/team/prashant.jpg';
import raybeenImg from '../../../assets/team/raybeen.jpg';
import pratyushImg from '../../../assets/team/pratyush.jpg';
import sumeetImg from '../../../assets/team/sumeet.jpeg';
import SubashRayImg from '../../../assets/team/Subash.jpeg';
import Arrow from '../../../components/Arrow';

// Add a photo with:  image: someImportedImage
// pos = object-position, keeps the face inside the square crop
// Contact buttons (all optional – leave out any you don't want):
//   phone: '+977…'   email: 'name@…'   linkedin: 'https://www.linkedin.com/in/…'
const teamMembers = [
  { num: '01', name: 'Raybeen', title: 'CEO & Project Manager', desc: 'Sets the vision and keeps every project on track.', image: raybeenImg, pos: 'center 45%',
    phone: '+9779714511587', email: 'raybeen@artxdevllc.com', linkedin: 'https://www.linkedin.com/in/rabin-lamichhane-05b789257/' },
  { num: '02', name: 'Prashant', title: 'Lead Developer', desc: 'Leads the engineering team and architects the core infrastructure.', image: prashantImg, pos: 'center 15%' },
  { num: '03', name: 'Ankit Jung Thapa', title: 'Developer', desc: 'Builds and ships features across our web projects.', image: ankitImg, pos: 'center 20%',
    phone: '+9779828772477', email: 'ankithapa321@gmail.com' },
  { num: '04', name: 'Pratyush Bhattarai', title: 'Developer', desc: 'Builds and ships features across our web projects.', image: pratyushImg, pos: 'center 30%',
    phone: '+9779823325453', email: 'pbhattrai140@gmail.com' },
  { num: '05', name: 'Sumeet', title: 'Developer', desc: 'Builds and ships features across our web projects.', image: sumeetImg, pos: 'center 40%' },
  { num: '06', name: 'Subash Ray', title: 'SEO Specialist', desc: 'Optimizes our web projects for search engines and user experience.', image: SubashRayImg, pos: 'center 40%',
   
  }

  
];

const ICONS = {
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />,
  email: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></>,
  linkedin: <><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 11v6M8 7.5v.01M12 17v-6M12 13.5a2.5 2.5 0 0 1 5 0V17" /></>,
};

// Subject line that is filled in automatically when a visitor clicks the email button
const EMAIL_SUBJECT = 'Project inquiry from the ARTX website';

// mailto: link (phones open their mail app with the address + subject filled in)
const mailtoLink = (email) => `mailto:${email}?subject=${encodeURIComponent(EMAIL_SUBJECT)}`;
// Gmail "new message" in the browser (computers often have no mail app set up)
const gmailLink = (email) =>
  `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent(EMAIL_SUBJECT)}`;

// On a computer, open Gmail compose in a new tab; on phones let mailto: open the mail app
const openEmail = (e, email) => {
  e.stopPropagation();
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    e.preventDefault();
    window.open(gmailLink(email), '_blank', 'noopener,noreferrer');
  }
};

// Phone / email / LinkedIn buttons – only the ones a member has are shown
const contactLinks = (m) => [
  m.phone && { key: 'phone', href: `tel:${m.phone}`, label: `Call ${m.name}` },
  m.email && { key: 'email', href: mailtoLink(m.email), label: `Email ${m.name}`, email: m.email },
  m.linkedin && { key: 'linkedin', href: m.linkedin, label: `${m.name} on LinkedIn`, external: true },
].filter(Boolean);

const TeamCard = ({ member, index }) => {
  const links = contactLinks(member);
  // tap / click the card to show the photo in colour (phones have no hover)
  const [color, setColor] = useState(false);
  return (
  <div data-reveal="zoom" style={{ '--d': `${(index % 4) * 0.1 + Math.floor(index / 4) * 0.12}s` }}>
    <article className={`tm-card${color ? ' is-color' : ''}`} onClick={() => setColor((c) => !c)}>

      {/* Number + status dot */}
      <div className="tm-card-top">
        <span className="tm-num">{member.num}</span>
        <span className="tm-status" aria-hidden="true" />
      </div>

      {/* Photo / silhouette */}
      <div className="tm-photo" onContextMenu={(e) => e.preventDefault()}>
        {member.image ? (
          <img src={member.image} alt={member.name} className="tm-img" draggable={false} style={{ objectPosition: member.pos || 'center' }} />
        ) : (
          <div className="tm-silhouette" aria-hidden="true">
            <span className="tm-head" />
            <span className="tm-body" />
          </div>
        )}
      </div>

      {/* Member Info */}
      <div className="tm-info">
        <h3 className="tm-name">{member.name}</h3>
        <p className="tm-title-text">{member.title}</p>
        <p className="tm-desc">{member.desc}</p>
      </div>

      {/* Contact buttons */}
      {links.length > 0 && (
        <div className="tm-foot">
          <div className="tm-socials">
            {links.map((l, i) => (
              <a
                key={l.key}
                href={l.href}
                className="tm-social"
                style={{ '--i': i }}
                aria-label={l.label}
                title={l.label}
                onClick={(e) => (l.email ? openEmail(e, l.email) : e.stopPropagation())}
                {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">{ICONS[l.key]}</svg>
              </a>
            ))}
          </div>
        </div>
      )}

    </article>
  </div>
);
};

const Team = () => {
  return (
    <div className="tm-outer">
      <section className="tm-section">
        <div className="tm-glow" aria-hidden="true" />

        <p className="ax-eyebrow" data-reveal="left">Team</p>

        {/* Header Row */}
        <div className="tm-header">
          <h2 className="tm-heading" data-reveal="up" style={{ '--d': '0.1s' }}>
            The people behind <span className="ax-shimmer--ink">Artx Dev</span> success
          </h2>
          <div data-reveal="right">
            <Link to="/team" className="ax-link ax-link--ink">
              Learn More <span className="ax-link-arrow ax-link-arrow--diag"><Arrow dir="up-right" /></span>
            </Link>
          </div>
        </div>

        {/* Team Grid (4 Columns) */}
        <div className="tm-grid">
          {teamMembers.map((member, index) => (
            <TeamCard key={index} member={member} index={index} />
          ))}
        </div>

        <style>{`
          .tm-outer { background: #FFFFFF; padding: 0; }
          .tm-section {
            position: relative; background: #FFFFFF; padding: 5rem 5%;
            display: flex; flex-direction: column; overflow: hidden;
          }
          .tm-glow {
            position: absolute; top: 30%; left: 50%; width: 900px; height: 500px;
            transform: translateX(-50%); border-radius: 50%; pointer-events: none;
            background: radial-gradient(ellipse, rgba(0,0,0,0.03), transparent 65%);
            animation: tmBreath 8s ease-in-out infinite;
          }

          .tm-header {
            position: relative; display: flex; justify-content: space-between; align-items: center;
            gap: 1.5rem; width: 100%; margin-bottom: 3rem; flex-wrap: wrap;
          }
          .tm-heading {
            color: #0A0A0A; font-family: 'Hanuman', serif;
            font-size: 3rem; font-weight: 400; line-height: 1.2; margin: 0;
          }

          .tm-grid {
            position: relative; display: grid; grid-template-columns: repeat(5, 1fr);
            gap: 1.5rem; width: 100%;
          }

          /* Card */
          .tm-card {
            position: relative; overflow: hidden; height: 100%; box-sizing: border-box;
            display: flex; flex-direction: column; padding: 1rem; cursor: pointer;
            background: #0A0A0A; border: 1px solid #0A0A0A; border-radius: 16px;
            box-shadow: 0 18px 40px -26px rgba(0,0,0,0.55);
            transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.4s ease, box-shadow 0.5s ease;
          }
          .tm-card::before {
            content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
            transform: translateX(-100%); transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
          }
          .tm-card:hover::before { transform: translateX(100%); }
          .tm-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 26px 50px -24px rgba(0,0,0,0.6);
          }

          .tm-card-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; }
          .tm-num { color: #666666; font-family: 'Gowun Dodum', sans-serif; font-size: 0.8rem; transition: color 0.3s ease; }
          .tm-card:hover .tm-num { color: #00A3FF; }
          .tm-status { width: 6px; height: 6px; border-radius: 50%; background: #333333; transition: background 0.3s ease; }
          .tm-card:hover .tm-status { background: #00A3FF; animation: tmPulse 1.6s infinite; }

          /* Photo */
          .tm-photo {
            position: relative; width: 100%; aspect-ratio: 1 / 1; overflow: hidden;
            background: #333333; border-radius: 12px; margin-bottom: 1.5rem;
            display: flex; align-items: flex-end; justify-content: center;
          }
          /* team photos can't be right-clicked, dragged or long-pressed to save */
          .tm-photo { -webkit-touch-callout: none; -webkit-user-select: none; user-select: none; }
          .tm-card { -webkit-tap-highlight-color: transparent; }
          .tm-card.is-color .tm-img { filter: grayscale(0); }
          .tm-img { pointer-events: none; -webkit-user-drag: none; -webkit-touch-callout: none; }
          .tm-img {
            width: 100%; height: 100%; object-fit: cover;
            filter: grayscale(1) contrast(1.05);
            transition: filter 0.6s ease, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
          }
          .tm-card:hover .tm-img { filter: grayscale(0); transform: scale(1.06); }

          .tm-silhouette {
            position: relative; width: 80%; height: 90%;
            transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1), filter 0.5s ease;
          }
          .tm-head {
            position: absolute; top: 6%; left: 50%; width: 42%; aspect-ratio: 1 / 1;
            transform: translateX(-50%); border-radius: 50%; background: #555555;
          }
          .tm-body {
            position: absolute; bottom: 0; left: 0; width: 100%; height: 45%;
            background: #555555; border-top-left-radius: 50px; border-top-right-radius: 50px;
          }
          .tm-card:hover .tm-silhouette {
            transform: scale(1.05) translateY(-2px);
            filter: none;
          }

          /* Info */
          .tm-info { position: relative; margin-bottom: 1.5rem; border-bottom: 1px solid #333333; padding-bottom: 1rem; }
          .tm-info::after {
            content: ''; position: absolute; left: 0; bottom: -1px; width: 100%; height: 1px;
            background: #00A3FF; transform: scaleX(0); transform-origin: left;
            transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
          }
          .tm-card:hover .tm-info::after { transform: scaleX(1); }
          .tm-name { color: #FFFFFF; font-family: 'Hind', sans-serif; font-size: 1rem; font-weight: 600; margin: 0 0 0.2rem; }
          .tm-title-text { color: #666666; font-family: 'Hind', sans-serif; font-size: 0.8rem; margin: 0 0 1rem; transition: color 0.3s ease; }
          .tm-card:hover .tm-title-text { color: #00A3FF; }
          .tm-desc { color: #888888; font-family: 'Hind', sans-serif; font-size: 0.85rem; margin: 0; }

          /* Footer */
          .tm-foot { display: flex; justify-content: space-between; align-items: center; }
          .tm-socials { display: flex; gap: 8px; }
          .tm-social {
            width: 34px; height: 34px; border-radius: 50%; border: 1px solid #444444; box-sizing: border-box;
            display: grid; place-items: center; color: #CFCFCF; text-decoration: none;
            transition: background 0.3s ease, color 0.3s ease, border-color 0.3s ease, transform 0.3s ease;
          }
          .tm-social svg { width: 15px; height: 15px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
          .tm-card:hover .tm-social { border-color: #777777; }
          .tm-social:hover { background: #FFFFFF; color: #000000; border-color: #FFFFFF; transform: translateY(-2px); }

          @keyframes tmBreath { 0%,100% { opacity: 0.6; } 50% { opacity: 1; } }
          @keyframes tmPulse {
            0%   { box-shadow: 0 0 0 0 rgba(0,163,255,0.7); }
            70%  { box-shadow: 0 0 0 7px rgba(0,163,255,0); }
            100% { box-shadow: 0 0 0 0 rgba(0,163,255,0); }
          }

          /* 5 per row on large screens, 3 on laptops, 2 on tablets */
          @media (max-width: 1280px) { .tm-grid { grid-template-columns: repeat(3, 1fr); } }
          @media (max-width: 1024px) { .tm-grid { grid-template-columns: repeat(2, 1fr); } }
          @media (max-width: 560px) {
            .tm-grid { grid-template-columns: 1fr; }
            .tm-heading { font-size: 2.2rem; }
          }
        `}</style>
      </section>
    </div>
  );
};

export default Team;