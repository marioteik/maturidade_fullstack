import {Component, OnInit} from '@angular/core';

import {ContextHandlerService} from '../../../context-handler/services/context-handler.service';
import {LayoutService} from '../../../core/services/layout.service';

@Component({
    selector: 'tk-layout4-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    public primary: boolean;
    public second: boolean;
    public right: boolean;

    constructor(
        private contextService: ContextHandlerService
    ) {
        contextService.getContext<boolean>('layout.sidebars.primary').subscribe(
            data => this.primary = data
        );

        contextService.getContext<boolean>('layout.sidebars.second').subscribe(
            data => this.second = data
        );

        contextService.getContext<boolean>('layout.sidebars.right').subscribe(
            data => this.right = data
        );
    }

    ngOnInit() {
    }

    toggleSidebar(variable) {
        this[variable] = !this[variable];

        this.contextService.updateValue(`layout.sidebars.${variable}`, this[variable]);
    }
}
