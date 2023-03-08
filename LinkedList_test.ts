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
