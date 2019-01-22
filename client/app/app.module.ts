import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {LayoutModule} from './layout/layout.module';
import {ContextHandlerModule} from './context-handler/context-handler.module';
import {SharedModule} from './shared/shared.module';
import {AppRoutingModule} from './app-routing.module';
import {CoreModule} from './core/core.module';
import {NotFoundComponent} from './not-found/not-found.component';

@NgModule({
    declarations: [
        AppComponent,
        NotFoundComponent
    ],
    imports: [
        BrowserModule,
        LayoutModule,
        ContextHandlerModule.forRoot(),
        SharedModule,
        CoreModule.forRoot(),
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
