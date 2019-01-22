import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CardComponent} from './card.component';
import { HeaderComponent } from './header/header.component';
import { HeaderTitleComponent } from './header-title/header-title.component';
import { BodyComponent } from './body/body.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        CardComponent,
        HeaderComponent,
        HeaderTitleComponent,
        BodyComponent,
        FooterComponent
    ],
    exports: [
        CardComponent,
        HeaderComponent,
        HeaderTitleComponent,
        BodyComponent,
        FooterComponent
    ]
})
export class CardModule {
}
