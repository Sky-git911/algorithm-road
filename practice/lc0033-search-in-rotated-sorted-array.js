// 题目：33 搜索旋转排序数组 https://leetcode.cn/problems/search-in-rotated-sorted-array/
// 模型：先判哪半有序，再在有序半边端点夹 target（课程 0003 四行决策表）；合同 A [l, r]，l <= r
var search = function (nums, target) {
  // TODO 在这里写。动笔前先把四行决策表默写在草稿上（哪半有序 × 在/不在 × 砍哪边）
  let l = 0;
  let r = nums.length - 1;
  while (l <= r) {
    const mid = Math.floor((l + r) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] > nums[r]) {
      if (target > nums[mid] || target <= nums[r]) {
        l = mid + 1;
      } else {
        r = mid;
      }
    } else if (nums[mid] < nums[r]) {
      if (target > nums[mid] && target <= nums[r]) {
        l = mid + 1;
      } else {
        r = mid;
      }
    } else {
      break;
    }
  }
  return -1;
};

// ---------- 本地测试（提交力扣时只复制上面的 search 函数）----------
const CASES = [
  { in: [[4, 5, 6, 7, 0, 1, 2], 0], want: 4 }, // 力扣示例 1：target 在右半
  { in: [[4, 5, 6, 7, 0, 1, 2], 3], want: -1 }, // 力扣示例 2：不存在
  { in: [[1], 0], want: -1 }, // 单元素不存在
  { in: [[1], 1], want: 0 }, // 单元素命中
  { in: [[5, 1, 3], 5], want: 0 }, // target 恰好在 l
  { in: [[3, 1], 1], want: 1 }, // 两元素，target 在断层点
];

let pass = 0;
for (const c of CASES) {
  const got = search(...c.in.map((x) => (Array.isArray(x) ? x.slice() : x)));
  const ok = JSON.stringify(got) === JSON.stringify(c.want);
  if (ok) pass++;
  console.log(
    ok ? 'PASS' : 'FAIL',
    JSON.stringify(c.in),
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
