import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../shared/shared.module';
import { PanelComponent } from './panel/panel.component';

@NgModule({
    imports: [
        CommonModule,
        AdminRoutingModule,
        SharedModule
    ],
    declarations: [AdminComponent, PanelComponent]
})
export class AdminModule {
}
