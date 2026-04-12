const StatusCard = ({ label, value, tone = 'default' }) => {
  return (
    <div className={`status-card status-card--${tone}`}>
      <span className="status-card__label">{label}</span>
      <strong className="status-card__value">{value}</strong>
    </div>
  );
};

export default StatusCard;
