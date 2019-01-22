import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const appRoutes: Routes = [
    {
        path: '',
        loadChildren: './pages/pages.module#PagesModule',
        data: {
            'breadcrumb.title': 'Home',
            'breadcrumb.icon': 'home2'
        }
    },
    {
        path: 'admin',
        loadChildren: './admin/admin.module#AdminModule',
        data: {
            'breadcrumb.title': 'Administração',
            'breadcrumb.icon': 'home2'
        }
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            {
                enableTracing: false,
                preloadingStrategy: PreloadAllModules
            }
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}
