import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { PostmanService } from './services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
	constructor(
		private postmanService: PostmanService,
		private router: Router,
	) { }

	public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		if (!this.postmanService.isLoaded()) {
			return this.router.parseUrl('/setup');
		}

		return true;
	}
}
