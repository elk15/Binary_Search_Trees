const Tree = require('./script.js');

class Driver {
    static getRandomArray(length = 20, arr = []) {
        if(length === 0) return arr;
        arr.push(Math.floor(Math.random() * 100));
        return this.getRandomArray(length - 1, arr);
    }

    static main() {
        const randomArr = Driver.getRandomArray(15);
        const tree = new Tree(randomArr);

        console.log('Original Tree:');
        tree.prettyPrint(tree.root);
        console.log(tree.isBalanced());

        console.log(tree.levelOrderRec());
        console.log(tree.preorder());
        console.log(tree.postorder());
        console.log(tree.inorder());
        console.log('---------------------');

        console.log('Unbalanced Tree:');
        tree.insert(200);
        tree.insert(140);
        tree.insert(1000);
        tree.insert(3404);
        tree.prettyPrint(tree.root);
        console.log(tree.isBalanced());
        console.log('---------------------');

        console.log('Rebalanced Tree:');
        tree.rebalance();
        tree.prettyPrint(tree.root);
        console.log(tree.isBalanced());
        console.log(tree.levelOrderRec());
        console.log(tree.preorder());
        console.log(tree.postorder());
        console.log(tree.inorder());

    }
}

Driver.main();

