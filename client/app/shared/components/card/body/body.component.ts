import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'tk-card-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {
    @Input('class') public containerClasses: string;
    @Input('borderTop') public borderTop = true;

  constructor() { }

  ngOnInit() {
  }

}
