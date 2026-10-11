# i-have-dyslexia

One agent skill, `skills/i-have-dyslexia/SKILL.md`, that formats replies for readers with dyslexia. Manifests for Claude Code, Codex, Antigravity and other skill hosts sit beside it. Read [README.md](README.md) first.

## Rules

- The skill stays opt-in: keep `disable-model-invocation: true`.
- Quote the YAML `description` value. It contains a colon.
- Keep `plugin.json`, `.claude-plugin/`, `.codex-plugin/` and `.agents/plugins/` in agreement on the name and the description.
- Each rule in the skill must trace to how dyslexia changes reading. Do not add typesetting rules.
- Repository documents are English. No em dashes.

## Verify

```sh
claude plugin validate .
```

Then install the plugin from a local path, type `/i-have-dyslexia` and read the next reply. It must follow the skeleton.
