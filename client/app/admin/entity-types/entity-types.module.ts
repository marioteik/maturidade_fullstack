import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EntityTypeListComponent} from './list/list.component';
import {EntityTypesRoutingModule} from './entity-types-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import {EntityTypesComponent} from './entity-types.component';
import {AddEntityTypeComponent} from './add/add.component';
import {ModalEntityTypeComponent} from './modal-entity/modal-entity.component';
import {EntityTypeHandlerComponent} from './handler/handler.component';

@NgModule({
    imports: [
        CommonModule,
        EntityTypesRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        SharedModule
    ],
    declarations: [
        EntityTypeListComponent,
        EntityTypesComponent,
        AddEntityTypeComponent,
        ModalEntityTypeComponent,
        EntityTypeHandlerComponent
    ],
    exports: [
        EntityTypesRoutingModule,
        AddEntityTypeComponent
    ],
    entryComponents: [
        ModalEntityTypeComponent
    ]
})
export class EntityTypesModule {
}

