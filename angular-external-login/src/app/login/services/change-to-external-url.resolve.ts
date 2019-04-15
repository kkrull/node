import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

export class ChangeToExternalUrl implements Resolve<void> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<void> {
    return Promise.resolve('http://www.google.com')
      .then(url => {
        window.location.href = url;
      });
  }
}
