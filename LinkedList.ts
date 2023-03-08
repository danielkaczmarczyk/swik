export class ListNode<T> {
  data: T;
  next: ListNode<T> | null;

  constructor(data: T, next: ListNode<T> | null) {
    this.data = data;
    this.next = next;
  }
}

export class LinkedList<T> {
  head: ListNode<T>;

  constructor(head: ListNode<T>) {
    this.head = head;
  }

  // TODO handle empty list
  getHead() {
    return this.head;
  }

  getTail() {
    let currentNode = this.getHead();
    while (currentNode.next) {
      currentNode = currentNode.next;
    }
    return currentNode;
  }

  insertAtTail(node: ListNode<T>) {
    const tail = this.getTail();
    tail.next = node;
    return node;
  }
}
