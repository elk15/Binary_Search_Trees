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

    insert(value, node = this.root) {
        if (value < node.data) {
            if (node.leftChild === null) {
                node.leftChild = new Node(value);
                return;
            } else {
                this.insert(value, node.leftChild);
            }
        } else {
            if (node.rightChild === null) {
                node.rightChild = new Node(value);
                return;
            } else {
                this.insert(value, node.rightChild);
            }
        }
    }

    delete(value, node = this.root) {
        if (node === null) return node;

        if (value < node.data) {
            node.leftChild = this.delete(value, node.leftChild);
            return node;
        } else if (value > node.data) {
            node.rightChild = this.delete(value, node.rightChild);
            return node;
        }

        // // if it's leaf node with no children
        if (node.leftChild === null && node.rightChild === null) {
            return null;
        }

        // if it only has one child
        if (node.leftChild === null) {
            return node.rightChild;
        } else if (node.rightChild === null) {
            return node.leftChild;
        }
        // if it has two children
        else {
            let parent = node;
            let successor = node.rightChild;
            while(successor.leftChild !== null) {
                parent = successor;
                successor = successor.leftChild;
            }
            if(parent === node) {
                parent.rightChild = successor.rightChild;
            } else {
                parent.leftChild = successor.rightChild;
            }
            node.data = successor.data;

            return node;
        }
    }

    find(value, node = this.root) {
        if(value < node.data) {
            return this.find(value, node.leftChild); 
        } else if (value > node.data) {
            return this.find(value, node.rightChild); 
        }
        return node;
    }
}

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
tree.prettyPrint(tree.getRoot());
console.log(tree.find(3));
