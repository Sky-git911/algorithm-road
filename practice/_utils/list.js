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

module.exports = { ListNode, toList, toArray };
