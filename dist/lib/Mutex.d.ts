declare class Mutex {
    private queue;
    private channelName;
    private prefix;
    constructor(channelName: string);
    lock(parameters: Array<string | number>, keywords: Array<string>): Promise<import("./interface/ILock").default>;
    unlock(parameters: Array<string | number>): void;
}
export default Mutex;
