<div align="center">

<h1>i-have-dyslexia</h1>

<p><strong>Replies from coding agents that a reader with dyslexia can skim, not only shorter walls of text.</strong></p>

[![Claude Code](https://img.shields.io/badge/Claude%20Code-plugin-d97757?style=flat-square)](https://docs.anthropic.com/en/docs/claude-code/plugins)
[![Codex](https://img.shields.io/badge/Codex-plugin-000000?style=flat-square)](https://github.com/openai/codex)
[![Agent Skills](https://img.shields.io/badge/agent-skills-4B5563?style=flat-square)](skills/i-have-dyslexia/SKILL.md)
[![License](https://img.shields.io/github/license/zyx1121/i-have-dyslexia?style=flat-square)](LICENSE)

**English** | [繁體中文](README.zh-TW.md) | [简体中文](README.zh-CN.md)

</div>

<table>
<tr>
<td width="50%">

### Before

> Looking at your test failures, there are a couple of things going on here. The `parseConfig` function in `src/config.ts` doesn't handle the case where the YAML file has no `port` field, which means the server tries to bind to `undefined`, and that is why the integration tests fail with ECONNREFUSED while the unit tests still pass, since those mock the config loader entirely and never touch the real file. You'll want to add a default value and then rerun the whole suite to confirm everything is fixed.

</td>
<td width="50%">

### After

> **Cause:** `src/config.ts:31` (`parseConfig` returns `undefined` when `port` is missing).
>
> - Unit tests pass. They mock the config loader.
> - Integration tests fail. They read the real file.
>
> **Fix:**
>
> 1. Open `src/config.ts:31`
> 2. Add a default: `port: raw.port ?? 3000`
> 3. Run `npm test`
>
> Next: paste the output if anything still fails.

</td>
</tr>
</table>

Dense text is hard to decode. Long lines lose the reader at each wrap, and a layout that changes in each reply must be learned again each time. This skill moves that cost from you to the agent. The example above shows the same facts in both columns. It is a sibling of [i-have-adhd](https://github.com/ayghri/i-have-adhd): that one keeps the agent from hiding the answer, and this one keeps the text easy to decode.

## Features

- **Fixed skeleton**: the answer on the first line and the next step on the last line, in every reply.
- **Short lines**: one sentence for each bullet, each under 15 words.
- **No walls**: paragraphs of 2 sentences, lists of 5 items.
- **Bold anchors**: read only the bold words and you still get the main point.
- **Off by default**: nothing changes until you call the skill.

## Quick start

Claude Code:

```sh
claude plugin marketplace add zyx1121/i-have-dyslexia
claude plugin install i-have-dyslexia@i-have-dyslexia
```

Codex:

```sh
codex plugin marketplace add zyx1121/i-have-dyslexia --ref main
codex plugin add i-have-dyslexia@i-have-dyslexia
```

Type `/i-have-dyslexia` in Claude Code or `$i-have-dyslexia` in Codex. The next reply uses the layout. For Antigravity, Cursor, OpenCode, Amp, Pi and other skill hosts, see [INSTALL.md](INSTALL.md).

## Usage

The 18 rules come from how dyslexia changes reading. The full text is in [SKILL.md](skills/i-have-dyslexia/SKILL.md).

Content:

1. Answer only what was asked.
2. The conclusion first, then one reason.
3. One name for one thing.
4. Define a term the first time.

Layout:

5. Same skeleton in every reply.
6. One sentence for each bullet.
7. Sentences under 15 words (30 characters in Chinese, Japanese and Korean).
8. Paragraphs of 2 sentences, lists of 5 items.
9. Bold the anchors: numbers, file names, verdicts.
10. A blank line between blocks.
11. No italics, no ALL CAPS.
12. Digits, not number words.
13. The key word first on each line.

Sentences (15 to 18 come from ASD-STE100):

14. Plain words.
15. Active voice.
16. Verbs, not nouns.
17. Instructions start with the verb.
18. At most 3 nouns in a row.

Say "stop dyslexia mode" to turn it off.

## Configuration

`SKILL.md` sets `disable-model-invocation: true`, so the agent never starts the skill by itself. To keep it on all the time, add the snippet from [INSTALL.md](INSTALL.md) to your agent instructions. To change the rules, fork the repo, edit `skills/i-have-dyslexia/SKILL.md` and install your fork.

## Limits

- It changes the layout of replies, not their facts or length limits.
- Hosts that do not read agent skills need the always-on snippet.

## For AI agents

Facts for coding agents and LLM tools. The rules for changing the code are in [AGENTS.md](AGENTS.md).

- **Summary**: one agent skill that formats replies for readers with dyslexia: fixed skeleton, short sentences, bold anchors, paragraphs of 2 sentences, lists of 5 items.
- **Type**: plugin
- **Interfaces**: skill `i-have-dyslexia` (`/i-have-dyslexia` in Claude Code, `$i-have-dyslexia` in Codex)
- **Install**: `claude plugin marketplace add zyx1121/i-have-dyslexia && claude plugin install i-have-dyslexia@i-have-dyslexia`. Other hosts: [INSTALL.md](INSTALL.md).
- **Run**: type `/i-have-dyslexia`
- **Verify**: `claude plugin list` shows the plugin, and the next reply follows the skeleton
- **Config**: none. Opt-in only (`disable-model-invocation: true`).
- **Secrets**: none
- **Limits**: changes layout only

## Development

Edit `skills/i-have-dyslexia/SKILL.md`. Keep the manifests in `plugin.json`, `.claude-plugin/`, `.codex-plugin/` and `.agents/plugins/` in agreement.

The rules follow the [British Dyslexia Association Style Guide](https://www.bdadyslexia.org.uk/advice/employers/creating-a-dyslexia-friendly-workplace/dyslexia-friendly-style-guide), changed for how an LLM shapes a reply. The repo layout comes from [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd).

## License

[MIT](LICENSE)
