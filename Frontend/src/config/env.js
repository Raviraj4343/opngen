const requiredVars = ['VITE_API_BASE_URL'];

requiredVars.forEach((key) => {
  if (!import.meta.env[key]) {
    console.warn(`Missing frontend environment variable: ${key}`);
  }
});

export const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5600/api/v1',
};
