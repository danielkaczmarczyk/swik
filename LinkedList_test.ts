// https://deno.land/manual@v1.31.1/basics/testing

import { assertEquals } from "https://deno.land/std@0.178.0/testing/asserts.ts";
import { LinkedList, ListNode } from "./LinkedList.ts";

// list setup
const head = new ListNode<number>(3, null);
const ll = new LinkedList<number>(head);
const headFetched = ll.getHead();

// niceties
const test = Deno.test;

test("Linked List can be created", () => {
  assertEquals(head, headFetched);
  assertEquals(headFetched.data, 3);
});

test("Inserting at the tail works as expected", () => {
  const newNode = new ListNode<number>(6, null);
  ll.insertAtTail(newNode);
  const tail = ll.getTail();
  assertEquals(tail, newNode);
});
