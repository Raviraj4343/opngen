import { Router } from 'express';

import contactRoutes from './contact.routes.js';
import healthRoutes from './health.routes.js';

const router = Router();

router.use('/contact', contactRoutes);
router.use('/health', healthRoutes);

export default router;
