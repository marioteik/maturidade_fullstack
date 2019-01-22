import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LogoComponent} from './logo/logo.component';
import {RouterModule} from '@angular/router';
import {CalendarCardComponent} from './calendar-card/calendar-card.component';
import {NotificationsComponent} from './notifications/notifications.component';
import {UserCardComponent} from './user-card/user-card.component';
import {SharedModule} from '../../shared/shared.module';
import {BreadcrumbComponent} from './breadcrumb/breadcrumb.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        SharedModule
    ],
    declarations: [LogoComponent, CalendarCardComponent, NotificationsComponent, UserCardComponent, BreadcrumbComponent],
    exports: [LogoComponent, CalendarCardComponent, NotificationsComponent, UserCardComponent, BreadcrumbComponent]
})
export class LayoutSharedModule {
}
