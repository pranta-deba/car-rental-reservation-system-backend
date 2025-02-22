import { Router } from 'express';
import { UserRoute } from '../modules/users/user.route';

const router = Router();
const modulesRoutes = [
  {
    path: '/users',
    route: UserRoute,
  },
];
modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
