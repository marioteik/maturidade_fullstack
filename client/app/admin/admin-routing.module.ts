import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AdminComponent} from './admin.component';
import {PanelComponent} from './panel/panel.component';

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            {
                path: '',
                component: PanelComponent,
                data: {
                    'page.title': 'Administrar',
                    'page.description': 'Dashboard de administração do sistema.',
                },
                pathMatch: 'full'
            },
            {
                path: 'entities',
                loadChildren: './entities/entities.module#EntitiesModule',
            },
            {
                path: 'entity-types',
                loadChildren: './entity-types/entity-types.module#EntityTypesModule',
            },
            {
                path: ':entityType',
                loadChildren: './entities/entities.module#EntitiesModule',
            },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AdminRoutingModule {
}
