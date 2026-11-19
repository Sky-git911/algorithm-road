// 题目：707 设计链表 https://leetcode.cn/problems/design-linked-list/
// 模型：单链表 + 虚拟头节点（课程 0008）——dummy 让 addAtHead 与 addAtIndex 统一、
//      永远操作「前驱」；size 用一个字段维护，别每次数
const { ListNode, toArray } = require('../_utils/list');

var MyLinkedList = function () {
  // TODO 从这里开始：this.dummy = new ListNode(); this.size = 0;
};

// TODO：get(index) / addAtHead(val) / addAtTail(val) / addAtIndex(index, val) / deleteAtIndex(index)
// 提示：增删都先找到 index 的前驱（从 dummy 走 index 步）；越界一律静默忽略

// ---------- 本地测试（提交力扣时只复制上面的 MyLinkedList 全部）----------
// 力扣官方示例 + 边界；op 为 [方法名, ...参数]，期望为该次调用返回值（无返回为 null）
const CASES = [
  {
    ops: [
      ['MyLinkedList'],
      ['addAtHead', 1],
      ['addAtTail', 3],
      ['addAtIndex', 1, 2],
      ['get', 1],
      ['deleteAtIndex', 1],
      ['get', 1],
    ],
    want: [null, null, null, null, 2, null, 3], // 力扣示例
    finalWant: [1, 3],
  },
  {
    ops: [['MyLinkedList'], ['get', 0], ['addAtIndex', 1, 9], ['deleteAtIndex', 0]],
    want: [null, -1, null, null], // 空表越界：静默
    finalWant: [],
  },
  {
    ops: [
      ['MyLinkedList'],
      ['addAtHead', 7],
      ['addAtHead', 2],
      ['addAtHead', 1],
      ['addAtIndex', 3, 0],
      ['deleteAtIndex', 2],
      ['addAtHead', 6],
      ['addAtTail', 4],
      ['get', 4],
    ],
    want: [null, null, null, null, null, null, null, null, 4],
    finalWant: [6, 1, 2, 0, 4],
  },
];

let pass = 0;
for (const c of CASES) {
  let inst = null;
  const outs = c.ops.map(([op, ...args]) => {
    if (op === 'MyLinkedList') {
      inst = new MyLinkedList();
      return null;
    }
    return inst[op](...args);
  });
  const ok =
    JSON.stringify(outs) === JSON.stringify(c.want) &&
    JSON.stringify(toArray(inst.dummy ? inst.dummy.next : null)) ===
      JSON.stringify(c.finalWant);
  if (ok) pass++;
  console.log(
    ok ? 'PASS' : 'FAIL',
    JSON.stringify(c.ops),
    '->',
    JSON.stringify(outs),
    '终态',
    JSON.stringify(toArray(inst.dummy ? inst.dummy.next : null)),
    ok ? '' : '(want ' + JSON.stringify(c.want) + ' 终态 ' + JSON.stringify(c.finalWant) + ')',
  );
}
console.log(
  pass +
    '/' +
    CASES.length +
    (pass === CASES.length ? ' 全过，去力扣提交' : '，改到全过为止'),
);
