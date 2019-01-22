import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
    selector: 'tk-modal-entity-type',
    templateUrl: './modal-entity.component.html',
    styleUrls: ['./modal-entity.component.scss']
})
export class ModalEntityTypeComponent implements OnInit {
    @Output() action = new EventEmitter();

    title: string;
    message = '';
    detail = '';
    disableNew = false;

    constructor(public bsModalRef: BsModalRef) {}

    ngOnInit() {}

    changeVariable(): void {
        this.action.emit('changeVariable');
    }

    newEntity(): void {
        this.action.emit('newEntity');
    }

    goToList(): void {
        this.action.emit('goToList');
    }
}
