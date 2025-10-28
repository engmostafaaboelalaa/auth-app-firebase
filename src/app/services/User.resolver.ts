import { inject, Injectable } from "@angular/core";
import { Auth, authState, User } from "@angular/fire/auth";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, RedirectCommand } from "@angular/router";
import { map } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<User | RedirectCommand> {
  private auth = inject(Auth);
  private router = inject(Router);

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return authState(this.auth).pipe(
      map(user => {
        if (user) {
          return user;
        }
        // Create redirect using DI Router
        const urlTree = this.router.createUrlTree(['/auth/sign-in']);
        return new RedirectCommand(urlTree);
      })
    );
  }
}
