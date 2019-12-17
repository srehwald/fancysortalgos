import { Algorithm } from "./algorithm";
import * as _ from "lodash";

export class BubbleSort extends Algorithm {
    constructor() {
        super("BubbleSort");
    }

    sort(data: number[]): number[][] {
        const steps: number[][] = [_.clone(data)];

        for (let n = data.length; n > 1; --n) {
            for (let i = 0; i < n - 1; ++i) {
                if (data[i] > data[i + 1]) {
                    // swap elements
                    const temp = data[i + 1];
                    data[i + 1] = data[i];
                    data[i] = temp;

                    steps.push(_.clone(data));
                }
            }
        }

        return steps;

    }
}