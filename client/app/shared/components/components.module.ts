import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MediaListComponent} from './media-list/media-list.component';
import {CardModule} from './card/card.module';
import { Select2Component } from './select2/select2.component';
import {DatatableComponent} from './datatable/datatable.component';
import {DatatableHeaderComponent} from './datatable/header/header.component';
import {DatatableScrollComponent} from './datatable/scroll/scroll.component';
import {DatatableFooterComponent} from './datatable/footer/footer.component';
import { ScrollHeadComponent } from './datatable/scroll-head/scroll-head.component';
import { ScrollBodyComponent } from './datatable/scroll-body/scroll-body.component';
import { ScrollFooterComponent } from './datatable/scroll-footer/scroll-footer.component';

@NgModule({
    imports: [
        CommonModule,
        CardModule
    ],
    declarations: [
        MediaListComponent,
        Select2Component,
        DatatableComponent,
        DatatableHeaderComponent,
        DatatableScrollComponent,
        DatatableFooterComponent,
        ScrollHeadComponent,
        ScrollBodyComponent,
        ScrollFooterComponent
    ],
    exports: [
        MediaListComponent,
        CardModule,
        Select2Component,
        DatatableComponent,
        DatatableHeaderComponent,
        DatatableScrollComponent,
        DatatableFooterComponent,
        ScrollHeadComponent,
        ScrollBodyComponent,
        ScrollFooterComponent
    ]
})
export class ComponentsModule {
}
