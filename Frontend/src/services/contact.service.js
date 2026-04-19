import { apiClient } from '@/lib/axios';
import { DEFAULT_CONTACT_DETAILS } from '@/constants/contact.constants';

const CONTACT_CACHE_KEY = 'opngen.contact-meta';

const readCachedContactMeta = () => {
  if (typeof window === 'undefined') {
    return DEFAULT_CONTACT_DETAILS;
  }

  try {
    const cachedValue = window.localStorage.getItem(CONTACT_CACHE_KEY);

    if (!cachedValue) {
      return DEFAULT_CONTACT_DETAILS;
    }

    const parsedValue = JSON.parse(cachedValue);

    return {
      ...DEFAULT_CONTACT_DETAILS,
      ...parsedValue,
    };
  } catch {
    return DEFAULT_CONTACT_DETAILS;
  }
};

const writeCachedContactMeta = (contact) => {
  if (typeof window === 'undefined' || !contact) {
    return;
  }

  try {
    window.localStorage.setItem(
      CONTACT_CACHE_KEY,
      JSON.stringify({
        email: contact.email,
        phone: contact.phone,
        whatsapp: contact.whatsapp,
      }),
    );
  } catch {
    // Ignore cache writes when storage is unavailable.
  }
};

export const getContactMeta = async () => {
  const { data } = await apiClient.get('/contact/meta');
  const contact = data?.data?.contact;

  if (contact) {
    writeCachedContactMeta(contact);
  }

  return data;
};

export const submitInquiry = async (payload) => {
  const { data } = await apiClient.post('/contact/inquiry', payload);
  return data;
};

export { readCachedContactMeta };
