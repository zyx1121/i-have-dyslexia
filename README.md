# i-have-dyslexia

> Dyslexia-friendly output for your coding agent — for readers who lose the line, not the thread.

`dyslexia` · `accessibility` · `output-style` · `claude-code` · `codex`

[![Claude Code plugin](https://img.shields.io/badge/Claude%20Code-plugin-d97757)](https://github.com/zyx1121/i-have-dyslexia) &nbsp;[![License: MIT](https://img.shields.io/badge/license-MIT-blue)](#license)

A sibling of [i-have-adhd](https://github.com/ayghri/i-have-adhd). That one stops the agent from burying the answer. This one stops it from producing text a dyslexic brain cannot decode.

## What changes

<table>
<tr>
<td width="50%">

### Before

> Looking at your test failures, there are a couple of things going on here. The `parseConfig` function in `src/config.ts` doesn't handle the case where the YAML file has no `port` field, which means the server tries to bind to `undefined`, and that is why the integration tests fail with ECONNREFUSED while the unit tests still pass, since those mock the config loader entirely and never touch the real file. You'll want to add a default value and then rerun the whole suite to confirm everything is fixed.

</td>
<td width="50%">

### After

> **Cause:** `src/config.ts:31` — `parseConfig` returns `undefined` when `port` is missing.
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

## Install

<details>
<summary><strong>Claude Code</strong></summary>

```bash
claude plugin marketplace add zyx1121/i-have-dyslexia
claude plugin install i-have-dyslexia@i-have-dyslexia
```

Then type `/i-have-dyslexia`. No local clone needed — Claude Code fetches the repo and keeps it updated.

</details>

<details>
<summary><strong>Codex</strong></summary>

```bash
codex plugin marketplace add zyx1121/i-have-dyslexia --ref main
codex plugin add i-have-dyslexia@i-have-dyslexia
```

Then type `$i-have-dyslexia` to apply the output style explicitly.

</details>

Install instructions for other coding agents live in [INSTALL.md](./INSTALL.md).

## What it does

Dense text is expensive to decode. Long lines lose the reader at every wrap. Layouts that change every reply must be re-learned every reply.

This skill makes the agent pay those costs instead of you:

- **Fixed skeleton** — answer on the first line, next step on the last line, always.
- **Short lines** — one sentence per bullet, under 15 words each.
- **No walls** — no block taller than 3 rendered lines.
- **Bold anchors** — skim only the bold words and the gist survives.

## The rules

10 rules. Full text in [SKILL.md](./skills/i-have-dyslexia/SKILL.md).

1. Same skeleton, every reply.
2. One sentence per bullet.
3. Sentences under 15 words.
4. No block taller than 3 lines.
5. Bold the anchors: numbers, file names, verdicts.
6. Blank line between every block.
7. Plain words.
8. No italics, no ALL CAPS.
9. Digits, not number words.
10. Front-load every line.

## Tune it

Fork, edit `skills/i-have-dyslexia/SKILL.md`, install your fork:

```bash
claude plugin marketplace add <your-username>/i-have-dyslexia
```

Re-invoke `/i-have-dyslexia`.

## Credits

Grounded in the [British Dyslexia Association Style Guide](https://www.bdadyslexia.org.uk/advice/employers/creating-a-dyslexia-friendly-workplace/dyslexia-friendly-style-guide). Adapted for how an LLM formats replies, not how documents are typeset.

Repo structure and spirit borrowed from [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd).

## License

[MIT](LICENSE) — Star ⭐ if it saved you one reread of one wall of text.
