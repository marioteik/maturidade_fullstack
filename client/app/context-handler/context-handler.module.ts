import {CommonModule} from '@angular/common';
import {
    APP_INITIALIZER, ModuleWithProviders, NgModule, Provider,
} from '@angular/core';

import {contextCore} from './context/context.core';

export * from './models/context-config';

import {
    CONTEXT_CORE
} from './injection-tokens';

import {ContextHandlerService} from './services/context-handler.service';

export function onModuleReady(contextHandlerService: ContextHandlerService): Function {
    contextHandlerService.init();
    return () => Promise.resolve();
}

export function makeRootProviders(): Array<Provider> {
    return [
        {provide: CONTEXT_CORE, useValue: contextCore},
        {provide: APP_INITIALIZER, useFactory: onModuleReady, deps: [ContextHandlerService], multi: true}
    ];
}

@NgModule({
    imports: [
        CommonModule,
    ],
    providers: [
        ContextHandlerService
    ],
})
export class ContextHandlerModule {
    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: ContextHandlerModule,
            providers: [
                ContextHandlerService,
                ...makeRootProviders(),
            ],
        };
    }
}
