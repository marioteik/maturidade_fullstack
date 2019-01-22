import {Mongoose} from './mongoose';

export enum NotificationType {
    'tipo1',
    'tipo2'
}

export enum PriorityType {
    'normal',
    'important',
    'urgent',
}

export interface INotification extends Mongoose {
    description: string;
    type: NotificationType;
    priority: PriorityType;
    date: Date;
}
