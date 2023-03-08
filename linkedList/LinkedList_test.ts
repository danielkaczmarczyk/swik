import { assertEquals } from "https://deno.land/std@0.178.0/testing/asserts.ts";
import { LinkedList, ListNode } from "./LinkedList.ts";

// TODO
/**
 * create list-generating helpers to remove repetition
 * and enable parrallel execution with certainty of result
 */

// list setup
const head = new ListNode<number>(3, null);
const ll = new LinkedList<number>(head);
const headFetched = ll.getHead();

// niceties
const test = Deno.test;

// tests
test("Linked List can be created", () => {
  assertEquals(head, headFetched);
  assertEquals(headFetched?.data, 3);
});

test("Inserting at tail", () => {
  const newNode = new ListNode<number>(6, null);
  ll.insertAtTail(newNode);
  const tail = ll.getTail();
  assertEquals(tail, newNode);
});

test("Inserting at head", () => {
  const oldLength = ll.length;
  const newHeadNode = new ListNode<number>(15, null);
  ll.insertAtHead(newHeadNode);
  const newHead = ll.getHead();
  const newLength = ll.length;
  assertEquals(newHead, newHeadNode);
  assertEquals(oldLength + 1, newLength);
});

test("Deleting at head", () => {
  const ll = new LinkedList<number>(new ListNode(3));
  ll.insertAtTail(new ListNode<number>(5));
  ll.insertAtTail(new ListNode<number>(10));
  ll.insertAtTail(new ListNode<number>(15));

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
    const ll = new LinkedList<number>(new ListNode(1));
    ll.insertAtTail(new ListNode(2));
    ll.insertAtTail(new ListNode(3));
    ll.insertAtTail(new ListNode(4));
    ll.insertAtTail(new ListNode(5));
    const arrayed = ll.toArray();
    assertEquals(arrayed, [1, 2, 3, 4, 5, null]);
  },
});

test({
  name: "Deleting",
  ignore: true,
  fn() {},
});

test({
  name: "Deleting multiple",
  ignore: true,
  fn() {},
});

test({
  name: "Deleting at tail",
  ignore: true,
  fn() {},
});

test("Searching", () => {
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
