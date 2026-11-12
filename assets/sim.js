/* sim.js · 模拟器预设按钮组件（组件 #4）
   用法：simPresets(scopeEl, function (btn) { ... }) —— 绑定 scope 内所有 .tgt 按钮；
   点击时互斥地加上 .active 高亮（样式见 course.css .btn.active），再把按钮交给回调。 */
(function () {
  "use strict";
  window.simPresets = function (root, onPick) {
    var btns = Array.prototype.slice.call((root || document).querySelectorAll(".tgt"));
    btns.forEach(function (b) {
      b.addEventListener("click", function () {
        btns.forEach(function (x) { x.classList.remove("active"); });
        b.classList.add("active");
        onPick(b);
      });
    });
  };
})();
