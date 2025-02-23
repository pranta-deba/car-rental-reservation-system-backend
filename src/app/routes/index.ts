import { Router } from 'express';

const router = Router();
const modulesRoutes = [
  {
    path: '/users',
    route: ,
  },
];
modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
