import { cloneDeep, differenceWith, get, hasIn, isEqual, isObject, reduce, set } from 'lodash';
import { BehaviorSubject, Observable, of } from 'rxjs';

/**
 * Classe do ContextCore
 *
 * @internal
 */
export class ContextCore {

    public contexts = {};
    public subjects = {};
    public timeouts = {};

    public destroyContext(name: string): void {
        delete this.contexts[name];
        this.destroySubjects(name);
    }

    private getValue<T>(path: string): T {
        return cloneDeep(get(this.contexts, path));
    }

    public updateValue<T>(despatchData): T {
        const cloneKey = cloneDeep(despatchData.key);
        const cloneValue = cloneDeep(despatchData.value);

        const changeValue = (k, v) => {
            const prefix = this.getKeyPrefix(k);
            const changeReturn = set(this.contexts, k, v);
            this.handleBroadcast(prefix);
            return changeReturn ? of(changeReturn) : Observable.throw(changeReturn);
        };

        const removeTimeoutAndReasign = (k, v, time) => {
            if (this.timeouts[k] != null) {
                clearTimeout(this.timeouts[k]);
            }

            return setTimeout(() => {
                changeValue(k, v);
            }, time);
        };

        if (despatchData.debounce > 0) {
            this.timeouts[despatchData.key] = removeTimeoutAndReasign(cloneKey, cloneValue, despatchData.debounce);
        } else {
            changeValue(cloneKey, cloneValue);
        }

        return cloneValue;
    }

    private addSubject(str: string): void {
        const subject = this.subjects[str];
        if (!subject) {
            const _val = cloneDeep(get(this.contexts, str));
            this.subjects[str] = new BehaviorSubject(_val);
        }
    }

    public getSubject<T>(path: string): BehaviorSubject<T> {
        const valueOnContext = this.hasContext(path);
        if (valueOnContext === true) {
            const sub = this.subjects[path];
            if (sub != null) {
                return sub;
            }
        }

        this.addSubject(path);
        return this.subjects[path];
    }

    private hasContext(key): boolean {
        return hasIn(this.contexts, key);
    }

    private getKeyPrefix(str): string {
        const key = str.split('.');
        return `${key[0]}`;
    }

    private destroySubjects(name: string): void {
        const subjectKeys = Object.keys(this.subjects);

        subjectKeys.forEach((key) => {
            if (key.indexOf(name) !== -1) {
                this.subjects[key].complete();
                delete this.subjects[key];
            }
        });
    }

    private handleBroadcast(path: string): void {
        const subsKeys = Object
            .keys(this.subjects)
            .filter((key) => {
                return key.indexOf(path) !== -1;
            });

        subsKeys.forEach((k) => {
            const actualValue = this.getValue(k);

            if (!isEqual(this.subjects[k].getValue(), actualValue)) {
                this.subjects[k].next(actualValue);
            }
        });
    }

    public getValueSync<T>(path): any {
        return this.getValue(path);
    }
}

export const contextCore = new ContextCore();
