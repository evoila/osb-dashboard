import { BuildTarget } from './build-target';

/**
 * We keep auth module separate from Meshcloud module so we can have diverging
 * set of meshstack submodules (e.g. billing/profile/register) between VW and meshcloud targets
 */
export const buildTarget: BuildTarget = {
  coreModules: [
  ],
  sharedModules: {
    general: true,
    backup: false,
    serviceKeys: true
  },
  extensionModules: [
    // https://angular.io/docs/ts/latest/guide/router.html#!#preload-canload
    //  If you want to preload a module and guard against unauthorized access, drop the
    // canLoad guard and rely on the CanActivate guard alone.
    {
      path: 'redis',
      loadChildren: () => import('./../app/redis/redis.module').then(m => m.RedisModule),
      data: {
        skipPreload: true // register module is seldomly needed, save these few kbs
      }
    }
  ]
};
