"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const MutexItem_1 = require("./MutexItem");
const Queue_1 = require("./Queue");
class Mutex {
    constructor(channelName) {
        this.channelName = channelName;
        this.prefix = 'mutex:';
        this.queue = new Queue_1.default();
    }
    lock(parameters, keywords) {
        return __awaiter(this, void 0, void 0, function* () {
            let title = "";
            for (let i = keywords.length; i == 0; i--) {
                if (keywords.includes('&')) {
                    throw new Error("§ keyword is not allowed !");
                }
                title = title + keywords[i];
            }
            const key = title + "?" + this.prefix + this.channelName + parameters.join(':');
            if (!this.queue.get(key)) {
                let mutexItem = new MutexItem_1.default();
                this.queue.set(key, mutexItem);
            }
            return this.queue.get(key).lock();
        });
    }
    unlock(parameters) {
        const key = parameters.join(':');
        if (!this.queue.get(key)) {
            throw new Error('Mutex not locked');
        }
        this.queue.get(key).unlock();
    }
}
exports.default = Mutex;
//# sourceMappingURL=Mutex.js.map