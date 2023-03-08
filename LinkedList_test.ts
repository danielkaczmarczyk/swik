// https://deno.land/manual@v1.31.1/basics/testing

import { assertEquals } from "https://deno.land/std@0.178.0/testing/asserts.ts";
import { LinkedList, ListNode } from "./LinkedList.ts";

// I'm not sure whether tests run synchronously and in order, and I assume they don't
// when (if) it breaks, refactoring will be necessary for setting up reliable test cases

// list setup
const head = new ListNode<number>(3, null);
const ll = new LinkedList<number>(head);
const headFetched = ll.getHead();

// niceties
const test = Deno.test;

// tests
test("Linked List can be created", () => {
  assertEquals(head, headFetched);
  assertEquals(headFetched.data, 3);
});

test("Inserting at tail", () => {
  const newNode = new ListNode<number>(6, null);
  ll.insertAtTail(newNode);
  const tail = ll.getTail();
  assertEquals(tail, newNode);
});

test("Inserting at head", () => {
  const newHeadNode = new ListNode<number>(15, null);
  ll.insertAtHead(newHeadNode);
  const newHead = ll.getHead();
  assertEquals(newHead, newHeadNode);
});

test("Deleting", () => {
  ll.delete(3);
  const result = ll.search(3);
  assertEquals(result, null);
});

test("Searching", () => {
  const result = ll.search(15);
  assertEquals(result?.data, 15);
});

test("Checking if its empty", () => {
  test("if it is not empty", () => {
    const ll = new LinkedList<number>(new ListNode(3, null));
    const result = ll.isEmpty();
    assertEquals(result, false);
  });
  test("if it is empty", () => {
    const ll = new LinkedList<number>(null);
    const result = ll.isEmpty();
    assertEquals(result, true)
  })
});
