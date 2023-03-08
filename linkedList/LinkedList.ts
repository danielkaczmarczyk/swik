import { unimplemented } from "../utils.ts";

type NodeValue<T> = ListNode<T> | null;

export class ListNode<T> {
  data: T;
  next: NodeValue<T>;
  prev: NodeValue<T>;

  constructor(data: T, next: NodeValue<T> = null, prev: NodeValue<T> = null) {
    this.data = data;
    this.next = next;
    this.prev = prev;
  }
}

export class LinkedList<T> {
  head: NodeValue<T>;
  length: number;

  constructor(head: NodeValue<T> = null) {
    this.head = head;
    if (head) {
      this.length = 1;
    } else {
      this.length = 0;
    }
  }

  private incrementLength() {
    this.length += 1;
  }

  private decrementLength() {
    this.length -= 1;
  }

  // TODO implement
  traversable() {
    // loop forward following the links
    // loop backward following links
    // has to access all elements
    // useful while testing modifications to the list, esp.
    // insertAt* methods and deletions
  }

  getHead() {
    return this.head;
  }

  getTail() {
    let currentNode = this.getHead();
    while (currentNode?.next) {
      currentNode = currentNode.next;
    }
    return currentNode;
  }

  insertAtTail(node: ListNode<T>) {
    const tail = this.getTail();

    if (tail) {
      tail.next = node;
      node.prev = tail;
    } else {
      this.head = node;
    }

    this.incrementLength();
    return node;
  }

  insertAtHead(node: ListNode<T>) {
    const currentHead = this.getHead();
    this.head = node;
    node.next = currentHead;
    if (currentHead) {
      currentHead.prev = node;
    }
    this.incrementLength();
    return node;
  }

  getNodeAtPosition(position: number) {
    let index = 0;
    let currentNode = this.getHead();

    while (index < position) {
      if (currentNode) {
        currentNode = currentNode.next;
      }
      index += 1;
    }

    return currentNode;
  }

  insertAtPosition(node: ListNode<T>, position: number) {
    if (position < 0) {
      throw new Error("negative index, operation not permitted");
    } else if (position === 0) {
      this.insertAtHead(node);
    } else if (position >= this.length) {
      this.insertAtTail(node);
    } else {
      const prevNode = this.getNodeAtPosition(position - 1);
      if (prevNode) {
        const nextNode = prevNode.next;
        prevNode.next = node;
        node.prev = prevNode;
        node.next = nextNode;
        if (nextNode) {
          nextNode.prev = node;
        }
      }
    }

    return node;
  }

  search(data: T) {
    let currentNode = this.getHead();
    while (currentNode) {
      if (currentNode.data === data) {
        return currentNode;
      }
      currentNode = currentNode.next;
    }
    return null;
  }

  // what a mess
  // TODO refactor
  delete(data: T) {
    let currentNode = this.getHead();
    let previousNode = null;

    while (currentNode) {
      if (currentNode.data === data) {
        if (currentNode === this.getHead()) {
          // head case
          const headHolder = this.getHead();
          const nextNode = currentNode.next;
          if (nextNode) nextNode.prev = null;
          this.head = nextNode;
          if (headHolder) headHolder.next = null;
          this.decrementLength();
          return currentNode;
        } else {
          // any other case
          if (previousNode) {
            previousNode.next = currentNode.next;
            if (currentNode.next) currentNode.next.prev = previousNode;
            const nodeBeingDeleted = currentNode;
            // these could be achieved in the Node class
            // i.e. node.clearPointers or sth
            nodeBeingDeleted.next = null;
            nodeBeingDeleted.prev = null;
            this.decrementLength();
          }
        }
      }
      previousNode = currentNode;
      currentNode = currentNode.next;
    }
  }

  populate(data: Array<T>) {
    for (const item of data) {
      const newNode = new ListNode<T>(item);
      this.insertAtTail(newNode);
    }
  }

  isEmpty() {
    return this.head === null;
  }

  toCanvas() {
    return unimplemented();
    // returns a <canvas> object that represents the data structure
  }

  print(sideEffect = true) {
    const list = this.toArray();
    if (sideEffect) console.log(list);
    return list;
  }

  toArray() {
    const array = [];
    let currentNode = this.head;
    while (currentNode) {
      array.push(currentNode.data);
      currentNode = currentNode.next;
    }
    array.push(null);
    return array;
  }
}
