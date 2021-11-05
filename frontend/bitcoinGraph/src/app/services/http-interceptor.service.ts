import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";

import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import Swal from "sweetalert2";


//This HttpInterceptor is to Hnadle any API Request/Response Error (from Server or Client)
@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(error => {
       
       let errorMessage = '';
       if (error.error instanceof ErrorEvent) {
         // client-side error
         errorMessage = "CLIENT Error" + error.error.message;
       } else {
         // server-side error
         errorMessage = "SERVER Error" + error.status + " --- " + "Message:" + error.message;
       }

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: errorMessage
      })
      
       return throwError(() => errorMessage);
      })
    );
  }
}
 