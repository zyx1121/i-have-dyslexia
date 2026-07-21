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

<sub>Same bug, same facts. One column a dyslexic reader has to fight through, one they can skim.</sub>

# i-have-dyslexia

> Turns any coding agent's replies into something a dyslexic brain can actually skim, not just a shorter wall of text.

`dyslexia` · `accessibility` · `output-style` · `claude-code` · `codex`

[![Claude Code plugin](https://img.shields.io/badge/Claude%20Code-plugin-d97757)](https://github.com/zyx1121/i-have-dyslexia) &nbsp;[![License: MIT](https://img.shields.io/badge/license-MIT-blue)](#license)

A sibling of [i-have-adhd](https://github.com/ayghri/i-have-adhd): that one stops the agent from burying the answer, this one stops it from producing text a dyslexic brain cannot decode. Same shape: one skill, one fixed reply layout, off until you ask for it.

## Install

<details>
<summary><strong>Claude Code</strong></summary>

```bash
claude plugin marketplace add zyx1121/i-have-dyslexia
claude plugin install i-have-dyslexia@i-have-dyslexia
```

Type `/i-have-dyslexia`. No local clone needed: Claude Code fetches the repo and keeps it updated.

</details>

<details>
<summary><strong>Codex</strong></summary>

```bash
codex plugin marketplace add zyx1121/i-have-dyslexia --ref main
codex plugin add i-have-dyslexia@i-have-dyslexia
```

Type `$i-have-dyslexia` to apply the output style explicitly.

</details>

Antigravity, Cursor, OpenCode, Amp, Pi, and any other agent-skills harness: full steps in [INSTALL.md](./INSTALL.md).

## What it does

Dense text is expensive to decode. Long lines lose the reader at every wrap. A layout that changes every reply has to be relearned every reply.

This skill makes the agent pay those costs instead of you:

- **Fixed skeleton**: answer on the first line, next step on the last line, always.
- **Short lines**: one sentence per bullet, under 15 words each.
- **No walls**: no block taller than 3 rendered lines.
- **Bold anchors**: skim only the bold words and the gist survives.

## The rules

10 rules, grounded in how dyslexia changes reading, not typesetting convention. Full text in [SKILL.md](./skills/i-have-dyslexia/SKILL.md).

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

> [!NOTE]
> Opt-in only. `SKILL.md` sets `disable-model-invocation: true`, so nothing changes until you type `/i-have-dyslexia` (or wire the always-on snippet in [INSTALL.md](./INSTALL.md)). Say "stop dyslexia mode" to turn it back off.

## Tune it

Fork it, edit `skills/i-have-dyslexia/SKILL.md`, install your fork with `claude plugin marketplace add <your-username>/i-have-dyslexia`, then re-invoke `/i-have-dyslexia`.

## Credits

Grounded in the [British Dyslexia Association Style Guide](https://www.bdadyslexia.org.uk/advice/employers/creating-a-dyslexia-friendly-workplace/dyslexia-friendly-style-guide), adapted for how an LLM shapes a reply, not how a document is typeset. Repo structure and spirit borrowed from [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd).

## Contributing

Ground rules in [CONTRIBUTING.md](https://github.com/zyx1121/.github/blob/main/CONTRIBUTING.md).

## License

[MIT](LICENSE) · star it if it saved you one reread of one wall of text.
