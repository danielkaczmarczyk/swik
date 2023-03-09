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
  valuesSet: Set<T> = new Set();

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

  /**
   * Converts the linked list into a native js array with .data members as
   * values.
   */
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

  /**
   * Calculates the length of the linked list in O(n) time. If you want O(1)
   * performance, use the .length class property.
   */
  calculateLength() {
    let currentNode = this.head;
    let len = 0;
    while (currentNode) {
      len++;
      currentNode = currentNode.next;
    }

    return len;
  }

  /**
   * Returns the index of the middle element of the list, skewed left
   * (that means that if there is an even number of elements in the list,
   * the index will point to the left element of the middle pair).
   *
   * This is a slower way to get the length of a linked list. To do it faster
   * just use the .length property on this class.
   *
   * Implementation using slow/fast pointers for fun.
   */
  findMiddle() {
    if (this.length < 3) {
      return 0;
    }

    let slowPointer = this.head;
    let index = 0;

    // @ts-ignore: I know it will exist, see checking for length above
    let fastPointer = this.head.next.next;

    while (fastPointer) {
      // @ts-ignore: slow pointer will never not exist, since fast pointer
      // would have reached the end of the list first.
      slowPointer = slowPointer.next;
      index++;

      fastPointer = fastPointer.next;

      if (fastPointer) {
        fastPointer = fastPointer.next;
      }
    }

    return index;
  }

  removeDuplicates() {
    const items = new Set();

    let currentNode = this.head;

    while (currentNode) {
      if (items.has(currentNode.data)) {
        this.delete(currentNode.data);
      } else {
        items.add(currentNode.data);
      }
      currentNode = currentNode.next;
    }

    return this.length;
  }

  union(otherList: LinkedList<T>) {
    const tail = this.getTail();
    const otherHead = otherList.getHead();
    const otherLength = otherList.length;

    if (tail) tail.next = otherHead;
    if (otherHead) otherHead.prev = tail;
    otherList.head = null;
    this.length += otherLength;
  }

  setSet() {
    const values = new Set<T>();
    let currentNode = this.head;

    while (currentNode) {
      values.add(currentNode.data);
      currentNode = currentNode.next;
    }

    this.valuesSet = values;
  }

  intersection(otherList: LinkedList<T>) {
    this.setSet();
    otherList.setSet();

    const intersection = [...this.valuesSet].filter((x) =>
      otherList.valuesSet.has(x)
    );

    const newList = new LinkedList<T>();
    newList.populate(intersection);

    return newList;
  }
}
