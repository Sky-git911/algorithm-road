// 题目：153 寻找旋转排序数组中的最小值 https://leetcode.cn/problems/find-minimum-in-rotated-sorted-array/
// 模型：断层点收敛（课程 0003）——a[mid] 与 a[r] 比；不变量：最小值下标 ∈ [l, r]
var findMin = function (nums) {
  // TODO 在这里写。提醒：比较对象是 a[r] 不是 a[l]；元素互异，无等号分支
};

// ---------- 本地测试（提交力扣时只复制上面的 findMin 函数）----------
const CASES = [
  { in: [[3, 4, 5, 1, 2]], want: 1 },        // 力扣示例 1：断层在中部
  { in: [[4, 5, 6, 7, 0, 1, 2]], want: 0 },  // 力扣示例 2：断层偏右
  { in: [[11, 13, 15, 17]], want: 11 },      // 力扣示例 3：未旋转（a[l] 陷阱高发区）
  { in: [[2, 1]], want: 1 },                 // 两个元素
  { in: [[1]], want: 1 },                    // 单元素（循环体一次都不进）
  { in: [[5, 1, 2, 3, 4]], want: 1 },        // 断层紧贴左端
];

let pass = 0;
for (const c of CASES) {
  const got = findMin(...c.in.map((x) => (Array.isArray(x) ? x.slice() : x)));
  const ok = JSON.stringify(got) === JSON.stringify(c.want);
  if (ok) pass++;
  console.log(ok ? 'PASS' : 'FAIL', JSON.stringify(c.in), '->', got, ok ? '' : '(want ' + c.want + ')');
}
console.log(pass + '/' + CASES.length + (pass === CASES.length ? ' 全过，去力扣提交' : '，改到全过为止'));
