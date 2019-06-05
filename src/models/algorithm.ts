export abstract class Algorithm {
    public abstract async sort(data: number[], callback: (data: number[]) => void): Promise<any>;

    static sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}