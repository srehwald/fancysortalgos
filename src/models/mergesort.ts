import { Algorithm } from "./algorithm";
import * as _ from "lodash";

export class MergeSort extends Algorithm{
    constructor() {
        super("MergeSort");
    }

    sort(data: number[]): number[][] {
        let items = data.map((d, i) => new Item(d, i));
        const steps: number[][] = [];

        this.mergeSort(items, data, steps);
        return steps;
    }

    // https://hackernoon.com/programming-with-js-merge-sort-deb677b777c0
    mergeSort(items: Item[], original: number[], steps: number[][]): Item[] {
        if (items.length === 1) {
            return items;
        }

        let middle = Math.floor(items.length / 2);
        let left = items.slice(0, middle);
        let right = items.slice(middle);
        return this.merge(this.mergeSort(left, original, steps), this.mergeSort(right, original, steps), original, steps);
    }

    merge(left: Item[], right: Item[], original: number[], steps: number[][]) {
        const result = [];
        let indexLeft = 0;
        let indexRight = 0;

        while (indexLeft < left.length && indexRight < right.length) {
            if (left[indexLeft].value < right[indexRight].value) {
                result.push(left[indexLeft]);
                indexLeft++;
            } else {
                // https://stackoverflow.com/questions/5306680/move-an-array-element-from-one-array-position-to-another
                original.splice(left[indexLeft].index, 0, original.splice(right[indexRight].index, 1)[0]);
                right[indexRight].index = left[indexLeft].index;

                // TODO fix no-loop-func
                // eslint-disable-next-line
                left = left.map((item, i) => {
                    if (i >= indexLeft) {
                       item.index += 1;
                   }
                    return item;
                });
                
                steps.push(_.clone(original));

                result.push(right[indexRight]);
                indexRight++;
            }
        }

        return result.concat(left.slice(indexLeft)).concat(right.slice(indexRight));
    }



}

class Item {
    private _value: number;
    private _index: number;

    constructor(value: number, index: number) {
        this._value = value;
        this._index = index;
    }


    get value(): number {
        return this._value;
    }

    get index(): number {
        return this._index;
    }

    set value(value: number) {
        this._value = value;
    }

    set index(value: number) {
        this._index = value;
    }
}