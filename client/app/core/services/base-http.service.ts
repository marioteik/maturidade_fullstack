import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

import {HttpHandlerService} from './http-handler.service';
import {Entity} from '../../models/entity';
import {finalize} from 'rxjs/operators';

@Injectable()
export class BaseHttpService {
    private apiURL = 'http://localhost:8080/api';
    public endpoint = '';

    constructor(public httpHandler: HttpHandlerService) {
    }

    list(route?: string, callback?: () => void): Observable<any[]> {
        return this.httpHandler.get<any>(`${this.apiURL}/${route ? route : this.endpoint}`, 3).pipe(
            finalize(callback)
        );
    }

    count(callback?: () => void): Observable<number> {
        return this.httpHandler.get<number>(`${this.apiURL}/${this.endpoint}/count`, 3).pipe(
            finalize(callback)
        );
    }

    get(route: string, routeOrId?: string, callback?: () => void): Observable<any> {
        return this.httpHandler.get<any>(`${this.apiURL}/${route ? route : this.endpoint}/${routeOrId}`, 3).pipe(
            finalize(callback)
        );
    }

    create(obj: any, route?: string, callback?: () => void): Observable<any> {
        return this.httpHandler.post<any>(`${this.apiURL}/${route ? route : this.endpoint}`, obj).pipe(
            finalize(callback)
        );
    }

    update(obj: any, route?: string, callback?: () => void): Observable<any> {
        return this.httpHandler.patch<any>(`${this.apiURL}/${route ? route : this.endpoint}/${obj._id}`, obj).pipe(
            finalize(callback)
        );
    }

    delete(id: string, route?: string,  callback?: () => void): Observable<any> {
        return this.httpHandler.delete<any>(`${this.apiURL}/${route ? route : this.endpoint}/${id}`).pipe(
            finalize(callback)
        );
    }
}
