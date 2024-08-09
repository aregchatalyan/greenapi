import { Router } from 'express';
import { ApiController } from './api.controller';

export const router = Router();

router.get('/', ApiController.info);
router.post('/handle_action', ApiController.actions);
