import BottomNav from '@/components/common/BottomNav';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import akashPhoto from '@/logo/Akash.jpeg';
import OpnGenBrandMark from '@/logo/OpnGenBrandMark';
import raviPhoto from '@/logo/Ravi Raj.jpeg';

const TeamPage = () => {
  useDocumentTitle('Team');

  return (
    <div className="landing-page">
      <section className="hero hero--compact">
        <div className="hero__topbar">
          <OpnGenBrandMark />
        </div>
        <div className="section-heading">
          <span className="section-tag">Team</span>
          <h2>Lean team. Senior ownership. Precision execution.</h2>
          <p>Work directly with the builders, move faster, and ship with confidence.</p>
        </div>
      </section>

      <section className="section-block about-section">
        <div className="team-grid">
          <article className="team-card">
            <img className="team-card__image" src={raviPhoto} alt="Ravi, founder and developer at OpnGen" />
            <div className="team-card__content">
              <span className="section-tag">Founder</span>
              <h3>Ravi</h3>
              <p className="team-card__role">Founder + Developer</p>
              <p>Leads product architecture and high-quality delivery across websites and web apps.</p>
            </div>
          </article>

          <article className="team-card">
            <img className="team-card__image" src={akashPhoto} alt="Akash, co-founder and marketing lead at OpnGen" />
            <div className="team-card__content">
              <span className="section-tag">Co-Founder</span>
              <h3>Akash</h3>
              <p className="team-card__role">Co-Founder + Marketing</p>
              <p>Owns positioning and messaging to ensure every product connects with real buyers.</p>
            </div>
          </article>
        </div>
      </section>

      <BottomNav />
    </div>
  );
};

export default TeamPage;
