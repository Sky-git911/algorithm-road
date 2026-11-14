// 题目：977 有序数组的平方 https://leetcode.cn/problems/squares-of-a-sorted-array/
// 模型：对撞指针 + V 型逆序填（课程 0005）——最大值必在两端，res[k--] 从尾部填
// 用途：2026-11-13 已 AC；本文件供 D 周期盲写复习（清空函数体重写）
var sortedSquares = function (nums) {
  let l = 0;
  let r = nums.length - 1;
  let pos = r;
  const res = new Array(r);
  while (l <= r) {
    const left = Math.pow(nums[l], 2);
    const right = Math.pow(nums[r], 2);
    res[pos--] = Math.max(left, right);
    left <= right ? r-- : l++;
  }
  return res;
};

// ---------- 本地测试（提交力扣时只复制上面的 sortedSquares 函数）----------
const CASES = [
  { in: [[-4, -1, 0, 3, 10]], want: [0, 1, 9, 16, 100] }, // 力扣示例 1
  { in: [[-7, -3, 2, 3, 11]], want: [4, 9, 9, 49, 121] }, // 力扣示例 2
  { in: [[-1]], want: [1] },
  { in: [[0]], want: [0] },
  { in: [[-5, -3, -2, -1]], want: [1, 4, 9, 25] }, // 全负数：V 型左臂
  { in: [[1, 2, 3]], want: [1, 4, 9] }, // 全正数：最大恒在右端
  { in: [[-2, 0, 2]], want: [0, 4, 4] }, // 谷底有重复平方
];

let pass = 0;
for (const c of CASES) {
  const got = sortedSquares(
    ...c.in.map((x) => (Array.isArray(x) ? x.slice() : x)),
  );
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
