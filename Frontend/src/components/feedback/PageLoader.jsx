const PageLoader = ({ label = 'Loading...' }) => {
  return (
    <div className="page-loader" role="status" aria-live="polite">
      <span className="page-loader__spinner" />
      <span>{label}</span>
    </div>
  );
};

export default PageLoader;
