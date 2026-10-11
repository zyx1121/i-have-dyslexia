<!-- 翻譯自 README.md @ docs/readme-template-v2。只翻 "For AI agents" 以上的章節，英文版更新時一起改。 -->

<div align="center">

<h1>i-have-dyslexia</h1>

<p><strong>讓 coding agent 的回覆對失讀症讀者好掃讀，而不只是比較短的文字牆。</strong></p>

[![Claude Code](https://img.shields.io/badge/Claude%20Code-plugin-d97757?style=flat-square)](https://docs.anthropic.com/en/docs/claude-code/plugins)
[![Codex](https://img.shields.io/badge/Codex-plugin-000000?style=flat-square)](https://github.com/openai/codex)
[![Agent Skills](https://img.shields.io/badge/agent-skills-4B5563?style=flat-square)](skills/i-have-dyslexia/SKILL.md)
[![License](https://img.shields.io/github/license/zyx1121/i-have-dyslexia?style=flat-square)](LICENSE)

[English](README.md) | **繁體中文** | [简体中文](README.zh-CN.md)

</div>

<table>
<tr>
<td width="50%">

### 之前

> 看了你的測試失敗，這裡有幾件事同時在發生。`src/config.ts` 裡的 `parseConfig` 沒有處理 YAML 檔缺少 `port` 欄位的情況，所以 server 會嘗試綁定到 `undefined`，這就是為什麼整合測試會以 ECONNREFUSED 失敗、而單元測試仍然通過，因為單元測試完全 mock 掉設定載入器、從來不碰真正的檔案。你會需要加一個預設值，然後重跑整個測試套件確認一切都修好了。

</td>
<td width="50%">

### 之後

> **原因：**`src/config.ts:31`(缺少 `port` 時 `parseConfig` 回傳 `undefined`)。
>
> - 單元測試通過。它們 mock 掉設定載入器。
> - 整合測試失敗。它們讀真正的檔案。
>
> **修法：**
>
> 1. 打開 `src/config.ts:31`
> 2. 加預設值：`port: raw.port ?? 3000`
> 3. 執行 `npm test`
>
> 下一步：如果還有失敗，貼上輸出。

</td>
</tr>
</table>

密集的文字很難解讀。長行每次換行都會讓讀者跟丟，每次回覆版面都不同，就得每次重新適應。這個 skill 把這些成本從你身上移到 agent 身上。上面的例子兩欄是同樣的事實。它是 [i-have-adhd](https://github.com/ayghri/i-have-adhd) 的姊妹專案：那個讓 agent 不把答案埋起來，這個讓文字容易解讀。

## 功能

- **固定骨架**：每次回覆第一行是答案，最後一行是下一步。
- **短行**：每個項目一句話，每句不超過 15 個字。
- **沒有文字牆**：沒有超過 3 行的區塊。
- **粗體錨點**：只讀粗體字也能抓到重點。
- **預設關閉**：呼叫 skill 之前什麼都不會變。

## 快速開始

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

在 Claude Code 輸入 `/i-have-dyslexia`，或在 Codex 輸入 `$i-have-dyslexia`。下一則回覆就會套用這個版面。Antigravity、Cursor、OpenCode、Amp、Pi 與其他 skill 宿主，請看 [INSTALL.md](INSTALL.md)。

## 使用方式

10 條規則來自失讀症如何改變閱讀。完整內容在 [SKILL.md](skills/i-have-dyslexia/SKILL.md)。

1. 每次回覆用同一個骨架。
2. 每個項目一句話。
3. 句子不超過 15 個字。
4. 沒有超過 3 行的區塊。
5. 粗體標出錨點：數字、檔名、結論。
6. 區塊之間空一行。
7. 用平易的字詞。
8. 不用斜體，不用全大寫。
9. 用阿拉伯數字，不用中文數字。
10. 每行先放關鍵字。

說「stop dyslexia mode」即可關閉。

## 設定

`SKILL.md` 設了 `disable-model-invocation: true`，所以 agent 不會自己啟動這個 skill。想一直開著，把 [INSTALL.md](INSTALL.md) 裡的片段加進你的 agent 指示。想改規則，fork 這個 repo、編輯 `skills/i-have-dyslexia/SKILL.md`，再安裝你的 fork。

## 限制

- 只改回覆的版面，不改事實或長度上限。
- 不讀 agent skill 的宿主需要用常駐片段。

## 其他

給 AI agent 的結構化資訊與開發說明在[英文版](README.md#for-ai-agents)。

## 授權

[MIT](LICENSE)
