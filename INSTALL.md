# Install i-have-dyslexia

One skill. Claude Code, Codex, Antigravity, and any harness that reads agent skills.

<details>
<summary><strong>Claude Code</strong></summary>

### Install

```bash
claude plugin marketplace add zyx1121/i-have-dyslexia
claude plugin install i-have-dyslexia@i-have-dyslexia
```

Type `/i-have-dyslexia`.

### Verify

```bash
claude plugin list
```

### Update

```bash
claude plugin marketplace update i-have-dyslexia
```

### Uninstall

```bash
claude plugin uninstall i-have-dyslexia
claude plugin marketplace remove i-have-dyslexia
```

Or keep it installed and turn it off: `claude plugin disable i-have-dyslexia`.

### Always-on (optional)

Import the full skill into `~/.claude/CLAUDE.md`. Claude Code loads the file at the start of every session:

```markdown
## Output style

Follow these rules in every reply:

@~/.claude/plugins/marketplaces/i-have-dyslexia/skills/i-have-dyslexia/SKILL.md
```

The import reads the marketplace clone. Run `claude plugin marketplace update i-have-dyslexia` to get new rules.

</details>

<details>
<summary><strong>Codex</strong></summary>

### Install

```bash
codex plugin marketplace add zyx1121/i-have-dyslexia --ref main
codex plugin add i-have-dyslexia@i-have-dyslexia
```

Type `$i-have-dyslexia`.

### Verify

```bash
codex plugin list
```

### Update

```bash
codex plugin marketplace upgrade i-have-dyslexia
codex plugin remove i-have-dyslexia
codex plugin add i-have-dyslexia@i-have-dyslexia
```

### Uninstall

```bash
codex plugin remove i-have-dyslexia
codex plugin marketplace remove i-have-dyslexia
```

### Always-on (optional)

Add to `~/.codex/AGENTS.md`:

```markdown
## Output style

Always follow the rules in the `i-have-dyslexia` skill: fixed skeleton, one sentence per bullet, sentences under 15 words, bold anchors, no walls of text.
```

</details>

<details>
<summary><strong>Antigravity (<code>agy</code>)</strong></summary>

### Install

```bash
agy plugin install https://github.com/zyx1121/i-have-dyslexia
```

### Verify

```bash
agy plugin list
```

### Update

```bash
agy plugin uninstall i-have-dyslexia
agy plugin install https://github.com/zyx1121/i-have-dyslexia
```

### Uninstall

```bash
agy plugin uninstall i-have-dyslexia
```

Or keep it installed and turn it off: `agy plugin disable i-have-dyslexia`.

### Always-on (optional)

Add to `~/.gemini/GEMINI.md`:

```markdown
## Output style

Always follow the rules in the `i-have-dyslexia` skill: fixed skeleton, one sentence per bullet, sentences under 15 words, bold anchors, no walls of text.
```

</details>

<details>
<summary><strong>Cursor, OpenCode, Amp, Pi, and any other agent-skills harness</strong></summary>

Works with any harness that reads agent skills. Swap `-a <agent>` for yours.

### Install

```bash
npx skills add zyx1121/i-have-dyslexia                  # this workspace
npx skills add zyx1121/i-have-dyslexia -g               # all projects
npx skills add zyx1121/i-have-dyslexia -a cursor -y     # one agent only
npx skills add zyx1121/i-have-dyslexia -a opencode -y
```

New agent chat, type `/i-have-dyslexia`.

Without the CLI, copy the skill folder into whatever path your agent scans:

```bash
git clone https://github.com/zyx1121/i-have-dyslexia
mkdir -p ~/.cursor/skills     # Cursor. Use .agents/skills for OpenCode, or your agent's own path
cp -R i-have-dyslexia/skills/i-have-dyslexia ~/.cursor/skills/
```

### Verify

```bash
npx skills list
npx skills ls -g    # if installed globally
```

### Update

```bash
npx skills update i-have-dyslexia
npx skills update -g    # if installed globally
```

### Uninstall

```bash
npx skills remove i-have-dyslexia
npx skills remove i-have-dyslexia -g    # if installed globally
```

### Always-on (optional)

Paste this into your agent's persistent rules file. Cursor: **Settings → Rules → User Rules**, or a project rule under `.cursor/rules/` with `alwaysApply: true`. OpenCode: `~/.config/opencode/AGENTS.md`.

```markdown
## Output style

Always follow the rules in the `i-have-dyslexia` skill: fixed skeleton, one sentence per bullet, sentences under 15 words, bold anchors, no walls of text.
```

</details>

## How activation works

1. **Installed, not invoked.** Nothing happens. `SKILL.md` sets `disable-model-invocation: true`, so the model never sees the skill and never applies the rules on its own.
2. **You type `/i-have-dyslexia`.** Rules on for that session. "stop dyslexia mode" or "normal mode" turns them off.
3. **You add the always-on config above.** Rules on from message one, every session.

No middle ground. If you did not turn it on, it is off.

## Troubleshooting

**`/i-have-dyslexia` not in autocomplete.** Restart the agent. The plugin index is read at startup.

**`claude plugin marketplace add` fails.** Use the `owner/repo` form. A local path must point at the repo root, not `.claude-plugin/`.

**Installed but replies are still walls of text.** Open a new session. If it still drifts, tighten the wording in `skills/i-have-dyslexia/SKILL.md`.

**Want different rules.** Fork, edit `skills/i-have-dyslexia/SKILL.md`, install your fork: `claude plugin marketplace add <your-username>/i-have-dyslexia`.

**Skill missing after `npx skills add`.** Start a new agent chat. Skills are indexed at session start. Confirm the folder landed where your agent scans (`~/.cursor/skills/` for Cursor, `.agents/skills/` for OpenCode) and that the frontmatter `name` matches the folder name.
