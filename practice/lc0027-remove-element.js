// 题目：27 移除元素 https://leetcode.cn/problems/remove-element/
// 模型：快慢指针原地覆写（课程 0004）——fast 每轮必走，slow 拿到合格元素才走；
//      不变量：[0..slow) 全为 ≠val 的元素（保序）。返回 slow。
var removeElement = function (nums, val) {
  // TODO 在这里写
};

// ---------- 本地测试（提交力扣时只复制上面的 removeElement 函数）----------
// 比力扣更严：连「前缀内容（含相对顺序）」一起校验。课程模型即保序覆写。
const CASES = [
  { in: [[3, 2, 2, 3], 3], wantLen: 2, wantPrefix: [2, 2] },
  { in: [[0, 1, 2, 2, 3, 0, 4, 2], 2], wantLen: 5, wantPrefix: [0, 1, 3, 0, 4] },
  { in: [[1], 1], wantLen: 0, wantPrefix: [] },
  { in: [[1], 2], wantLen: 1, wantPrefix: [1] },
  { in: [[4, 4, 4], 4], wantLen: 0, wantPrefix: [] },
  { in: [[], 3], wantLen: 0, wantPrefix: [] },
];

let pass = 0;
for (const c of CASES) {
  const nums = c.in[0].slice();
  const got = removeElement(nums, c.in[1]);
  const prefix = nums.slice(0, got);
  const ok =
    got === c.wantLen &&
    JSON.stringify(prefix) === JSON.stringify(c.wantPrefix);
  if (ok) pass++;
  console.log(
    ok ? 'PASS' : 'FAIL',
    JSON.stringify(c.in[0]),
    'val=' + c.in[1],
    '->',
    got,
    JSON.stringify(prefix),
    ok ? '' : '(want ' + c.wantLen + ' ' + JSON.stringify(c.wantPrefix) + ')',
  );
}
console.log(
  pass +
    '/' +
    CASES.length +
    (pass === CASES.length ? ' 全过，去力扣提交' : '，改到全过为止'),
);
