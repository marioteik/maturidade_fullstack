import { HttpHandlerService } from './http-handler.service';
import { BaseHttpService } from './base-http.service';
import { Injectable } from '@angular/core';

@Injectable()
export class EntitiesService extends BaseHttpService {

    constructor(public httpHandler: HttpHandlerService) {
        super(httpHandler);

        this.endpoint = 'entities';
    }
}
