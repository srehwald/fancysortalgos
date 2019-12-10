export class Util {
    static sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    static isSorted(data: number[]): boolean {
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