import { CanActivateFn } from '@angular/router';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';


export const authGuard: CanActivateFn = (route, state) => {
   return true;
};

@Injectable({
   providedIn: 'root'
})
export class AuthGuard implements CanActivate {
   constructor(private router: Router) { }
   
   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      if (this.isLoggedIn()) {
         var role = localStorage.getItem('role');
         if (role) {
            // ? check if route is restricted by role
            const { roles } = route.data;
            if (roles && !roles.includes(role)) {
               // ? role not authorized so redirect to home page
               this.router.navigate(['pages/'+role.toLowerCase()+"/home"]);
               return false;
            }

            // authorized so return true
            return true;
         }
      }

      // navigate to login page as user is not authenticated      
      this.router.navigate(['pages/login']);
      return false;
   }

   public isLoggedIn(): boolean {
      let status = false;
      if (localStorage.getItem('isLoggedIn') == "true") {
         status = true;
      }
      else {
         status = false;
      }
      return status;
   }

}    