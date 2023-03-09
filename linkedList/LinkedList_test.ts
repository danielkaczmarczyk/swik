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
test("new", () => {
  const ll = new LinkedList<number>();
  assertEquals(ll.getHead(), null);
});

test("insertAtTail", () => {
  const ll = createList([1, 2, 3]);
  const newNode = new ListNode<number>(6, null);
  ll.insertAtTail(newNode);
  const tail = ll.getTail();
  assertEquals(tail, newNode);
});

test("insertAtHead", () => {
  const ll = createList([1, 2, 3]);
  const oldLength = ll.length;
  const newHeadNode = new ListNode<number>(15, null);
  ll.insertAtHead(newHeadNode);
  const newHead = ll.getHead();
  const newLength = ll.length;
  assertEquals(newHead, newHeadNode);
  assertEquals(oldLength + 1, newLength);
});

test("delete at head", () => {
  const ll = createList([3, 5, 10, 15]);
  const lengthBeforeDeletion = ll.length;
  ll.delete(3);
  const lengthAfterDeletion = ll.length;
  assertEquals(lengthBeforeDeletion, lengthAfterDeletion + 1);
  const missingNode = ll.search(3);
  assertEquals(missingNode, null);
});

test({
  name: "toArray",
  fn() {
    const arrayedLL = createList([1, 2, 3, 4, 5]).toArray();
    assertEquals(arrayedLL, [1, 2, 3, 4, 5, null]);
  },
});

test({
  name: "delete many",
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
  name: "delete one",
  fn() {
    const ll = createList([1, 2, 3, 4, 5, 6, 7, 8]);
    const lengthBeforeDeletion = ll.length;
    ll.delete(5);
    assertEquals(lengthBeforeDeletion, ll.length + 1);
    assertEquals(ll.print(false), [1, 2, 3, 4, 6, 7, 8, null]);
  },
});

test({
  name: "delete at tail",
  fn() {
    const ll = createList([1, 2, 3, 4, 5, 6, 7, 8]);
    const lengthBeforeDeletion = ll.length;
    ll.delete(8);
    assertEquals(lengthBeforeDeletion, ll.length + 1);
    assertEquals(ll.print(false), [1, 2, 3, 4, 5, 6, 7, null]);
  },
});

test("search", () => {
  const ll = createList([1, 2, 3, 15]);
  const result = ll.search(15);
  assertEquals(result?.data, 15);
});

test("isEmpty when full", () => {
  const ll = new LinkedList<number>(new ListNode(3, null));
  const result = ll.isEmpty();
  assertEquals(result, false);
});

test("isEmpty when empty", () => {
  const ll = new LinkedList<number>(null);
  const result = ll.isEmpty();
  assertEquals(result, true);
});

test({
  name: "insertAtPosition at head",
  fn() {
    const ll = createList([1, 2, 3, 4]);
    ll.insertAtPosition(new ListNode(5), 0);
    assertEquals(ll.print(false), [5, 1, 2, 3, 4, null]);
  },
});

test({
  name: "insertAtPosition at tail",
  fn() {
    const ll = createList([1, 2, 3, 4]);
    ll.insertAtPosition(new ListNode(5), 4);
    assertEquals(ll.print(false), [1, 2, 3, 4, 5, null]);
  },
});

test({
  name: "insertAtPosition in the middle",
  fn() {
    const ll = createList([1, 2, 3, 4]);
    ll.insertAtPosition(new ListNode(5), 2);
    assertEquals(ll.print(false), [1, 2, 5, 3, 4, null]);
  },
});

test({
  name: "getNodeAtPosition at head",
  fn() {
    const ll = createList([12, 3, 4, 56, 72]);
    const result = ll.getNodeAtPosition(0);
    assertEquals(result?.data, 12);
  },
});

test({
  name: "getNodeAtPosition at tail",
  fn() {
    const ll = createList([12, 3, 4, 56, 72]);
    const result = ll.getNodeAtPosition(ll.length - 1);
    assertEquals(result?.data, 72);
  },
});

test({
  name: "getNodeAtPosition in the middle",
  fn() {
    const ll = createList([12, 3, 4, 56, 72]);
    const result = ll.getNodeAtPosition(2);
    assertEquals(result?.data, 4);
  },
});

test({
  name: "calculateLength is correct",
  fn() {
    const nodes = [1,2,3,4]
    const nodesLength = nodes.length;
    const ll = createList(nodes)
    const length = ll.calculateLength();
    assertEquals(length, nodesLength)
  }
})