import http from 'node:http';

import app from './app.js';
import { env } from './config/env.js';
import connectDB, { disconnectDB } from './db/db.js';

const server = http.createServer(app);

const startServer = async () => {
  await connectDB();

  server.listen(env.port, () => {
    console.log(`Server is running on port ${env.port} in ${env.nodeEnv} mode`);
  });
};

const shutdown = async (signal) => {
  console.log(`${signal} received. Shutting down gracefully...`);

  server.close(async () => {
    await disconnectDB();
    process.exit(0);
  });
};

process.on('SIGINT', () => {
  void shutdown('SIGINT');
});

process.on('SIGTERM', () => {
  void shutdown('SIGTERM');
});

server.on('error', (error) => {
  console.error('Server failed to start:', error);
  process.exit(1);
});

void startServer().catch(async (error) => {
  console.error('Application bootstrap failed:', error);
  await disconnectDB();
  process.exit(1);
});
