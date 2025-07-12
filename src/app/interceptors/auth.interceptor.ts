import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const tokenKey = environment.keys.tokenKey;
  const resetPasswordToken = environment.keys.resetPasswordToken;
  const authToken = localStorage.getItem(tokenKey) ||  localStorage.getItem(resetPasswordToken);
  // console.log(`authToken: ${authToken}`);
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`
    }
  })
  return next(authReq);
};
