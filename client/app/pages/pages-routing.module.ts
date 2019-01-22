import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DashboardComponent} from './dashboard/dashboard.component';
import {PagesComponent} from './pages.component';
import {PanelComponent} from '../admin/panel/panel.component';

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            {
                path: '',
                component: DashboardComponent,
                data: {
                    'page.title': 'Dashboard',
                    'page.description': 'Resumo de informações do sistema.',
                }
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(pagesRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class PagesRoutingModule {}
