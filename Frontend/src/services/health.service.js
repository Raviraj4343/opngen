import { apiClient } from '@/lib/axios';

export const getBackendHealth = async () => {
  const { data } = await apiClient.get('/health');
  return data;
};
