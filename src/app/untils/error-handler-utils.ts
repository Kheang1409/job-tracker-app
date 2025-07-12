import { HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";

export function handler(error: HttpErrorResponse): Observable<never> {
  if (error.error.message) {
    return throwError(() => new Error(error.error.message));
  }
  return throwError(() => new Error('An unknown error occurred.'));
}

 