import ILock from "./interface/ILock";

class MutexItem {
  isLocked: boolean;
  queue: Array<Function>;

  constructor() {
    this.isLocked = false;
    this.queue = [];
  }

  lock():Promise<ILock>{
    return new Promise((resolve, reject) => {
      const acquireLock = () => {
        if (!this.isLocked) {
          this.isLocked = true;

          resolve({
            release : ()=>{
              this.unlock()
            }
          })
        } else {
          this.queue.push(acquireLock);
        }
      };
      acquireLock();


    });
  }

  unlock():any {
    this.isLocked = false;
    const nextLock = this.queue.shift();
    if (nextLock) {
      nextLock();
    }
    
  }
}

export default MutexItem;
