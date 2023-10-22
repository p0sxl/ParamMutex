"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MutexItem {
    constructor() {
        this.isLocked = false;
        this.queue = [];
    }
    lock() {
        return new Promise((resolve, reject) => {
            const acquireLock = () => {
                if (!this.isLocked) {
                    this.isLocked = true;
                    resolve({
                        release: () => {
                            this.unlock();
                        }
                    });
                }
                else {
                    this.queue.push(acquireLock);
                }
            };
            acquireLock();
        });
    }
    unlock() {
        this.isLocked = false;
        const nextLock = this.queue.shift();
        if (nextLock) {
            nextLock();
        }
    }
}
exports.default = MutexItem;
//# sourceMappingURL=MutexItem.js.map