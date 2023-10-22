"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Queue {
    constructor() {
        this.map = {};
    }
    get(key) {
        return this.map[key];
    }
    set(key, value) {
        this.map[key] = value;
    }
}
exports.default = Queue;
//# sourceMappingURL=Queue.js.map