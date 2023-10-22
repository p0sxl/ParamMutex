import MutexItem from "./MutexItem";
declare class Queue {
    map: any;
    constructor();
    get(key: string): MutexItem;
    set(key: string, value: any): void;
}
export default Queue;
