// 题目：59 螺旋矩阵 II https://leetcode.cn/problems/spiral-matrix-ii/
// 模型：四边界 t/b/l/r + 每圈四段（课程 0007）——闭区间 + 下/左段判空 guard，或左闭右开 + 收尾
// 流派声明（动笔前先选一种写在这）：______
// JS 提醒：二维数组用 Array.from({ length: n }, () => new Array(n))，别 fill 共享引用
var generateMatrix = function (n) {
  let top = 0;
  let bottom = n - 1;
  let left = 0;
  let right = n - 1;
  const matrix = Array.from({ length: n }, () => new Array(n).fill(0));
  let num = 1;
  while (num <= n * n) {
    for (let i = left; i <= right; i++) matrix[top][i] = num++;
    top++;
    for (let i = top; i <= bottom; i++) matrix[i][right] = num++;
    right--;
    for (let i = right; i >= left; i--) matrix[bottom][i] = num++;
    bottom--;
    for (let i = bottom; i >= top; i--) matrix[i][left] = num++;
    left++;
  }
  return matrix;
};

// ---------- 本地测试（提交力扣时只复制上面的 generateMatrix 函数）----------
const CASES = [
  {
    in: [3],
    want: [
      [1, 2, 3],
      [8, 9, 4],
      [7, 6, 5],
    ],
  }, // 力扣示例
  { in: [1], want: [[1]] }, // 最小规模：一圈只剩上段
  {
    in: [2],
    want: [
      [1, 2],
      [4, 3],
    ],
  }, // 偶数：无中心格
  {
    in: [4],
    want: [
      [1, 2, 3, 4],
      [12, 13, 14, 5],
      [11, 16, 15, 6],
      [10, 9, 8, 7],
    ],
  }, // 两整圈 + 中心 2×2
];

let pass = 0;
for (const c of CASES) {
  const got = generateMatrix(c.in[0]);
  const ok = JSON.stringify(got) === JSON.stringify(c.want);
  if (ok) pass++;
  console.log(
    ok ? 'PASS' : 'FAIL',
    'n=' + c.in[0],
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
