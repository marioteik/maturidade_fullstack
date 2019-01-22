import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EntityTypesComponent} from './entity-types.component';
import {AddEntityTypeComponent} from './add/add.component';
import {EntityTypeHandlerComponent} from './handler/handler.component';

/*import { ListComponent } from './list/list.component';
import {AddEntitiesComponent} from './add/add.component';
import {ListEntityItemComponent} from './list-item/list-item.component';
import {AddEntityItemComponent} from './add-item/add-item.component';*/

const routes: Routes = [
    {
        path: '',
        component: EntityTypesComponent,
        children: [
            {
                path: '',
                component: EntityTypeHandlerComponent,
                data: {
                    'page.title': 'Entidades',
                    'page.description': 'Lista de entidades cadastradas'
                }
            },
            {
                path: 'add',
                component: AddEntityTypeComponent,
                data: {
                    'page.title': 'Entidades',
                    'page.description': 'Adicionar uma entidade'
                }
            },
            {
                path: 'update/:id',
                component: AddEntityTypeComponent,
                data: {
                    'page.title': 'Variáveis',
                    'page.description': 'Editar a entidade'
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EntityTypesRoutingModule { }
