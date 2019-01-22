import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {RouterModule} from '@angular/router';
import {SecondHeaderModule} from './second-header/second-header.module';
import {Layout1Component} from './layout1.component';
import {HeaderComponent} from './header/header.component';
import {LayoutSharedModule} from '../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        RouterModule,
        SecondHeaderModule,
        LayoutSharedModule
    ],
    declarations: [
        Layout1Component,
        HeaderComponent
    ],
    exports: [Layout1Component, SecondHeaderModule]
})
export class Layout1Module { }
