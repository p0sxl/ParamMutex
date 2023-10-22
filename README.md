# ParamMutex

![GitHub](https://img.shields.io/badge/p0sxl-Param%20Mutex%20-blue)

Mutex Library is a JavaScript library for managing mutex operations that are parameterized. This library is designed to address concurrency issues and prevent race conditions when accessing specific resources. Mutex is particularly useful for organizing and synchronizing asynchronous operations.

## Table of Contents
- [Mutex Parameters](#mutex-parameters)
  - [Table of Contents](#table-of-contents)
  - [Demo](#demo)
  - [Installation](#installation)
  - [Usage](#usage)
  - [License](#license)


## Demo
![Mutex Library Demo](https://imageupload.io/ib/FJCLH4YOH1ewFul_1698010515.gif)


## Installation


```bash
npm install param-mutex
```
## Usage

An example scenario of using the Mutex library:

```javascript
const {Mutex} = require('param-mutex')
const mutex = new Mutex('EXAMPLE_CHANNEL')

const decreaseAmountFromWallet = async (userId, amount) => {
    const { release } = await mutex.lock([userId], ['userId']);

    try {
        const walletTotal = await getWallet(userId);

        if (walletTotal >= amount) {
            await updateWallet(userId, -1 * amount);
        } else {
            throw new Error("Wallet amount is not enough");
        }

        release();

        return 1;
    } catch (e) {
        release();
        return 0;
    }
}
```

## License

This project is licensed under the terms of the MIT License


