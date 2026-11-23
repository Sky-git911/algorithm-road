// 题目：141 环形链表 https://leetcode.cn/problems/linked-list-cycle/
// 模型（下笔前一句话声明）：快慢指针追及——slow 一步、fast 两步；进环后每轮距离缩 1 → 必相遇
// 口述 gate（动笔前）：① 进环后 fast 为什么不会一步跨过 slow？
//                      ② 循环条件为什么是 fast && fast.next 两道闸？
// 铁律：空表 / 单节点不许特判——先看模板能不能吞（连续剧第四集）
const { toCycle } = require('../_utils/list');

var hasCycle = function (head) {
  // 在这里写：循环体只走不改——本题全程零改链
};

// ---------- 本地测试（提交力扣时只复制上面的 hasCycle 函数）----------
const CASES = [
  { arr: [3, 2, 0, -4], pos: 1, want: true }, // 力扣示例 1：尾接回下标 1
  { arr: [1, 2], pos: 0, want: true }, // 力扣示例 2：head 自环
  { arr: [1], pos: -1, want: false }, // 力扣示例 3：单节点无环
  { arr: [], pos: -1, want: false }, // 空表——模板零特判覆盖
  { arr: [1], pos: 0, want: true }, // 最小环：单节点自己接自己
  { arr: [1, 2, 3, 4, 5, 6], pos: 2, want: true }, // 长尾再进环
  { arr: Array.from({ length: 100 }, (_, i) => i), pos: 37, want: true }, // 长链深环
  { arr: Array.from({ length: 100 }, (_, i) => i), pos: -1, want: false }, // 长直链
];

let pass = 0;
for (const c of CASES) {
  const { head } = toCycle(c.arr, c.pos);
  const got = hasCycle(head);
  const ok = got === c.want;
  if (ok) pass++;
  console.log(
    ok ? 'PASS' : 'FAIL',
    `pos=${c.pos}`,
    '->',
    got,
    ok ? '' : `(want ${c.want})`,
  );
}
console.log(
  pass +
    '/' +
    CASES.length +
    (pass === CASES.length ? ' 全过，去力扣提交' : '，改到全过为止'),
);
