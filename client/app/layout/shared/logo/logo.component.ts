import {Component, OnInit} from '@angular/core';
import {ContextHandlerService} from '../../../context-handler/services/context-handler.service';
import {Logo} from '../../../models/logo';

@Component({
    selector: 'tk-logo',
    templateUrl: './logo.component.html',
    styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit {
    logo: Logo = {
        image: '',
        name: '',
        alt: ''
    };

    constructor(private contextHandler: ContextHandlerService) {
    }

    ngOnInit() {
        this.contextHandler.getContext<Logo>('layoutRuntime.logo')
            .subscribe(
                data => this.logo = data
            );
    }

}
