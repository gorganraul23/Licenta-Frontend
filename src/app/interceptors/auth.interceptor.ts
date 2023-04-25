import {Injectable} from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {LoginService} from "../services/login.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private service: LoginService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const token = this.service.getToken();

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request);
  }

}
