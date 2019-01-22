import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'tk-card-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
    @Input('class') containerClass: string;

    constructor() {
    }

    ngOnInit() {
    }

}
