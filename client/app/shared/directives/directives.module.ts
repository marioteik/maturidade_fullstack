import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexGrowDirective} from './flex-grow.directive';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        FlexGrowDirective
    ],
    exports: [
        FlexGrowDirective
    ]
})
export class DirectivesModule {
}
