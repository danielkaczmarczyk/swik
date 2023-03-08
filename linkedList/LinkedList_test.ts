import { assertEquals } from "https://deno.land/std@0.178.0/testing/asserts.ts";

import { LinkedList, ListNode } from "./LinkedList.ts";

// niceties
const test = Deno.test;

// helpers
function createList<T>(data: Array<T>) {
  const ll = new LinkedList<T>(null);
  ll.populate(data);
  return ll;
}

// tests
test("Linked List can be created", () => {
  const ll = new LinkedList<number>();
  assertEquals(ll.getHead(), null);
});

test("Inserting at tail", () => {
  const ll = createList([1, 2, 3]);
  const newNode = new ListNode<number>(6, null);
  ll.insertAtTail(newNode);
  const tail = ll.getTail();
  assertEquals(tail, newNode);
});

test("Inserting at head", () => {
  const ll = createList([1, 2, 3]);
  const oldLength = ll.length;
  const newHeadNode = new ListNode<number>(15, null);
  ll.insertAtHead(newHeadNode);
  const newHead = ll.getHead();
  const newLength = ll.length;
  assertEquals(newHead, newHeadNode);
  assertEquals(oldLength + 1, newLength);
});

test("Deleting at head", () => {
  const ll = createList([3, 5, 10, 15]);
  const lengthBeforeDeletion = ll.length;
  ll.delete(3);
  const lengthAfterDeletion = ll.length;
  assertEquals(lengthBeforeDeletion, lengthAfterDeletion + 1);
  const missingNode = ll.search(3);
  assertEquals(missingNode, null);
});

test({
  name: "To array",
  fn() {
    const arrayedLL = createList([1, 2, 3, 4, 5]).toArray();
    assertEquals(arrayedLL, [1, 2, 3, 4, 5, null]);
  },
});

test({
  name: "Deleting many",
  fn() {
    const ll = createList([1, 2, 3, 4, 5, 6, 7]);
    const lengthBeforeDeletions = ll.length;
    for (const int of [3, 5, 6]) {
      ll.delete(int);
    }
    const lengthAfterDeletions = ll.length;
    assertEquals(lengthAfterDeletions + 3, lengthBeforeDeletions);
    assertEquals(ll.print(false), [1, 2, 4, 7, null]);
  },
});

test({
  name: "Deleting one",
  fn() {
    const ll = createList([1,2,3,4,5,6,7,8])
    const lengthBeforeDeletion = ll.length;
    ll.delete(5)
    assertEquals(lengthBeforeDeletion, ll.length + 1)
    assertEquals(ll.print(false), [1,2,3,4,6,7,8, null])
  },
});

test({
  name: "Deleting at tail",
  fn() {
    const ll = createList([1,2,3,4,5,6,7,8])
    const lengthBeforeDeletion = ll.length;
    ll.delete(8)
    assertEquals(lengthBeforeDeletion, ll.length + 1)
    assertEquals(ll.print(false), [1,2,3,4,5,6,7, null])
  },
});

test("Searching", () => {
  const ll = createList([1, 2, 3, 15]);
  const result = ll.search(15);
  assertEquals(result?.data, 15);
});

test("Checking if it is not empty", () => {
  const ll = new LinkedList<number>(new ListNode(3, null));
  const result = ll.isEmpty();
  assertEquals(result, false);
});

test("Checking if it is empty", () => {
  const ll = new LinkedList<number>(null);
  const result = ll.isEmpty();
  assertEquals(result, true);
});
