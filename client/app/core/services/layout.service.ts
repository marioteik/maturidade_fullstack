import {Injectable} from '@angular/core';
import {ContextHandlerService} from '../../context-handler/services/context-handler.service';
import {cloneDeep, each, filter} from 'lodash';

export interface SidebarConfigInterface {
    primary: [boolean, string];
    second: [boolean, string];
    right: [boolean, string];
    filter: [boolean, string];
}

@Injectable({
    providedIn: 'root'
})
export class LayoutService {
    public body = document.body;
    public sidebars: SidebarConfigInterface = {
        primary: [true, 'sidebar-xs'],
        second: [true, 'sidebar-secondary-hidden'],
        right: [false, 'sidebar-right-visible'],
        filter: [true, 'sidebar-component-hidden']
    };

    public cached: Array<Array<[string, any]>> = [];

    constructor(private contextHandler: ContextHandlerService) {
        this.contextHandler.updateValue('layout', {});

        this.contextHandler.updateValue('layout.sidebars', {
            primary: this.sidebars.primary[0],
            second: this.sidebars.second[0],
            right: this.sidebars.right[0],
            filter: this.sidebars.filter[0]
        });

        this.contextHandler.updateValue('layout.actions', {
            filter: true
        });
    }

    init() {
        this.handleSidebars();
    }

    handleSidebars() {
        this.contextHandler
            .getContext<boolean>('layout.sidebars')
            .subscribe(data => {
                this.toggleSidebar(data);
            });
    }

    toggleSidebar(data) {
        if (data) {
            let keys = Object.keys(data);
            let sidebars = cloneDeep(this.sidebars);

            keys.forEach(el => {
                sidebars[el][0] = data[el];

                if (data[el] === true) {
                    this.body.classList.add(sidebars[el][1]);
                } else {
                    this.body.classList.remove(sidebars[el][1]);
                }
            });

            this.sidebars = sidebars;
        }
    }

    cache(val: string[] | string) {
        let arr = cloneDeep(this.cached);

        if (typeof val === 'string') {
            arr.push([val, this.contextHandler.getValueSync(val)]);
        } else {
            val.forEach(el => {
                arr.push([el, this.contextHandler.getValueSync(el)]);
            });
        }

        this.cached = arr;
    }

    restore(paths: string[] | string) {
        let arr = cloneDeep(this.cached);

        const compareAndRestore = (path, element): boolean => {
            const compare = path === element[0];

            if (compare) {
                this.contextHandler.updateValue(path, element[1]);
            }

            return !compare;
        };

        if (typeof paths === 'string') {
            arr = filter(arr, el => {
                return compareAndRestore(paths, el);
            });
        } else {
            each(paths, path => {
                arr = filter(arr, el => {
                    return compareAndRestore(path, el);
                });
            });
        }

        this.cached = arr;
    }
}
