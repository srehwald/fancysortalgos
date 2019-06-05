import { Algorithm } from "./algorithm";

export class Insertionsort extends Algorithm {
    async sort(data: number[], callback: (data: number[]) => void): Promise<void> {
        for (let i = 0; i < data.length; i++) {
            if (i > 0) {
                for (let k = i; k >= 0; k--) {
                    if (data[k] < data[k - 1]) {
                        // if the element at k is smaller than the one at k-1, we need to swap them
                        const temp = data[k - 1];
                        data[k - 1] = data[k];
                        data[k] = temp;

                        // update diagram
                        callback(data);
                        await Algorithm.sleep(5);
                    }
                }
            }
        }
    }

}