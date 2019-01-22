import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BootstrapModule} from './bootstrap/bootstrap.module';
import {ComponentsModule} from './components/components.module';
import {DirectivesModule} from './directives/directives.module';

@NgModule({
    imports: [
        CommonModule,
        BootstrapModule,
        ComponentsModule,
        DirectivesModule
    ],
    providers: [],
    declarations: [],
    exports: [
        BootstrapModule,
        ComponentsModule,
        DirectivesModule
    ]
})
export class SharedModule {}
