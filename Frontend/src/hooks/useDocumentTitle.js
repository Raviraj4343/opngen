import { useEffect } from 'react';

import { APP_NAME } from '@/constants/app.constants';

export const useDocumentTitle = (title) => {
  useEffect(() => {
    document.title = APP_NAME;
  }, [title]);
};
