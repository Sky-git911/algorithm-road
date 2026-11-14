// 题目：11 盛最多水的容器 https://leetcode.cn/problems/container-with-most-water/
// 模型：对撞指针 + 排除证明（课程 0005）——面积 = min(h[l],h[r])×(r-l)；移短板：
//      移长板面积必不增（min 被短板锁死 + 宽变小），被移出的端是「证明过不可能更优」才扔的
// 用途：2026-11-13 已 AC（先 O(n²) 超时后转对撞）；本文件为 **2026-11-14 D+1 盲写**而建
var maxArea = function (height) {
  let l = 0;
  let r = height.length - 1;
  let best = 0;
  while (l <= r) {
    const left = height[l];
    const right = height[r];
    const area = (r - l) * Math.min(left, right);
    best = Math.max(best, area);
    left <= right ? l++ : r--;
  }
  return best;
};

// ---------- 本地测试（提交力扣时只复制上面的 maxArea 函数）----------
const CASES = [
  { in: [[1, 8, 6, 2, 5, 4, 8, 3, 7]], want: 49 }, // 力扣示例 1
  { in: [[1, 1]], want: 1 }, // 力扣示例 2
  { in: [[4, 3, 2, 1, 4]], want: 16 }, // 力扣示例 3：两端等高
  { in: [[2, 3, 4, 5, 18, 17, 6]], want: 17 }, // 最优不在端点等高，而在右侧高峰
  { in: [[5, 5, 5, 5]], want: 15 }, // 全等高
  { in: [[9, 1]], want: 1 }, // 长板在端、短板贴身
];

let pass = 0;
for (const c of CASES) {
  const got = maxArea(...c.in.map((x) => (Array.isArray(x) ? x.slice() : x)));
  const ok = JSON.stringify(got) === JSON.stringify(c.want);
  if (ok) pass++;
  console.log(
    ok ? 'PASS' : 'FAIL',
    JSON.stringify(c.in[0]),
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
