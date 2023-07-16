class Node {
    constructor(data = null) {
        this.data = data;
        this.leftChild = null;
        this.rightChild = null;
    }
}

class Tree {
    constructor(array) {
        let sortedArr = this.sortArray(this.removeDuplicates(array));
        this.root = this.buildTree(sortedArr, 0, sortedArr.length - 1);
    }

    getRoot() {
        return this.root;
    }

    removeDuplicates(array) {
        return Array.from(new Set(array));
    }

    sortArray(array) {
        return array.sort((a, b) => a - b);
    }

    buildTree(array, start, end) {
        if (start > end) return null;
        let mid = parseInt((start + end) / 2);
        let node = new Node(array[mid]);
        node.leftChild = this.buildTree(array, start, mid - 1);
        node.rightChild = this.buildTree(array, mid + 1, end);
        return node;
    }

    prettyPrint(node, prefix = "", isLeft = true) {
        if (node === null) {
            return;
        }
        if (node.rightChild !== null) {
            this.prettyPrint(node.rightChild, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.leftChild !== null) {
            this.prettyPrint(node.leftChild, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    }
}

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
tree.prettyPrint(tree.getRoot());