import { Algorithm } from "./algorithm";

export class Mergesort extends Algorithm {

    // TODO fix
    // @ts-ignore
    async sort(data: number[], callback: (data: number[]) => void): any {
        let items = data.map((d, i) => new Item(d, i));
        await this.mergeSort(items, data, callback);
    }

    // https://hackernoon.com/programming-with-js-merge-sort-deb677b777c0
    // TODO fix
    // @ts-ignore
    async mergeSort(items: Item[], original: number[], callback: (data: number[]) => void): any {
        if (items.length == 1) {
            return items;
        }

        let middle = Math.floor(items.length / 2);
        let left = items.slice(0, middle);
        let right = items.slice(middle);
        return await this.merge(await this.mergeSort(left, original, callback), await this.mergeSort(right, original, callback), original, callback);
    }

    async merge(left: Item[], right: Item[], original: number[], callback: (data: number[]) => void) {
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

                left = left.map((item, i) => {
                    if (i >= indexLeft) {
                       item.index += 1;
                   }
                    return item;
                });
                await Algorithm.sleep(10);
                callback(original);

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