import BottomNav from '@/components/common/BottomNav';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import akashPhoto from '@/logo/Akash.jpeg';
import OpenGenBrandMark from '@/logo/OpenGenBrandMark';
import raviPhoto from '@/logo/Ravi Raj.jpeg';

const TeamPage = () => {
  useDocumentTitle('Team');

  return (
    <div className="landing-page">
      <section className="hero hero--compact">
        <div className="hero__topbar">
          <OpenGenBrandMark />
        </div>
        <div className="section-heading">
          <span className="section-tag">Team</span>
          <h2>Small team, senior-level ownership.</h2>
          <p>Direct communication, practical timelines, and quality-first execution.</p>
        </div>
      </section>

      <section className="section-block about-section">
        <div className="team-grid">
          <article className="team-card">
            <img className="team-card__image" src={raviPhoto} alt="Ravi, founder and developer at OpenGen" />
            <div className="team-card__content">
              <span className="section-tag">Founder</span>
              <h3>Ravi</h3>
              <p className="team-card__role">Founder + Developer</p>
              <p>Leads architecture and delivery across websites and web apps.</p>
            </div>
          </article>

          <article className="team-card">
            <img className="team-card__image" src={akashPhoto} alt="Akash, co-founder and marketing lead at OpenGen" />
            <div className="team-card__content">
              <span className="section-tag">Co-Founder</span>
              <h3>Akash</h3>
              <p className="team-card__role">Co-Founder + Marketing</p>
              <p>Owns positioning and messaging so products connect with real customers.</p>
            </div>
          </article>
        </div>
      </section>

      <BottomNav />
    </div>
  );
};

export default TeamPage;
