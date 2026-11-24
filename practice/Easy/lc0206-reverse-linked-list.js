// 题目：206 反转链表 https://leetcode.cn/problems/reverse-linked-list/
// 模型：改链三步主场（课程 0009）——prev 领衔已反转世界，cur 是原第 i 个；
//      每轮：存 next → 改指向（cur.next = prev）→ 移指针；终止返回 prev（新头）
// 铁律：空表和单节点不许特判——模板应零特判覆盖它们
const { ListNode, toList, toArray } = require('../_utils/list');

var reverseList = function (head) {
  let prev = null;
  let cur = head;
  while (cur) {
    const next = cur.next;
    cur.next = prev;
    prev = cur;
    cur = next;
  }
  return prev;
};

// ---------- 本地测试（提交力扣时只复制上面的 reverseList 函数）----------
const CASES = [
  { in: [[1, 2, 3, 4, 5]], want: [5, 4, 3, 2, 1] }, // 力扣示例 1
  { in: [[1, 2]], want: [2, 1] }, // 力扣示例 2：最短能看全三步
  { in: [[]], want: [] }, // 力扣示例 3：空表——模板零特判覆盖
  { in: [[1]], want: [1] }, // 单节点：一轮即止
  { in: [[1, 2, 3, 4]], want: [4, 3, 2, 1] }, // 偶数长度
];

let pass = 0;
for (const c of CASES) {
  const got = toArray(reverseList(toList(c.in[0])));
  const ok = JSON.stringify(got) === JSON.stringify(c.want);
  if (ok) pass++;
  console.log(
    ok ? 'PASS' : 'FAIL',
    JSON.stringify(c.in[0]),
    '->',
    JSON.stringify(got),
    ok ? '' : '(want ' + JSON.stringify(c.want) + ')',
  );
}
console.log(
  pass +
    '/' +
    CASES.length +
    (pass === CASES.length ? ' 全过，去力扣提交' : '，改到全过为止'),
);
