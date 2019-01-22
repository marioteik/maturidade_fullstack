import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'tk-card-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    @Input('borderBottom') public borderBottom = true;

    constructor() {
    }

    ngOnInit() {}

}
