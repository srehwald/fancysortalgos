export abstract class Algorithm {
    private _name: string;
    
    constructor(name: string) {
        this._name = name;
    }

    public abstract sort(data: number[]): number[][];

    get name(): string {
        return this._name;
    }
}