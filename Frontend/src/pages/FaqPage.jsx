import { Link } from 'react-router-dom';

import BottomNav from '@/components/common/BottomNav';
import { APP_ROUTES } from '@/constants/routes.constants';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import OpnGenBrandMark from '@/logo/OpnGenBrandMark';

const FAQ_ITEMS = [
  {
    question: 'How fast can OpnGen start a project?',
    answer:
      'Most projects begin within 3 to 5 business days after scope lock. You get a kickoff timeline, milestones, and owner-level communication from day one.',
  },
  {
    question: 'What does a typical website or app engagement include?',
    answer:
      'A standard engagement includes strategy, UX direction, premium UI, development, QA, launch support, and handoff documentation so your team can operate confidently.',
  },
  {
    question: 'Do you work with redesigns and existing products?',
    answer:
      'Yes. We handle complete rebuilds, focused redesigns, and phased upgrades for existing websites and web apps without disrupting live operations.',
  },
  {
    question: 'How do revisions and feedback loops work?',
    answer:
      'We run weekly review cycles with clear checkpoints. Feedback is prioritized by business impact, and accepted changes are reflected in the next sprint plan.',
  },
  {
    question: 'Will my site be optimized for performance and conversion?',
    answer:
      'Absolutely. Every build is structured for speed, mobile usability, SEO fundamentals, and conversion-focused information hierarchy across key pages.',
  },
  {
    question: 'What happens after launch?',
    answer:
      'Post-launch, you can continue with maintenance, iterative enhancements, and performance improvements. We stay available for roadmap-level support.',
  },
];

const FaqPage = () => {
  useDocumentTitle('FAQ');

  return (
    <div className="landing-page">
      <section className="hero hero--compact">
        <div className="hero__topbar">
          <OpnGenBrandMark />
        </div>
        <div className="section-heading">
          <span className="section-tag">FAQ</span>
          <h2>Answers before you commit.</h2>
          <p>Everything clients usually ask before starting a premium website or app project.</p>
        </div>
      </section>

      <section className="section-block faq-section" aria-label="Frequently asked questions">
        <div className="faq-grid">
          {FAQ_ITEMS.map((item, index) => (
            <article className="faq-card" key={item.question}>
              <span className="faq-card__index">{String(index + 1).padStart(2, '0')}</span>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block faq-cta" aria-label="Still have questions">
        <div className="faq-cta__content">
          <span className="section-tag">Need More Help?</span>
          <h2>Have more questions? Ask us directly.</h2>
          <p>Share your goals and get founder-level guidance with clear next steps.</p>
          <Link className="button button--primary faq-cta__button" to={APP_ROUTES.contact}>
            Contact Us
          </Link>
        </div>
      </section>

      <BottomNav />
    </div>
  );
};

export default FaqPage;
