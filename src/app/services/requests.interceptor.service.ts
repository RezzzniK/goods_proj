import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { of } from 'rxjs';

import { environment } from 'src/environments/environment';
import testDB from './testDB.json';

export class RequestsInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log('interceptor');
    if (environment.IS_MOCK) {
      //in case if our env is mock then we will use
      //mock data
      return of(new HttpResponse(testDB[req.url]));
    } else {
      //in case if we not in mock mode, will handle this requeset
      return next.handle(req);
    }
  }
}
