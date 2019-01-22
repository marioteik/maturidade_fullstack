import {Component, OnInit} from '@angular/core';
import {PageTitleInterface} from '../../../../models/page-title';
import {ContextHandlerService} from '../../../../context-handler/services/context-handler.service';
import {Router, RoutesRecognized} from '@angular/router';
import {LayoutRuntimeVariablesService} from '../../../../core/services/layout-runtime-variables.service';
import {Location} from '@angular/common';

@Component({
    selector: 'tk-layout5-page-title',
    templateUrl: './page-title.component.html',
    styleUrls: ['./page-title.component.css'],
})
export class PageTitleComponent implements OnInit {
    runtime: PageTitleInterface = {
        title: 'Maturidade',
        description: 'Sistema de gerenciamento bla'
    };

    constructor(
        private contextService: ContextHandlerService,
        private route: Router,
        private location: Location,
        private runtimeService: LayoutRuntimeVariablesService
    ) {
        this.contextService.getContext<PageTitleInterface>('layoutRuntime.page').subscribe(
            data => this.runtime = data
        );
    }

    ngOnInit() {
        this.route.events.subscribe((data) => {
            if (data instanceof RoutesRecognized) {
                this.runtimeService.handleRouteDataVariables(data);
            }
        });
    }

    /*buildBreadCrumb(route: ActivatedRoute, url: string = '',
                    breadcrumbs: Array<BreadCrumb> = []): Array<BreadCrumb> {
        //If no routeConfig is avalailable we are on the root path
        const label = route.routeConfig ? route.routeConfig.data[ 'breadcrumb' ] : 'Home';
        const path = route.routeConfig ? route.routeConfig.path : '';
        //In the routeConfig the complete path is not available,
        //so we rebuild it each time
        const nextUrl = `${url}${path}/`;
        const breadcrumb = {
            label: label,
            url: nextUrl
        };
        const newBreadcrumbs = [ ...breadcrumbs, breadcrumb ];
        if (route.firstChild) {
            //If we are not on our current path yet,
            //there will be more children to look after, to build our breadcumb
            return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
        }
        return newBreadcrumbs;
    }*/

    goBack() {
        this.location.back();
    }
}
