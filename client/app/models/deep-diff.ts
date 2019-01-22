export enum kind {
    'N', // new property/element
    'D', // deleted property/element
    'E', // property/element was edited
    'A', // change occurred within an array
}

export interface DeepDiff {
    kind: kind;
    path?: string;
    lhs?: any;
    rhs?: any;
    index?: number;
    item?: DiffNew;
}

export interface DiffNew {
    kind: 'N';
    rhs: any;
}

export interface DeepArray {
    index: number;
    item: DiffNew;
    kind: 'A';
}
