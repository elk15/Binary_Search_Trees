const Tree = require('./script.js');

class Driver {
    static getRandomArray(length = 20, arr = []) {
        if(length === 0) return arr;
        arr.push(Math.floor(Math.random() * 100));
        return this.getRandomArray(length - 1, arr);
    }

    main() {

    }
}

console.log(Driver.getRandomArray());
