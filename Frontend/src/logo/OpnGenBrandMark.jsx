import { APP_NAME } from '@/constants/app.constants';
import opnGenLogo from './opngen_logo.png';

const OpnGenBrandMark = () => {
  return (
    <div className="brand-mark" aria-label={`${APP_NAME} logo`}>
      <img className="brand-mark__logo" src={opnGenLogo} alt={`${APP_NAME} official logo`} />
      <div className="brand-mark__text">
        <strong>{APP_NAME}</strong>
      </div>
    </div>
  );
};

export default OpnGenBrandMark;
