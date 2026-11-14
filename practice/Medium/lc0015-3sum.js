// 题目：15 三数之和 https://leetcode.cn/problems/3sum/
// 模型：排序 + 固定 i + 对撞收缩（0005 模型组合）；本题的关卡在去重——答案中
//      不能有重复三元组，去重做在哪几处、怎么做，自己想（提示：i 层与指针层各有一份责任）
// 用途：W1 周复盘机动位（2026-11-15）
var threeSum = function (nums) {
  // TODO 从这里开始（先排序，再固定 i，再对撞）
};

// ---------- 本地测试（提交力扣时只复制上面的 threeSum 函数）----------
// 比对前会把「你输出的三元组」与「期望」都做规范化（组内升序 + 组间字典序），
// 所以你返回的顺序随意，但组内顺序也会被排——按习惯组内保持升序即可。
const CASES = [
  { in: [[-1, 0, 1, 2, -1, -4]], want: [[-1, -1, 2], [-1, 0, 1]] }, // 力扣示例 1
  { in: [[]], want: [] },
  { in: [[0]], want: [] },
  { in: [[0, 0, 0]], want: [[0, 0, 0]] },
  { in: [[0, 0, 0, 0]], want: [[0, 0, 0]] }, // 去重重灾区
  { in: [[-2, 0, 1, 1, 2]], want: [[-2, 0, 2], [-2, 1, 1]] },
  { in: [[-1, -1, -1, 2]], want: [[-1, -1, 2]] }, // i 层去重
];

const norm = (arr) =>
  arr
    .map((t) => t.slice().sort((a, b) => a - b))
    .sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));

let pass = 0;
for (const c of CASES) {
  const got = threeSum(...c.in.map((x) => (Array.isArray(x) ? x.slice() : x)));
  const ok =
    JSON.stringify(norm(got)) === JSON.stringify(norm(c.want));
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
