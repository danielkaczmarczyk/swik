import { unimplemented } from "./utils.ts";

export class ListNode<T> {
  data: T;
  next: ListNode<T> | null;

  constructor(data: T, next: ListNode<T> | null) {
    this.data = data;
    this.next = next;
  }
}

export class LinkedList<T> {
  head: ListNode<T> | null;
  length: number;

  constructor(head: ListNode<T> | null) {
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

  // TODO handle empty list
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
    this.incrementLength();
    return node;
  }

  insertAtPosition(node: ListNode<T>) {
    unimplemented();
  }

  search(data: T) {
    let currentNode = this.getHead();
    while (currentNode?.next) {
      if (currentNode.data === data) {
        return currentNode;
      }
      currentNode = currentNode.next;
    }
    return null;
  }

  delete(data: T) {
    unimplemented();
  }

  isEmpty() {
    return this.head === null;
  }
}
