export const ROUTES = {
  HOME: '/',

  STEP_ONE: '/step-one',
  STEP_TWO: '/step-two',
  REGISTER: '/register'

} as const;

export type RouteKeys = keyof typeof ROUTES;
export type Routes = (typeof ROUTES)[RouteKeys];

export const getRoute = <T extends Routes>(route: T, params?: Record<string, string>): Routes => {
  let path = route as string;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      path = path.replace(`:${key}`, value);
    });
  }
  return path as Routes;
};