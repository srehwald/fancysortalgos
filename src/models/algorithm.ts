export abstract class Algorithm {
    public abstract sort(data: number[], callback: (data: number[]) => void): any;

    static sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}