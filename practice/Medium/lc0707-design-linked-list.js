// 题目：707 设计链表 https://leetcode.cn/problems/design-linked-list/
// 模型：单链表 + 虚拟头节点（课程 0008）——dummy 让 addAtHead 与 addAtIndex 统一、
//      永远操作「前驱」；size 用一个字段维护，别每次数
const { ListNode, toArray } = require('../_utils/list');

var MyLinkedList = function () {
  // TODO 从这里开始：this.dummy = new ListNode(); this.size = 0;
  this.dummy = new ListNode();
  this.size = 0;

  this.addAtIndex = function (index, val) {
    if (this.size < index) return;
    const node = new ListNode(val);
    let cur = this.dummy;
    for (let i = 0; i < index; i++) {
      cur = cur.next;
    }
    node.next = cur.next;
    cur.next = node;
    this.size++;
  };

  this.get = function (index) {
    if (this.size <= index) return -1;
    let cur = this.dummy;
    for (let i = 0; i < index; i++) {
      cur = cur.next;
    }
    return cur.next?.val ?? -1;
  };

  this.addAtHead = function (val) {
    this.addAtIndex(0, val);
  };
  this.addAtTail = function (val) {
    this.addAtIndex(this.size, val);
  };

  this.deleteAtIndex = function (index) {
    if (this.size <= index) return;
    let cur = this.dummy;
    for (let i = 0; i < index; i++) {
      cur = cur.next;
    }
    cur.next = cur.next.next;
    this.size--;
  };
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
    ops: [
      ['MyLinkedList'],
      ['get', 0],
      ['addAtIndex', 1, 9],
      ['deleteAtIndex', 0],
    ],
    want: [null, -1, null, null], // 空表越界：静默
    finalWant: [],
  },
  {
    ops: [
      ['MyLinkedList'],
      ['addAtHead', 1],
      ['addAtTail', 3],
      ['addAtTail', 5],
      ['deleteAtIndex', 0], // 删头照妖镜：dummy 语义 + size 是否同步
      ['get', 0],
      ['get', 1],
      ['deleteAtIndex', 1],
      ['addAtIndex', 2, 8], // size 漂移检测：正确 size=1，index 2 应被拒绝
      ['get', 2],
    ],
    want: [null, null, null, null, null, 3, 5, null, null, -1],
    finalWant: [3],
  },
  {
    ops: [
      ['MyLinkedList'],
      ['addAtHead', 1],
      ['addAtTail', 2],
      ['addAtTail', 3], // [1,2,3]
      ['deleteAtIndex', 0], // [2,3] 僵尸照妖镜：删头后 this.head 是否还指着旧头
      ['addAtHead', 9], // [9,2,3]——若 this.head 未清理，僵尸 1 会被接回来
      ['get', 0],
      ['get', 1],
      ['get', 2],
    ],
    want: [null, null, null, null, null, null, 9, 2, 3], // 僵尸检测
    finalWant: [9, 2, 3],
  },
  {
    ops: [
      ['MyLinkedList'],
      ['addAtHead', 1],
      ['addAtHead', 2], // [2,1]
      ['deleteAtIndex', 0], // [1]
      ['deleteAtIndex', 0], // [] 删空
      ['get', 0], // -1
      ['addAtTail', 9], // 空表尾插
      ['get', 0], // 9
    ],
    want: [null, null, null, null, null, -1, null, 9], // 删空重建
    finalWant: [9],
  },
  {
    ops: [
      ['MyLinkedList'],
      ['addAtTail', 1],
      ['addAtTail', 2], // [1,2]
      ['addAtIndex', 0, 9], // 头插走通用路径：[9,1,2]
      ['get', 0],
      ['get', 2],
    ],
    want: [null, null, null, null, 9, 2], // index=0 头插
    finalWant: [9, 1, 2],
  },
  {
    ops: [
      ['MyLinkedList'],
      ['addAtHead', 3], // [3]
      ['addAtIndex', 1, 4], // index===size 追加：[3,4]
      ['addAtIndex', 0, 2], // [2,3,4]
      ['addAtTail', 5], // [2,3,4,5]
      ['addAtTail', 6], // [2,3,4,5,6]
      ['deleteAtIndex', 4], // 尾删：[2,3,4,5]
      ['deleteAtIndex', 0], // 头删：[3,4,5]
      ['addAtIndex', 3, 7], // 追加：[3,4,5,7]
      ['addAtIndex', 99, 0], // 越界拒绝
      ['deleteAtIndex', 4], // 越界拒绝（size=4）
      ['get', 0],
      ['get', 3],
      ['get', 4], // -1
    ],
    want: [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      3,
      7,
      -1,
    ], // size 记账长序列
    finalWant: [3, 4, 5, 7],
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
    ok
      ? ''
      : '(want ' +
          JSON.stringify(c.want) +
          ' 终态 ' +
          JSON.stringify(c.finalWant) +
          ')',
  );
}
console.log(
  pass +
    '/' +
    CASES.length +
    (pass === CASES.length ? ' 全过，去力扣提交' : '，改到全过为止'),
);
