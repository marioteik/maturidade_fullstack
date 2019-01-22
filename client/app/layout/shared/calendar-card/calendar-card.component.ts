import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'tk-calendar-card',
    templateUrl: './calendar-card.component.html',
    styleUrls: ['./calendar-card.component.scss']
})
export class CalendarCardComponent implements OnInit {
    public today = new Date();

    constructor() {
    }

    ngOnInit() {
    }

}
