// 题目：283 移动零 https://leetcode.cn/problems/move-zeroes/
// 模型：27 同款快慢覆写，判定换成「≠0」，收尾把 [slow..n) 填 0；或合格时直接 swap。
//      注意：本题「改原数组、无返回」，与 27「返回新长度」不同。
var moveZeroes = function (nums) {
  // TODO 在这里写（覆写版 / 交换版二选一，另一种口述一遍即可）
};

// ---------- 本地测试（提交力扣时只复制上面的 moveZeroes 函数）----------
// 校验「原地终态」：不返回值，直接比对调用后的数组。
const CASES = [
  { in: [[0, 1, 0, 3, 12]], want: [1, 3, 12, 0, 0] }, // 力扣示例 1
  { in: [[0]], want: [0] },
  { in: [[1]], want: [1] },
  { in: [[0, 0]], want: [0, 0] },
  { in: [[1, 0]], want: [1, 0] },
  { in: [[0, 0, 1]], want: [1, 0, 0] },
];

let pass = 0;
for (const c of CASES) {
  const arr = c.in[0].slice();
  moveZeroes(arr);
  const ok = JSON.stringify(arr) === JSON.stringify(c.want);
  if (ok) pass++;
  console.log(
    ok ? 'PASS' : 'FAIL',
    JSON.stringify(c.in[0]),
    '->',
    JSON.stringify(arr),
    ok ? '' : '(want ' + JSON.stringify(c.want) + ')',
  );
}
console.log(
  pass +
    '/' +
    CASES.length +
    (pass === CASES.length ? ' 全过，去力扣提交' : '，改到全过为止'),
);
