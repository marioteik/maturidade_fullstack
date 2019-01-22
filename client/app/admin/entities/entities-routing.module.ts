import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EntitiesComponent} from './entities.component';
import {EntitiesListComponent} from './list/list.component';
import {AddEntitiesComponent} from './add/add.component';
import {ListEntityItemComponent} from './list-item/list-item.component';
import {AddEntityItemComponent} from './add-item/add-item.component';

/*import { ListComponent } from './list/list.component';
import {AddEntitiesComponent} from './add/add.component';
import {ListEntityItemComponent} from './list-item/list-item.component';
import {AddEntityItemComponent} from './add-item/add-item.component';*/

const routes: Routes = [
    {
        path: '',
        component: EntitiesComponent,
        children: [
            {
                path: '',
                component: EntitiesListComponent,
                data: {
                    'page.title': 'Entidades',
                    'page.description': 'Lista de entidades cadastradas'
                },
                pathMatch: 'full'
            },
            {
                path: 'add',
                component: AddEntitiesComponent,
                data: {
                    'page.title': 'Entidades',
                    'page.description': 'Adicionar uma entidade'
                }
            },
            {
                path: 'update/:id',
                component: AddEntitiesComponent,
                data: {
                    'page.title': 'Variáveis',
                    'page.description': 'Editar a entidade'
                }
            },
            {
                path: ':id',
                component: ListEntityItemComponent,
                data: {
                    'page.title': 'Variável',
                    'page.description': 'Editar a variável'
                }
            },
            {
                path: ':id/add',
                component: AddEntityItemComponent,
                data: {
                    'page.title': 'Adicionar item na variável',
                    'page.description': 'Adicionar valores à entidade cadastrada'
                }
            },
            {
                path: ':id/update/:entityItemId',
                component: AddEntityItemComponent,
                data: {
                    'page.title': 'Editar item',
                    'page.description': 'Editar valores ao item cadastrado'
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EntitiesRoutingModule { }
