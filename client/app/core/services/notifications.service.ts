import { Injectable } from '@angular/core';
import {ContextHandlerService} from '../../context-handler/services/context-handler.service';
import {INotification} from '../../models/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
    public notifications: INotification[];

    constructor(private contextHandler: ContextHandlerService) {
        this.contextHandler.updateValue<INotification[]>('notifications', []);
    }

    init() {
        this.handleNotifications();
    }

    handleNotifications() {
        this.contextHandler.getContext<INotification[]>('notifications').subscribe(
            data => {
                this.notifications = data;
            }
        );
    }
}
