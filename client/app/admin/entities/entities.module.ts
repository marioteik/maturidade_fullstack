import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EntitiesListComponent} from './list/list.component';
import {EntitiesRoutingModule} from './entities-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
/*import {ListEntityItemComponent} from './list-item/list-item.component';
import {AddEntityItemComponent} from './add-item/add-item.component';*/
import {SharedModule} from '../../shared/shared.module';
import {EntitiesComponent} from './entities.component';
import {AddEntitiesComponent} from './add/add.component';
import {ModalEntityComponent} from './modal-entity/modal-entity.component';
import {ListEntityItemComponent} from './list-item/list-item.component';
import {AddEntityItemComponent} from './add-item/add-item.component';

@NgModule({
    imports: [
        CommonModule,
        EntitiesRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        SharedModule
    ],
    declarations: [
        EntitiesListComponent,
        EntitiesComponent,
        AddEntitiesComponent,
        ModalEntityComponent,
        ListEntityItemComponent,
        AddEntityItemComponent
    ],
    exports: [EntitiesRoutingModule, AddEntitiesComponent, ListEntityItemComponent, AddEntityItemComponent],
    entryComponents: [ModalEntityComponent]
})
export class EntitiesModule {
}

