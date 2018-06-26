export class AsyncBlockingQueue<T> {
    private _promises: Promise<T>[];
    private _resolvers: ((t: T) => void)[];

    constructor(
        private size: number
    ) {
        this._resolvers = new Array(this.size);
        this._promises = [];
    }

    private _add() {
        this._promises.push(new Promise(resolve => {
            this._resolvers.push(resolve);
        }));
    }

    put(t: T) {
        if (!this._resolvers.length || this._resolvers.length < this.size) {
            this._add();
        }
        const resolve: any = this._resolvers.shift();
        if (!resolve) {
            // can never happen
            throw new Error('resolve function was null or undefined when attempting to enqueue.');
        }
        resolve(t);
    }

    get() {
        if (!this._promises.length) {
            this._add();
        }
        const promise: any = this._promises.shift();
        if (!promise) {
            // can never happen
            throw new Error('promise was null or undefined when attempting to dequeue.');
        }
        return promise;
    }

    isEmpty() {
        return !this._promises.length;
    }

    isBlocked() {
        return !!this._resolvers.length;
    }

    get length() {
        return this._promises.length - this._resolvers.length;
    }
}
