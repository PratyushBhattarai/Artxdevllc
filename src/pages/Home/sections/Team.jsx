// src/pages/Home/sections/Team.jsx

import { Link } from 'react-router-dom';
import ankitImg from '../../../assets/team/ankit.jpg';
import prashantImg from '../../../assets/team/prashant.jpg';
import raybeenImg from '../../../assets/team/raybeen.jpg';
import pratyushImg from '../../../assets/team/pratyush.jpg';

// Add a photo with:  image: someImportedImage
// pos = object-position, keeps the face inside the square crop
const teamMembers = [
  { num: '01', name: 'Raybeen', title: 'CEO & Project Manager', desc: 'Sets the vision and keeps every project on track.', image: raybeenImg, pos: 'center 45%' },
  { num: '02', name: 'Prashant', title: 'Lead Developer', desc: 'Leads the engineering team and architects the core infrastructure.', image: prashantImg, pos: 'center 15%' },
  { num: '03', name: 'Ankit Jung Thapa', title: 'Developer', desc: 'Builds and ships features across our web projects.', image: ankitImg, pos: 'center 20%' },
  { num: '04', name: 'Pratyush Bhattarai', title: 'Developer', desc: 'Builds and ships features across our web projects.', image: pratyushImg, pos: 'center 30%' },
];

const TeamCard = ({ member, index }) => (
  <div data-reveal="zoom" style={{ '--d': `${(index % 4) * 0.1 + Math.floor(index / 4) * 0.12}s` }}>
    <article className="tm-card">

      {/* Number + status dot */}
      <div className="tm-card-top">
        <span className="tm-num">{member.num}</span>
        <span className="tm-status" aria-hidden="true" />
      </div>

      {/* Photo / silhouette */}
      <div className="tm-photo">
        {member.image ? (
          <img src={member.image} alt={member.name} className="tm-img" style={{ objectPosition: member.pos || 'center' }} />
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

      {/* Social circles + arrow */}
      <div className="tm-foot">
        <div className="tm-socials">
          {[0, 1, 2].map((i) => (
            <span key={i} className="tm-social" style={{ '--i': i }} />
          ))}
        </div>
        <span className="tm-arrow" aria-hidden="true">↗︎</span>
      </div>

    </article>
  </div>
);

const Team = () => {
  return (
    <div className="tm-outer">
      <section className="tm-section">
        <div className="tm-glow" aria-hidden="true" />

        <p className="ax-eyebrow" data-reveal="left">Team</p>

        {/* Header Row */}
        <div className="tm-header">
          <h2 className="tm-heading" data-reveal="up" style={{ '--d': '0.1s' }}>
            The people behind <span className="ax-shimmer">Artx Dev</span> success
          </h2>
          <div data-reveal="right">
            <Link to="/team" className="ax-link">
              Learn More <span className="ax-link-arrow ax-link-arrow--diag">↗︎</span>
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
          .tm-outer { background: #FFFFFF; padding: 0 0.15rem; }
          .tm-section {
            position: relative; background: #000000; padding: 5rem 5%;
            display: flex; flex-direction: column; overflow: hidden;
            border-top: 1px solid #C0C0C0; border-bottom: 1px solid #C0C0C0;
          }
          .tm-glow {
            position: absolute; top: 30%; left: 50%; width: 900px; height: 500px;
            transform: translateX(-50%); border-radius: 50%; pointer-events: none;
            background: radial-gradient(ellipse, rgba(0,163,255,0.08), transparent 65%);
            animation: tmBreath 8s ease-in-out infinite;
          }

          .tm-header {
            position: relative; display: flex; justify-content: space-between; align-items: center;
            gap: 1.5rem; width: 100%; margin-bottom: 3rem; flex-wrap: wrap;
          }
          .tm-heading {
            color: #FFFFFF; font-family: 'Hanuman', serif;
            font-size: 3rem; font-weight: 400; line-height: 1.2; margin: 0;
          }

          .tm-grid {
            position: relative; display: grid; grid-template-columns: repeat(4, 1fr);
            gap: 1.5rem; width: 100%;
          }

          /* Card */
          .tm-card {
            position: relative; overflow: hidden; height: 100%; box-sizing: border-box;
            display: flex; flex-direction: column; padding: 1rem; cursor: pointer;
            background: #121212; border: 1px solid #333333; border-radius: 16px;
            transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.4s ease, box-shadow 0.5s ease;
          }
          .tm-card::before {
            content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
            background: linear-gradient(90deg, transparent, #00A3FF, transparent);
            transform: translateX(-100%); transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
          }
          .tm-card:hover::before { transform: translateX(100%); }
          .tm-card:hover {
            transform: translateY(-8px); border-color: rgba(0,163,255,0.55);
            box-shadow: 0 26px 60px -28px rgba(0,163,255,0.6);
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
            filter: drop-shadow(0 0 14px rgba(0,163,255,0.4));
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
          .tm-socials { display: flex; gap: 6px; }
          .tm-social {
            width: 18px; height: 18px; border-radius: 50%; border: 1px solid #555555; box-sizing: border-box;
            transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) calc(var(--i) * 0.06s);
          }
          .tm-card:hover .tm-social { border-color: #00A3FF; background: rgba(0,163,255,0.15); transform: translateY(-3px); }
          .tm-social:hover { background: #00A3FF !important; box-shadow: 0 0 10px #00A3FF; }
          .tm-arrow {
            display: inline-block; color: #888888; font-size: 1.2rem;
            transition: transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.3s ease;
          }
          .tm-card:hover .tm-arrow { color: #FFFFFF; transform: rotate(45deg); }

          @keyframes tmBreath { 0%,100% { opacity: 0.6; } 50% { opacity: 1; } }
          @keyframes tmPulse {
            0%   { box-shadow: 0 0 0 0 rgba(0,163,255,0.7); }
            70%  { box-shadow: 0 0 0 7px rgba(0,163,255,0); }
            100% { box-shadow: 0 0 0 0 rgba(0,163,255,0); }
          }

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