import { camelCase, upperFirst } from 'lodash';

export class Utils {
    static convertToClassName(str) {
        return upperFirst(camelCase(str));
    }

    static convertToCollectionName(str) {
        return camelCase(str);
    }
}
