import { Algorithm } from "./algorithm";

export class BubbleSort extends Algorithm {
    async sort(data: number[], callback: (data: number[]) => void): Promise<void> {
        for (let n = data.length; n > 1; --n) {
            for (let i = 0; i < n - 1; ++i) {
                if (data[i] > data[i + 1]) {
                    // swap elements
                    const temp = data[i + 1];
                    data[i + 1] = data[i];
                    data[i] = temp;

                    // update diagram
                    callback(data);
                    await Algorithm.sleep(5);
                }
            }
        }
    }
}