import { Algorithm } from "./algorithm";
import * as _ from "lodash";

export class Bogosort extends Algorithm {
    async sort(data: number[], callback: (data: number[]) => void): Promise<void> {
        while (!Bogosort.isSorted(data)) {
            // shuffle data as long it is not sorted
            data = _.shuffle(data);

            // update diagram
            callback(data);
            await Algorithm.sleep(5);
        }
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