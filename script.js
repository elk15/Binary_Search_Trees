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

    levelOrder(callback = null) {
        let queue = [this.root];
        let results = [];
        while(Array.isArray(queue) && queue.length) {
            let currentNode = queue.shift();
            callback !== null ? results.push(callback(currentNode)) : results.push(currentNode.data);
            if (currentNode.leftChild !== null) queue.push(currentNode.leftChild);
            if (currentNode.rightChild !== null) queue.push(currentNode.rightChild);
        }
        if(results) return results;
    }
    
    levelOrderRec(callback = null, queue = [this.root], results = []) {
        if (Array.isArray(queue) && queue.length) {
            let currentNode = queue.shift();
            callback !== null ? results.push(callback(currentNode)) : results.push(currentNode.data);
            if (currentNode.leftChild !== null) queue.push(currentNode.leftChild);
            if (currentNode.rightChild !== null) queue.push(currentNode.rightChild);
            this.levelOrderRec(callback, queue, results)
        }
        if (results) return results;
    }

    inorder(callback = null, node = this.root, results = []) {
        if (node === null) return;
        this.inorder(callback, node.leftChild, results);
        callback !== null ? results.push(callback(node)) : results.push(node.data);
        this.inorder(callback, node.rightChild, results);
        if(results) return results;
    }

    postorder(callback = null, node = this.root, results = []) {
        if (node === null) return;
        this.postorder(callback, node.leftChild, results);
        this.postorder(callback, node.rightChild, results);
        callback !== null ? results.push(callback(node)) : results.push(node.data);
        if(results) return results;
    }

    preorder(callback = null, node = this.root, results = []) {
        if (node === null) return;
        callback !== null ? results.push(callback(node)) : results.push(node.data);
        this.preorder(callback, node.leftChild, results);
        this.preorder(callback, node.rightChild, results);
        if(results) return results;
    }

    height(node) {
        if (node === null) return 0;
        if (node.leftChild === null && node.rightChild === null) return 0;
        return 1 +  Math.max(this.height(node.leftChild), this.height(node.rightChild));
    }

    depth(node, root = this.root) {
        if (node === null) return 0;
        if (node.data === root.data) return 0;
        if (node.data < root.data) return 1 + this.depth(node, root.leftChild);
        if (node.data > root.data) return 1 + this.depth(node, root.rightChild);
    }

    isBalanced(node = this.root) {
        if (node === null) return true;
        let heightDiff = Math.abs(this.height(node.leftChild) - this.height(node.rightChild));
        return heightDiff <= 1 && this.isBalanced(node.leftChild) && this.isBalanced(node.rightChild);
    }

    rebalance() {
        let inorderArray = this.inorder();
        this.root = this.buildTree(inorderArray, 0, inorderArray.length - 1);
    }
}

module.exports = Tree;



