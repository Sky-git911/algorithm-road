// practice/_template.js —— 复制为 lc<题号>-<slug>.js 后开始
// 题目：<题名 + 力扣链接>
// 模型（下笔前一句话声明，例：合同 A 左闭右闭 / 快慢指针）：
var problemFn = function (/* 与力扣签名完全一致 */) {
  // 在这里写
};

// ---------- 本地测试（提交力扣时只复制上面的函数）----------
const CASES = [
  // { in: [参数1, 参数2, ...], want: 期望返回 },
];

let pass = 0;
for (const c of CASES) {
  const got = problemFn(...c.in.map((x) => (Array.isArray(x) ? x.slice() : x)));
  const ok = got === c.want;
  if (ok) pass++;
  console.log(ok ? "PASS" : "FAIL", JSON.stringify(c.in), "->", got, ok ? "" : "(want " + c.want + ")");
}
console.log(pass + "/" + CASES.length + (pass === CASES.length ? " 全过，去力扣提交" : "，改到全过为止"));
