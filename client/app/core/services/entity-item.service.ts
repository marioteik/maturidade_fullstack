import { HttpHandlerService } from './http-handler.service';
import { BaseHttpService } from './base-http.service';
import { Injectable } from '@angular/core';

@Injectable()
export class EntityItemService extends BaseHttpService {

    constructor(public httpHandler: HttpHandlerService) {
        super(httpHandler);
    }
}
