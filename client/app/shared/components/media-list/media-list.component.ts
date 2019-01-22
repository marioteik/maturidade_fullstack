import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {IMediaList} from '../../../models/media-list';

@Component({
    selector: 'tk-media-list',
    templateUrl: './media-list.component.html',
    styleUrls: ['./media-list.component.scss']
})
export class MediaListComponent implements OnInit {
    @Input() list: IMediaList[] = [];
    @Input() noItemMsg = 'Não há itens para mostrar.';

    constructor() {
    }

    ngOnInit() {
    }

    trackByFunction(index, item) {
        if (!item) return null;
        return index;
    }

}
