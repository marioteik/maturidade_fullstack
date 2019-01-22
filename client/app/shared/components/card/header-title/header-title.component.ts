import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'tk-card-title',
  templateUrl: './header-title.component.html',
  styleUrls: ['./header-title.component.scss']
})
export class HeaderTitleComponent implements OnInit {
  @Input() leftIcon = '';

  constructor() { }

  ngOnInit() {
  }

}
