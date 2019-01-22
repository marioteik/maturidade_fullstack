import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';

import {throwError, Observable} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';


@Injectable()
export class HttpHandlerService {

    constructor(private http: HttpClient) {
    }

    mountHeader(options) {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                ...options.header
            }),
            params: new HttpParams({
                ...options.params
            })
        };
    }

    get<T>(url: string, retryX: number = 0, options?): Observable<T> {
        if (options) {
            const httpOptions = this.mountHeader(options);

            return this.http.get<T>(url, httpOptions)
                .pipe(
                    retry(retryX),
                    catchError(this.handleError)
                );
        }

        return this.http.get<T>(url)
            .pipe(
                retry(retryX),
                catchError(this.handleError)
            );
    }

    post<T>(url: string, body: object, options?): Observable<T> {

        if (options) {
            const httpOptions = this.mountHeader(options);

            return this.http.post<T>(url, body, httpOptions)
                .pipe(
                    catchError(this.handleError)
                );
        }

        return this.http.post<T>(url, body)
            .pipe(
                catchError(this.handleError)
            );
    }

    patch<T>(url, body, options?): Observable<T> {
        if (options) {
            const httpOptions = this.mountHeader(options);

            return this.http.patch<T>(url, body, httpOptions)
                .pipe(
                    catchError(this.handleError)
                );
        }

        return this.http.patch<T>(url, body)
            .pipe(
                catchError(this.handleError)
            );
    }

    delete<T>(url, options?): Observable<T> {

        if (options) {
            const httpOptions = this.mountHeader(options);

            return this.http.delete<T>(url, httpOptions)
                .pipe(
                    catchError(this.handleError)
                );
        }

        return this.http.delete<T>(url)
            .pipe(
                catchError(this.handleError)
            );
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${JSON.stringify(error.error)}`);
        }

        // return an observable with a user-facing error message
        return throwError(
            'Something bad happened; please try again later.');
    };

}
