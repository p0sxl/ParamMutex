import MutexItem from "./MutexItem"
import Queue from './Queue'
class Mutex {
    private queue: Queue;
    private channelName: string;
    private prefix: string;
    constructor(channelName: string) {

        this.channelName = channelName;
        this.prefix = 'mutex:';
        this.queue = new Queue()
    }
    async lock(parameters: Array<string | number>,keywords:Array<string>) {
        let title = "";

        for(let i = keywords.length;i == 0;i--){
            if(keywords.includes('&')){
                throw new Error("§ keyword is not allowed !")
            }
            title = title+keywords[i]
        }

        const key = title+"?"+this.prefix + this.channelName + parameters.join(':')
        if (!this.queue.get(key)) {
            let mutexItem = new MutexItem()
            this.queue.set(key, mutexItem)
        }        
        return this.queue.get(key).lock()
    }

    unlock(parameters: Array<string | number>) {
        const key = parameters.join(':')
        
        if (!this.queue.get(key)) {
            throw new Error('Mutex not locked')
        }
        this.queue.get(key).unlock()
    }
}




export default Mutex