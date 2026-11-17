// 题目：54 螺旋矩阵 https://leetcode.cn/problems/spiral-matrix/
// 模型：同 59（四边界 + 四段），但矩阵是 m×n 矩形——b=m-1、r=n-1，别当正方形
// guard 提醒：单行 [[1,2,3]]、单列 [[1],[2],[3]] 是本题的照妖镜
var spiralOrder = function (matrix) {
  let top = 0;
  let bottom = matrix.length - 1;
  let left = 0;
  let right = matrix[0].length - 1;
  let total = matrix.length * matrix[0].length;
  let num = 0;
  const res = Array.from({ length: total });
  while (num < total) {
    for (let i = left; i <= right; i++) {
      if (num >= total) break;
      res[num++] = matrix[top][i];
    }
    top++;
    for (let i = top; i <= bottom; i++) {
      if (num >= total) break;
      res[num++] = matrix[i][right];
    }
    right--;
    for (let i = right; i >= left; i--) {
      if (num >= total) break;
      res[num++] = matrix[bottom][i];
    }
    bottom--;
    for (let i = bottom; i >= top; i--) {
      if (num >= total) break;
      res[num++] = matrix[i][left];
    }
    left++;
  }
  return res;
};

// ---------- 本地测试（提交力扣时只复制上面的 spiralOrder 函数）----------
const CASES = [
  {
    in: [
      [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ],
    ],
    want: [1, 2, 3, 6, 9, 8, 7, 4, 5], // 力扣示例 1
  },
  {
    in: [
      [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
      ],
    ],
    want: [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7], // 力扣示例 2：宽扁矩形
  },
  { in: [[[1, 2, 3]]], want: [1, 2, 3] }, // 单行：guard 照妖镜
  { in: [[[1], [2], [3]]], want: [1, 2, 3] }, // 单列：guard 照妖镜
  { in: [[[7]]], want: [7] }, // 1×1
  {
    in: [
      [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
      ],
    ],
    want: [1, 2, 3, 4, 8, 7, 6, 5],
  }, // 2×4：下段整行回收
];

let pass = 0;
for (const c of CASES) {
  const got = spiralOrder(c.in[0].map((row) => row.slice()));
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
