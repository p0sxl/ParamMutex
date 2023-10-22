import MutexItem from "./MutexItem"

class Queue {

    map: any
    constructor(){
        this.map = {}
    }
    get(key: string):MutexItem{
        return this.map[key]
    }
    set(key: string, value: any){
        this.map[key] = value
    }

}



export default Queue