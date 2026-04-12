import { apiClient } from '@/lib/axios';

export const getContactMeta = async () => {
  const { data } = await apiClient.get('/contact/meta');
  return data;
};

export const submitInquiry = async (payload) => {
  const { data } = await apiClient.post('/contact/inquiry', payload);
  return data;
};
