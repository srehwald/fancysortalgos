import { Algorithm } from "./algorithm";
import * as _ from "lodash";

export class InsertionSort extends Algorithm{
    constructor() {
        super("InsertionSort");
    }

    sort(data: number[]): number[][] {
        const steps: number[][] = [_.clone(data)];

        for (let i = 0; i < data.length; i++) {
            if (i > 0) {
                for (let k = i; k >= 0; k--) {
                    if (data[k] < data[k - 1]) {
                        // if the element at k is smaller than the one at k-1, we need to swap them
                        const temp = data[k - 1];
                        data[k - 1] = data[k];
                        data[k] = temp;

                        steps.push(_.clone(data));
                    }
                }
            }
        }

        return steps;
    }

}