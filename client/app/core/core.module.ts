import {APP_INITIALIZER, ModuleWithProviders, NgModule, Provider} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutService} from './services/layout.service';
import {NotificationsService} from './services/notifications.service';
import {LayoutRuntimeVariablesService} from './services/layout-runtime-variables.service';
import {BaseHttpService} from './services/base-http.service';
import {DynamicFormService} from './services/dynamic-form.service';
import {EntitiesService} from './services/entities.service';
import {EntityItemService} from './services/entity-item.service';
import {UtilsService} from './services/utils.service';
import {HttpHandlerService} from './services/http-handler.service';
import {RuntimeVariablesService} from './services/runtime-variables.service';
import {HttpClientModule} from '@angular/common/http';
import {EntityTypeService} from './services/entity-type.service';

export function onModuleReady(
    layoutService: LayoutService,
    notificationsService: NotificationsService,
    runtimeLayoutService: LayoutRuntimeVariablesService,
    runtimeService: RuntimeVariablesService
): Function {
    layoutService.init();
    notificationsService.init();
    runtimeLayoutService.init();
    runtimeService.init();
    return () => Promise.resolve();
}

export function makeRootProviders(): Array<Provider> {
    return [
        {
            provide: APP_INITIALIZER,
            useFactory: onModuleReady,
            deps: [LayoutService, NotificationsService, LayoutRuntimeVariablesService, RuntimeVariablesService],
            multi: true
        }
    ];
}

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule
    ],
    providers: [
        LayoutService,
        NotificationsService,
        LayoutRuntimeVariablesService,
        RuntimeVariablesService,
        BaseHttpService,
        DynamicFormService,
        EntitiesService,
        EntityItemService,
        HttpHandlerService,
        UtilsService,
        EntityTypeService
    ],
    declarations: [],
    exports: [
        HttpClientModule
    ]
})
export class CoreModule {
    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: CoreModule,
            providers: [
                LayoutService,
                NotificationsService,
                LayoutRuntimeVariablesService,
                ...makeRootProviders(),
            ],
        };
    }
}
