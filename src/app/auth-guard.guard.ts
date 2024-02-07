import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
export const authGuardGuard: CanActivateFn = (route, state) => {

 const token = sessionStorage.getItem('token')
 if(token){
  return true;

 }
 return false;
};
