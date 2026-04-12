const OpenGenBrandMark = () => {
  return (
    <div className="brand-mark" aria-label="OpenGen logo">
      <div className="brand-mark__icon" aria-hidden="true">
        <span className="brand-mark__dot brand-mark__dot--lime" />
        <span className="brand-mark__dot brand-mark__dot--cyan" />
        <span className="brand-mark__ring" />
      </div>
      <div className="brand-mark__text">
        <strong>OpenGen</strong>
        <span>Websites & apps that get clients talking</span>
      </div>
    </div>
  );
};

export default OpenGenBrandMark;
