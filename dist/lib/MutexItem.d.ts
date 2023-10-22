import ILock from "./interface/ILock";
declare class MutexItem {
    isLocked: boolean;
    queue: Array<Function>;
    constructor();
    lock(): Promise<ILock>;
    unlock(): any;
}
export default MutexItem;
