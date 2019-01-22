import {Injectable} from '@angular/core';
import {cloneDeep, reject, set, find} from 'lodash';

@Injectable()
export class UtilsService {
    enumToArray(e): any[] {
        return Object.keys(e).filter(key => Number.isNaN(Number(key)));
    }

    findByKey(arr, key, value) {
        return find(arr, [key, value]);
    }

    findByKeyAndReplace(arr, key, newValue) {
        let newArr = cloneDeep(arr);
        const index = newArr.findIndex(el => el[key] === newValue[key]);

        if (index >= 0) {
            newArr[index] = newValue;
        }

        return newArr;
    }

    updateObjValue(obj: any[], path, value): any[] {
        let newObj = cloneDeep(obj);

        newObj = set(newObj, path, value);

        return newObj;
    }

    removeFromArray(arr: any[], f): any[] {
        let newArr = cloneDeep(arr);

        newArr = reject(newArr, f);

        return newArr;
    }

    fetch(variable, cb) {
        const req = new XMLHttpRequest();
        req.open('GET', `assets/data/${variable}.json`);

        req.onload = () => {
            const data = JSON.parse(req.response);
            cb(data);
        };

        req.send();
    }

    handleSorts(query) {
        let arr = [];
        let q = cloneDeep(query);

        if (q.sorts) {
            if (!q.sorts.forEach) {
                q.sorts = [q.sorts];
                q.dir = [q.dir];
            }

            q.sorts.forEach((el, i) => {
                arr.push({
                    prop: el,
                    dir: q.dir[i]
                });
            });
        }

        return arr;
    }

    handleIsHidden(isHidden) {
        let obj = {};
        let h = cloneDeep(isHidden);

        if (h && h.length > 0) {
            if (!h.forEach) {
                h = [h];
            }

            h.forEach((el) => {
                obj[el] = true;
            });
        }

        return obj;
    }

}
