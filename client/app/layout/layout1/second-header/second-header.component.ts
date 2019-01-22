import {Component, OnInit} from '@angular/core';
import {ContextHandlerService} from '../../../context-handler/services/context-handler.service';

@Component({
    selector: 'tk-layout1-second-header',
    templateUrl: './second-header.component.html',
    styleUrls: ['./second-header.component.scss']
})
export class SecondHeaderComponent implements OnInit {
    public filter: boolean;
    public filterAction = true;

    constructor(private contextService: ContextHandlerService) {
        contextService.getContext<boolean>('layout.sidebars.filter').subscribe(
            data => this.filter = data
        );

        contextService.getContext<boolean>('layout.actions.filter').subscribe(
            data => this.filterAction = data
        );
    }

    ngOnInit() {
    }

    toggleFilterSidebar() {
        this.filter = !this.filter;

        this.contextService.updateValue(`layout.sidebars.filter`, this.filter);
    }

}
