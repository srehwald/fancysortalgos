export abstract class Algorithm {
    private _name: string;
    
    constructor(name: string) {
        this._name = name;
    }

    public abstract async sort(data: number[], callback: (data: number[]) => void): Promise<any>;

    static sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    get name(): string {
        return this._name;
    }
}