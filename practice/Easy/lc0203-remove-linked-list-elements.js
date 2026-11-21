// 题目：203 移除链表元素 https://leetcode.cn/problems/remove-linked-list-elements/
// 模型：虚拟头节点 + 单针审查（课程 0008）——cur 停在前驱，审查 cur.next；
//      命中则摘链（cur.next = cur.next.next）且 cur 原地不动；未命中才前进
const { ListNode, toList, toArray } = require('../_utils/list');

var removeElements = function (head, val) {
  // TODO 从这里开始（第一行就该是 const dummy = new ListNode(0, head)）
  let dummy = new ListNode(0, head);
  let cur = dummy;
  while (cur.next) {
    if (cur.next.val === val) cur.next = cur.next.next;
    else cur = cur.next;
  }
  return dummy.next;
};

// ---------- 本地测试（提交力扣时只复制上面的 removeElements 函数）----------
const CASES = [
  { in: [[1, 2, 6, 3, 4, 5, 6], 6], want: [1, 2, 3, 4, 5] }, // 力扣示例 1
  { in: [[], 1], want: [] }, // 力扣示例 2：空链表
  { in: [[7, 7, 7, 7], 7], want: [] }, // 力扣示例 3 + dummy 照妖镜：全删
  { in: [[1], 1], want: [] }, // 头节点即目标
  { in: [[1], 2], want: [1] }, // 无命中
  { in: [[1, 2, 2, 1], 2], want: [1, 1] }, // 中段连删
];

let pass = 0;
for (const c of CASES) {
  const head = toList(c.in[0]);
  const got = removeElements(head, c.in[1]);
  const gotArr = toArray(got);
  const ok = JSON.stringify(gotArr) === JSON.stringify(c.want);
  if (ok) pass++;
  console.log(
    ok ? 'PASS' : 'FAIL',
    JSON.stringify(c.in[0]),
    'val=' + c.in[1],
    '->',
    JSON.stringify(gotArr),
    ok ? '' : '(want ' + JSON.stringify(c.want) + ')',
  );
}
console.log(
  pass +
    '/' +
    CASES.length +
    (pass === CASES.length ? ' 全过，去力扣提交' : '，改到全过为止'),
);
