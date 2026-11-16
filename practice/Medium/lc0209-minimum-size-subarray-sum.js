// 题目：209 长度最小的子数组 https://leetcode.cn/problems/minimum-size-subarray-sum/
// 模型：变长滑动窗口（课程 0006）——r 每轮必进（增量加和）；sum ≥ target 时 while 收缩
//      （每次记录 r-l+1，吐出左端）；前提：元素全正（单调性营业执照）
var minSubArrayLen = function (target, nums) {
  // TODO 从这里开始。动笔前口述：不变量？l 为什么不回头？为什么 while 收缩？
  let l = 0;
  let r = 0;
  let best = Infinity;
  let sum = 0;
  while (r <= nums.length - 1) {
    sum += nums[r];
    while (sum >= target) {
      best = Math.min(best, r - l + 1);
      sum -= nums[l];
      l++;
    }
    r++;
  }
  return best === Infinity ? 0 : best;
};

// ---------- 本地测试（提交力扣时只复制上面的 minSubArrayLen 函数）----------
const CASES = [
  { in: [7, [2, 3, 1, 2, 4, 3]], want: 2 }, // 力扣示例 1：[4,3]
  { in: [4, [1, 4, 4]], want: 1 }, // 力扣示例 2：[4]
  { in: [11, [1, 1, 1, 1, 1, 1, 1, 1]], want: 0 }, // 力扣示例 3：无解
  { in: [5, [5]], want: 1 }, // 单元素命中
  { in: [6, [5]], want: 0 }, // 单元素无解
  { in: [15, [2, 3, 1, 2, 4, 3]], want: 6 }, // 恰好整段
  { in: [8, [2, 3, 1, 2, 4, 3]], want: 3 }, // [2,4,3]
];

let pass = 0;
for (const c of CASES) {
  const got = minSubArrayLen(c.in[0], c.in[1].slice());
  const ok = JSON.stringify(got) === JSON.stringify(c.want);
  if (ok) pass++;
  console.log(
    ok ? 'PASS' : 'FAIL',
    't=' + c.in[0],
    JSON.stringify(c.in[1]),
    '->',
    got,
    ok ? '' : '(want ' + c.want + ')',
  );
}
console.log(
  pass +
    '/' +
    CASES.length +
    (pass === CASES.length ? ' 全过，去力扣提交' : '，改到全过为止'),
);
