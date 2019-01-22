import { Component, OnInit } from '@angular/core';
import { BreadcrumbInterface } from '../../../models/breadcrumb';
import { ContextHandlerService } from '../../../context-handler/services/context-handler.service';
import { Router } from '@angular/router';
import { LayoutRuntimeVariablesService } from '../../../core/services/layout-runtime-variables.service';

@Component({
  selector: 'tk-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

    breadcrumb: BreadcrumbInterface[] = [];

    constructor(
        private contextService: ContextHandlerService,
        private route: Router,
        private runtimeService: LayoutRuntimeVariablesService
    ) {
        this.contextService.getContext<BreadcrumbInterface[]>('layoutRuntime.breadcrumb').subscribe(
            data => this.breadcrumb = data
        );
    }

    ngOnInit() {
        /*this.route.events.subscribe((data) => {
            if (data instanceof RoutesRecognized) {
                this.runtimeService.handleRouteDataVariables(data);
            }
        });*/
    }

}
