const {Mutex} = require('param-mutex')
require('colors');
const mutex = new Mutex('EXAMPLE_CHANNEL')

/**
 * [userId] : amount
 */
const _wallet = {
    "1": 100,
    "2": 503,
    "3": 433,
    "4": 654,
    "5": 204
}

const middlewareWalletHandler = {
    get: (data, parameter) => {
        return data[parameter]
    },
    set: (_, parameter, n) => {
        let calculate = n

        let colorSelector = (userId) => {

            if (userId == 1) return console.log(`user : ${parameter} : ${_[parameter]} -> ${calculate} `.red)

            if (userId == 2) return console.log(`user : ${parameter} : ${_[parameter]} -> ${calculate} `.green)

            if (userId == 3) return console.log(`user : ${parameter} : ${_[parameter]} -> ${calculate} `.yellow)

            if (userId == 4) return console.log(`user : ${parameter} : ${_[parameter]} -> ${calculate} `.blue)

            if (userId == 5) return console.log(`user : ${parameter} : ${_[parameter]} -> ${calculate} `.magenta)
           

        }

        let clr = colorSelector(parameter)

        
        _[parameter]=n

        return true
    }
}
const wallet = new Proxy(_wallet, middlewareWalletHandler)


const getWallet = (userId) => new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(wallet[userId])
    }, Math.floor(Math.random() * 10))

})

const updateWallet = (userId, amount) => new Promise((resolve, reject) => {
    setTimeout(() => {
        wallet[userId] = wallet[userId] + amount
        resolve(1)
    }, Math.floor(Math.random() * 1000))
})


const decreaseAmountFromWallet = async (userId, amount) => {
    const { release } = await mutex.lock([userId], ['userId'])

    try {

        const walletTotal = await getWallet(userId);
        if (walletTotal >= amount) {
            await updateWallet(userId, -1 * amount)
        }
        else throw new Error("Wallet amount is not enough")

        release();

        return 1

    } catch (e) {
        release();
        return 0;
    }
}

const main = async () => {
    let users = [1, 2, 3, 4, 5, 1, 4, 2, 3, 4, 5, 3, 3, 2,4,5,1,2,3,3,4,5,1,2,3,3,3,2,3,1,1]
    let startWallet = JSON.parse(JSON.stringify(_wallet))
    let promiseList = [];
    let totalDecrease = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0
    }
    users.forEach(e => {
        let rand = Math.floor(Math.random() * 10);
        totalDecrease[e] = totalDecrease[e] + rand;
        let promise = decreaseAmountFromWallet(e, rand)
        promiseList.push(promise)
    })

  

    await Promise.allSettled(promiseList)
    console.log("**********************")
    Object.keys(totalDecrease).forEach(userId => {
        if(startWallet[userId] - totalDecrease[userId] == wallet[userId]){
            console.info(`user:${userId}'s amount is correct  !`)
        }else{
            console.error(`user:${userId} is error !`)
        }


    })
}


main()