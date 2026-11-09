// 题目：704 二分查找 https://leetcode.cn/problems/binary-search/
// 合同：______（A 左闭右闭 / B 左闭右开 —— 下笔前先选一个写在这里）
var search = function (nums, target) {
  // TODO 在这里写。提醒（来自课程 0001）：mid 用 Math.floor((l + r) / 2)
};

// ---------- 本地测试（提交力扣时只复制上面的 search 函数）----------
const CASES = [
  { in: [[-1, 0, 3, 5, 9, 12], 9], want: 4 },  // 力扣示例 1
  { in: [[-1, 0, 3, 5, 9, 12], 2], want: -1 }, // 力扣示例 2：不存在
  { in: [[5], 5], want: 0 },                   // 单元素命中
  { in: [[5], -5], want: -1 },                 // 单元素不存在
  { in: [[-1, 0, 3, 5, 9, 12], -1], want: 0 }, // 命中在最左端
  { in: [[-1, 0, 3, 5, 9, 12], 12], want: 5 }, // 命中在最右端
];

let pass = 0;
for (const c of CASES) {
  const got = search(...c.in.map((x) => (Array.isArray(x) ? x.slice() : x)));
  const ok = got === c.want;
  if (ok) pass++;
  console.log(ok ? "PASS" : "FAIL", JSON.stringify(c.in), "->", got, ok ? "" : "(want " + c.want + ")");
}
console.log(pass + "/" + CASES.length + (pass === CASES.length ? " 全过，去力扣提交" : "，改到全过为止"));
