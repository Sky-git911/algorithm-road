// practice/_utils/list.js —— 链表本地基建（W3 各脚手架共用）
// 用法：const { ListNode, toList, toArray } = require('../_utils/list');
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

// 数组 → 链表（返回 head）
function toList(arr) {
  const dummy = new ListNode();
  let cur = dummy;
  for (const v of arr) cur = cur.next = new ListNode(v);
  return dummy.next;
}

// 链表 → 数组（调试/比对用）
function toArray(head) {
  const out = [];
  for (let c = head; c; c = c.next) out.push(c.val);
  return out;
}

// 第 i 个节点（0 基；越界返回 null）
function nodeAt(head, i) {
  let cur = head;
  while (i-- > 0 && cur) cur = cur.next;
  return cur;
}

// 环形链表构造：pos = 尾节点.next 接回的下标（-1 = 无环）
// 返回 { head, entry }——entry 是下标 pos 的节点（无环为 null），142 按节点身份断言用
function toCycle(arr, pos) {
  const head = toList(arr);
  let tail = head;
  while (tail && tail.next) tail = tail.next;
  const entry = pos >= 0 ? nodeAt(head, pos) : null;
  if (tail) tail.next = entry;
  return { head, entry };
}

module.exports = { ListNode, toList, toArray, nodeAt, toCycle };
