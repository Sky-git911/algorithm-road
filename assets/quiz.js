/* quiz.js · 课程共享 quiz 组件（组件 #2）
   用法：在课程页放
     <div class="quiz" data-quiz>
       <script type="application/json">
       { "questions": [
           { "q": "题干",
             "options": [ { "t": "选项文字", "why": "该选项解析" }, ... ],
             "answer": 0 }   // 正确选项在原始数组中的下标
       ] }
       </script>
     </div>
   行为：选项渲染时打乱顺序；点击即时判定并显示解析；全部作答后给分；
   「重做」按钮重洗选项（检索练习）。规范：课程作者保证各选项字数相等、
   正确答案位置在题间轮换（打乱后由洗牌保证呈现随机）。 */

(function () {
  "use strict";

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function render(box) {
    // 首次渲染后 JSON script 会被 innerHTML="" 清掉，数据缓存到元素上供「重做」使用
    if (!box.__quizData) {
      var dataEl = box.querySelector('script[type="application/json"]');
      if (!dataEl) return;
      try { box.__quizData = JSON.parse(dataEl.textContent); } catch (e) { return; }
    }
    var data = box.__quizData;

    box.innerHTML = "";
    var answered = []; // 每题是否答对

    data.questions.forEach(function (item, qi) {
      var qBox = document.createElement("div");
      qBox.className = "quiz-q";
      var stem = document.createElement("div");
      stem.className = "stem";
      stem.textContent = "Q" + (qi + 1) + " · " + item.q;
      qBox.appendChild(stem);

      // 打乱选项，记录每个按钮对应的原始下标
      var order = shuffle(item.options.map(function (_, i) { return i; }));

      order.forEach(function (origIdx) {
        var opt = item.options[origIdx];
        var btn = document.createElement("button");
        btn.className = "opt";
        btn.type = "button";
        btn.textContent = opt.t;
        var why = document.createElement("div");
        why.className = "why";
        why.textContent = opt.why;
        qBox.appendChild(btn);

        btn.addEventListener("click", function () {
          var buttons = qBox.querySelectorAll(".opt");
          buttons.forEach(function (b) { b.disabled = true; });
          var correct = origIdx === item.answer;
          btn.classList.add(correct ? "correct" : "wrong");
          if (!correct) {
            // 揭示正确项
            qBox.querySelectorAll(".opt").forEach(function (b, k) {
              if (order[k] === item.answer) b.classList.add("correct");
            });
          }
          why.classList.add("show");
          answered[qi] = correct;
          maybeScore();
        });
        qBox.appendChild(why);
      });

      box.appendChild(qBox);
    });

    var scoreEl = document.createElement("div");
    scoreEl.className = "quiz-score no-print";
    box.appendChild(scoreEl);

    var retry = document.createElement("button");
    retry.className = "btn no-print";
    retry.type = "button";
    retry.textContent = "重做这组题";
    retry.style.display = "none";
    retry.addEventListener("click", function () { render(box); });
    box.appendChild(retry);

    function maybeScore() {
      if (answered.filter(function (x) { return x !== undefined; }).length === data.questions.length) {
        var right = answered.filter(Boolean).length;
        scoreEl.textContent = right + " / " + data.questions.length + " 正确" +
          (right === data.questions.length ? " —— 稳了，去实战。" : " —— 错题的解析值得再看一眼，然后重做。");
        retry.style.display = "inline-block";
      }
    }
  }

  document.querySelectorAll("[data-quiz]").forEach(render);
})();
