// 题目：35 搜索插入位置 https://leetcode.cn/problems/search-insert-position/
// 模型：lower_bound —— 第一个 ≥ target 的位置（合同 B [l,r)，等号并入 ≥ 分支）
var searchInsert = function (nums, target) {
  // TODO 在这里写。提醒（来自课程 0002）：命中等于时不要返回，r ← mid 继续左压
};

// ---------- 本地测试（提交力扣时只复制上面的 searchInsert 函数）----------
const CASES = [
  { in: [[1, 3, 5, 6], 5], want: 2 },  // 力扣示例 1：命中，插在它前面
  { in: [[1, 3, 5, 6], 2], want: 1 },  // 力扣示例 2：不存在，插中间
  { in: [[1, 3, 5, 6], 7], want: 4 },  // 力扣示例 3：比谁都大，插末尾（刀痕 = n）
  { in: [[1, 3, 5, 6], 0], want: 0 },  // 力扣示例 4：比谁都小，插开头
  { in: [[1], 1], want: 0 },           // 单元素：命中在最左
  { in: [[1], 2], want: 1 },           // 单元素：插末尾
];

let pass = 0;
for (const c of CASES) {
  const got = searchInsert(...c.in.map((x) => (Array.isArray(x) ? x.slice() : x)));
  const ok = JSON.stringify(got) === JSON.stringify(c.want);
  if (ok) pass++;
  console.log(ok ? "PASS" : "FAIL", JSON.stringify(c.in), "->", got, ok ? "" : "(want " + c.want + ")");
}
console.log(pass + "/" + CASES.length + (pass === CASES.length ? " 全过，去力扣提交" : "，改到全过为止"));
