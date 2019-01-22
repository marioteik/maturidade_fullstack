import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SecondHeaderComponent} from './second-header.component';
import {PageTitleComponent} from './page-title/page-title.component';
import {HelpMenuComponent} from './help-menu/help-menu.component';
import {RouterModule} from '@angular/router';
import {LayoutSharedModule} from '../../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        LayoutSharedModule
    ],
    declarations: [
        SecondHeaderComponent,
        PageTitleComponent,
        HelpMenuComponent
    ],
    exports: [SecondHeaderComponent]
})
export class SecondHeaderModule {
}
