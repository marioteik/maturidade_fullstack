import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardComponent} from './dashboard/dashboard.component';
import {PagesRoutingModule} from './pages-routing.module';
import { PagesComponent } from './pages.component';
import {SharedModule} from '../shared/shared.module';
import { SummaryComponent } from './dashboard/summary/summary.component';

@NgModule({
    imports: [
        CommonModule,
        PagesRoutingModule,
        SharedModule
    ],
    declarations: [DashboardComponent, PagesComponent, SummaryComponent]
})
export class PagesModule {
}
