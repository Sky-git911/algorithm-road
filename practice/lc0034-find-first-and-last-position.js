// 题目：34 在排序数组中查找元素的第一个和最后一个位置 https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/
// 模型：两次 lower_bound 组合——左边界 = lb(target)，右边界 = lb(target + 1) - 1；
//      存在性检查：lb < n && nums[lb] === target。全程只写一种循环（合同 B）。
var searchRange = function (nums, target) {
  // TODO 在这里写。建议：先在草稿上把 lower_bound 写成独立一步，再组合两次调用
  let l = 0;
  let r = nums.length;
  let mid = 0;
  let resL = -1;
  let resR = -1;
  while (l < r) {
    const val = nums[mid];
    if (val > target) {
      r = mid;
    } else if (val < target) {
      l = mid + 1;
    } else {
      resL = mid;
      r = mid;
    }
    mid = ~~((l + r) / 2);
  }

  l = 0;
  r = nums.length - 1;
  while (l <= r) {
    mid = ~~((l + r) / 2);
    const val = nums[mid];
    if (val > target) {
      r = mid - 1;
    } else if (val < target) {
      l = mid + 1;
    } else {
      l = mid + 1;
      resR = mid;
    }
  }

  return [resL, resR];
};

// ---------- 本地测试（提交力扣时只复制上面的 searchRange 函数）----------
const CASES = [
  { in: [[5, 7, 7, 8, 8, 10], 8], want: [3, 4] }, // 力扣示例 1：存在，返回区间
  { in: [[5, 7, 7, 8, 8, 10], 6], want: [-1, -1] }, // 力扣示例 2：不存在
  { in: [[], 0], want: [-1, -1] }, // 力扣示例 3：空数组
  { in: [[1], 1], want: [0, 0] }, // 单元素命中：左右边界重合
  { in: [[1, 2, 2], 2], want: [1, 2] }, // 右边界正好压在数组末尾
  { in: [[2, 2], 3], want: [-1, -1] }, // 全体 < target
];

let pass = 0;
for (const c of CASES) {
  const got = searchRange(
    ...c.in.map((x) => (Array.isArray(x) ? x.slice() : x)),
  );
  const ok = JSON.stringify(got) === JSON.stringify(c.want);
  if (ok) pass++;
  console.log(
    ok ? 'PASS' : 'FAIL',
    JSON.stringify(c.in),
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
