# 链表首战应验卡点②：唯一事实源与先存后改（707）

203 一次通过（dummy 模型直接落地），707 未 AC——README「② 有思路写不出，常见于链表指针操作」的预言首次应验。诊断：根源是构造函数同时维护 this.head（开局还造了个 val=0 的幽灵节点）、this.dummy、this.size 三个入口，dummy 的意义（dummy.next 即真头）被稀释；衍生五个 bug——幽灵节点污染边界、addAtTail 遍历中改链不退出导致 node.next=node 自指死循环、addAtIndex 先改后存导致自指、deleteAtIndex guard 差一（size<index 应为 size<=index）、全局「改完不 return 继续走」模式。另：本次跳过本地脚手架直冲力扣（贴码带 @lc 头）——本地序列 harness 本会以「程序卡死」当场暴露 addAtTail。

**Evidence:** 2026-11-20 用户贴出的力扣编辑器代码 + 逐 bug 走查；203 同日 AC。

**Implications:** 707 进错题本（卡点②，D+1=11-21，本地脚手架重写）；教学侧 0009 反转链表必须先立「改链三步：存 next → 改指向 → 移指针」的仪式；「唯一事实源」原则回指 0001 合同纪律（都是「先定约定再写码」）；用户流程回归提醒：多方法类题本地 harness 价值最大，别跳。
