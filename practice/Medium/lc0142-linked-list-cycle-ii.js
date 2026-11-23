// 题目：142 环形链表 II https://leetcode.cn/problems/linked-list-cycle-ii/
// 模型（下笔前一句话声明）：两段式——第一段快慢追及判环（同 141）；相遇后 p1 从 head、
//                           p2 从相遇点同速走，相遇处 = 入口
// 口述 gate（动笔前）：纸上推 a = c + (n−1)(b+c)：为什么 head 到入口 ≡ 相遇点到入口（mod 环长）？
// 铁律：入口 = head（pos=0）不许特判——p1 === p2 开局即成立，第二段循环零次
const { toCycle } = require('../_utils/list');

var detectCycle = function (head) {
  // 在这里写：返回入口节点（无环返回 null）——比对的是节点身份，不是值
};

// ---------- 本地测试（提交力扣时只复制上面的 detectCycle 函数）----------
// want 用「入口下标」表达，比对时转成那一个节点做身份断言（got === entry）
const CASES = [
  { arr: [3, 2, 0, -4], pos: 1 }, // 力扣示例 1：入口下标 1（值 2）
  { arr: [1, 2], pos: 0 }, // 力扣示例 2：入口 = head——第二段循环零次
  { arr: [1], pos: -1 }, // 力扣示例 3：无环 → null
  { arr: [], pos: -1 }, // 空表——模板零特判覆盖
  { arr: [1], pos: 0 }, // 最小环：入口就是 head
  { arr: Array.from({ length: 100 }, (_, i) => i), pos: 37 }, // 长链深环
];

let pass = 0;
for (const c of CASES) {
  const { head, entry } = toCycle(c.arr, c.pos);
  const got = detectCycle(head);
  const ok = got === entry; // 身份断言：必须返回「那一个」节点
  if (ok) pass++;
  const gotLabel =
    got === null
      ? 'null'
      : got === entry
        ? `入口下标 ${c.pos}`
        : '返回了别的节点（不是入口）';
  console.log(
    ok ? 'PASS' : 'FAIL',
    `pos=${c.pos}`,
    '->',
    gotLabel,
    ok ? '' : `(want ${entry === null ? 'null' : `入口下标 ${c.pos}`})`,
  );
}
console.log(
  pass +
    '/' +
    CASES.length +
    (pass === CASES.length ? ' 全过，去力扣提交' : '，改到全过为止'),
);
