import { Router } from 'express';

import { getContactMeta, submitInquiry } from '../controllers/contact.controller.js';

const router = Router();

router.get('/meta', getContactMeta);
router.post('/inquiry', submitInquiry);

export default router;
