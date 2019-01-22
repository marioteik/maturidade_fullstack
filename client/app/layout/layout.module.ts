import {NgModule} from '@angular/core';
import {Layout1Module} from './layout1/layout1.module';
import {Layout4Module} from './layout4/layout4.module';
import {Layout5Module} from './layout5/layout5.module';

@NgModule({
    imports: [
        Layout1Module,
        Layout4Module,
        Layout5Module
    ],
    exports: [
        Layout1Module,
        Layout4Module,
        Layout5Module
    ]
})
export class LayoutModule {
}
