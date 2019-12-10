import { Algorithm } from "./algorithm";
import * as _ from "lodash";

export class Bogosort extends Algorithm{
    private static readonly MAX_ITERATIONS = 1337;

    constructor() {
        super("Bogosort");
    }

    sort(data: number[]): number[][]{
        const steps: number[][] = [];
        let counter = 0;

        while (!Bogosort.isSorted(data) && counter < Bogosort.MAX_ITERATIONS) {
            // shuffle data as long it is not sorted
            data = _.shuffle(data);
            steps.push(_.clone(data));
            counter++;
        }

        return steps;
    }

    private static isSorted(data: number[]): boolean {
        // if data has length smaller than 2, it is sorted by default
        if (data.length < 2) {
            return true;
        }

        for (let i = 0; i < data.length; i++) {
            // if a smaller item follows a greater one, the data is not sorted
            if (data[i] > data[i+1]) {
                return false;
            }
        }

        return true;
    }

}