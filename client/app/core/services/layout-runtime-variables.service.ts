import {Injectable} from '@angular/core';
import {ContextHandlerService} from '../../context-handler/services/context-handler.service';
import { cloneDeep, merge, set } from 'lodash';
import {Logo} from '../../models/logo';
import {Page} from '../../models/page';

export interface ILayoutRuntimeVariables {
    page: Page;
    logo: Logo;
    breadcrumb: Array<[string, string]>;
}

@Injectable({
    providedIn: 'root'
})
export class LayoutRuntimeVariablesService {
    /***
     * Logo qualiflex:
     * name: 'Qualiflex',
     * image: '/assets/images/logo-qualiflex.png',
     * alt: 'Logo Qualiflex'
     *
     * Logo maturidade
     * name: 'Maturidade',
     * image: '',
     * alt: 'Logo Maturidade'
     *
     * Logo cliqui
     * name: '',
     * image: '/assets/images/logo-cliqui-single-line-small.png',
     * alt: 'Logo Cliqui'
     *
     */

    public runtime: ILayoutRuntimeVariables = {
        page: {
            title: 'MMS',
            description: 'Sistema de gerenciamento de produção e romaneio'
        },
        logo: {
            name: 'Maturidade',
            image: '',
            alt: 'Logo Maturidade'
        },
        breadcrumb: []
    };

    constructor(
        private contextHandler: ContextHandlerService
        ) {
        this.contextHandler.updateValue('layoutRuntime', this.runtime);
    }

    init() {
        this.handleRuntime();
    }

    handleRuntime() {
        this.contextHandler.getContext<ILayoutRuntimeVariables>('layoutRuntime').subscribe(
            data => this.runtime = data
        );
    }

    handleRouteDataVariables(routeTree) {
        let routeObj = routeTree.state.root;
        let data = {};

        while (routeObj) {
            data = merge(data, routeObj.data);
            routeObj = routeObj.firstChild;
        }

        this.handleRuntimeChangeVariables(data);
    }

    updatePageTitle(title) {
        this.contextHandler.updateValue('layoutRuntime.page.title', title);
    }

    updatePageDescription(description) {
        this.contextHandler.updateValue('layoutRuntime.page.description', description);
    }

    updatePageTitleAndDescription(title, description) {
        this.updatePageTitle(title);
        this.updatePageDescription(description);
    }

    private handleRuntimeChangeVariables(data) {
        let _runtime = cloneDeep(this.runtime);

        Object.keys(data).forEach(el => set(_runtime, el, data[el]));

        this.runtime = _runtime;
        this.contextHandler.updateValue('layoutRuntime', this.runtime);
    }
}
