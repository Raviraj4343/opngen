import openGenLogo from './opngen_logo.png';

const OpenGenBrandMark = () => {
  return (
    <div className="brand-mark" aria-label="OpenGen logo">
      <img className="brand-mark__logo" src={openGenLogo} alt="OpenGen official logo" />
      <div className="brand-mark__text">
        <strong>OpenGen</strong>
      </div>
    </div>
  );
};

export default OpenGenBrandMark;
