import { Router } from 'express';
import { UserRoute } from '../modules/auth/auth.route';
import { CarRoute } from '../modules/car/car.route';

const router = Router();
const modulesRoutes = [
  {
    path: '/auth',
    route: UserRoute,
  },
  {
    path: '/cars',
    route: CarRoute,
  },
];
modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
