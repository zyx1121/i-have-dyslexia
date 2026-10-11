<!-- 翻译自 README.md @ docs/readme-template-v2。只翻 "For AI agents" 以上的章节，英文版更新时一起改。 -->

<div align="center">

<h1>i-have-dyslexia</h1>

<p><strong>让 coding agent 的回复对阅读障碍读者易于扫读，而不只是更短的文字墙。</strong></p>

[![Claude Code](https://img.shields.io/badge/Claude%20Code-plugin-d97757?style=flat-square)](https://docs.anthropic.com/en/docs/claude-code/plugins)
[![Codex](https://img.shields.io/badge/Codex-plugin-000000?style=flat-square)](https://github.com/openai/codex)
[![Agent Skills](https://img.shields.io/badge/agent-skills-4B5563?style=flat-square)](skills/i-have-dyslexia/SKILL.md)
[![License](https://img.shields.io/github/license/zyx1121/i-have-dyslexia?style=flat-square)](LICENSE)

[English](README.md) | [繁體中文](README.zh-TW.md) | **简体中文**

</div>

<table>
<tr>
<td width="50%">

### 之前

> 看了你的测试失败，这里有几件事同时在发生。`src/config.ts` 里的 `parseConfig` 没有处理 YAML 文件缺少 `port` 字段的情况，所以 server 会尝试绑定到 `undefined`，这就是为什么集成测试会以 ECONNREFUSED 失败、而单元测试仍然通过，因为单元测试完全 mock 掉配置加载器、从来不碰真正的文件。你需要加一个默认值，然后重跑整个测试套件确认一切都修好了。

</td>
<td width="50%">

### 之后

> **原因：**`src/config.ts:31`(缺少 `port` 时 `parseConfig` 返回 `undefined`)。
>
> - 单元测试通过。它们 mock 掉配置加载器。
> - 集成测试失败。它们读真正的文件。
>
> **修法：**
>
> 1. 打开 `src/config.ts:31`
> 2. 加默认值：`port: raw.port ?? 3000`
> 3. 运行 `npm test`
>
> 下一步：如果还有失败，贴上输出。

</td>
</tr>
</table>

密集的文字很难解读。长行每次换行都会让读者跟丢，每次回复布局都不同，就得每次重新适应。这个 skill 把这些成本从你身上移到 agent 身上。上面的例子两栏是同样的事实。它是 [i-have-adhd](https://github.com/ayghri/i-have-adhd) 的姊妹项目：那个让 agent 不把答案埋起来，这个让文字容易解读。

## 功能

- **固定骨架**：每次回复第一行是答案，最后一行是下一步。
- **短行**：每个条目一句话，每句不超过 15 个字。
- **没有文字墙**：没有超过 3 行的区块。
- **粗体锚点**：只读粗体字也能抓到重点。
- **默认关闭**：调用 skill 之前什么都不会变。

## 快速开始

Claude Code：

```sh
claude plugin marketplace add zyx1121/i-have-dyslexia
claude plugin install i-have-dyslexia@i-have-dyslexia
```

Codex：

```sh
codex plugin marketplace add zyx1121/i-have-dyslexia --ref main
codex plugin add i-have-dyslexia@i-have-dyslexia
```

在 Claude Code 输入 `/i-have-dyslexia`，或在 Codex 输入 `$i-have-dyslexia`。下一条回复就会套用这个布局。Antigravity、Cursor、OpenCode、Amp、Pi 与其他 skill 宿主，请看 [INSTALL.md](INSTALL.md)。

## 使用方式

10 条规则来自阅读障碍如何改变阅读。完整内容在 [SKILL.md](skills/i-have-dyslexia/SKILL.md)。

1. 每次回复用同一个骨架。
2. 每个条目一句话。
3. 句子不超过 15 个字。
4. 没有超过 3 行的区块。
5. 粗体标出锚点：数字、文件名、结论。
6. 区块之间空一行。
7. 用平易的字词。
8. 不用斜体，不用全大写。
9. 用阿拉伯数字，不用中文数字。
10. 每行先放关键词。

说「stop dyslexia mode」即可关闭。

## 配置

`SKILL.md` 设了 `disable-model-invocation: true`，所以 agent 不会自己启动这个 skill。想一直开着，把 [INSTALL.md](INSTALL.md) 里的片段加进你的 agent 指令。想改规则，fork 这个 repo、编辑 `skills/i-have-dyslexia/SKILL.md`，再安装你的 fork。

## 限制

- 只改回复的布局，不改事实或长度上限。
- 不读 agent skill 的宿主需要用常驻片段。

## 其他

给 AI agent 的结构化信息与开发说明在[英文版](README.md#for-ai-agents)。

## 许可证

[MIT](LICENSE)
