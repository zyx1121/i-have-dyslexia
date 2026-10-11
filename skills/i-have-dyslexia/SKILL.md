---
name: i-have-dyslexia
description: 'Shape output for a reader with dyslexia: short sentences, one idea per line, a fixed reply skeleton, bold anchor words, and no walls of text. Invoke with /i-have-dyslexia; stays on until "stop dyslexia mode".'
disable-model-invocation: true
---

# i-have-dyslexia

The reader has dyslexia. Output is not just short. It is shaped so a dyslexic brain can decode it.

## What dyslexia changes about reading

Five facts drive every rule below:

1. Decoding is not automatic. Every word costs effort, so every extra word is a tax.
2. Working memory fills up while decoding. A long sentence collapses before its point arrives.
3. Line tracking is fragile. Long wrapped lines lose the reader at every return sweep to the next line.
4. A dense block has no entry point. Walls of text do not get skimmed. They get skipped.
5. Layout is memory. A fixed skeleton is learned once. A new layout must be decoded like text.

## Rules

### 1. Same skeleton, every reply

```
First line: the answer or result
(blank line)
Middle: details, as a list
(blank line)
Last line: the next step
```

The reader should never search. Answer at the top. Action at the bottom. Every time.

### 2. One sentence per bullet

One idea per sentence. A bullet never carries two sentences.

Bad: "Fix the null check in config.ts, and while you're there the port default is also wrong, so update that too and rerun the tests."

Good:
```
- Fix the null check in `src/config.ts:31`
- Set the port default to `3000`
- Run `npm test`
```

### 3. Keep sentences under 15 words

No nested clauses. Split instead.

Bad: "The test fails because the config loader, which is mocked in unit tests but not in integration tests, returns null."

Good: "The config loader returns null. Unit tests mock it. Integration tests do not."

### 4. No block taller than 3 lines

A paragraph is 2 sentences, maximum. When a third sentence arrives, split the block or switch to a list.

### 5. Bold the anchors

Bold the words that carry the message: **numbers**, **file names**, **verdicts**.

Test: reading only the bold words must still give the gist.

Over-bolding breaks this. When half the text is bold, nothing is an anchor.

### 6. Blank line between every block

Whitespace is navigation, not waste. A long sparse reply beats a short dense one.

### 7. Plain words

"use" not "utilize". "start" not "initiate". "about" not "approximately".

Exception: code identifiers, API names, and error strings stay exactly as written.

### 8. No italics, no ALL CAPS

Italics merge letterforms. Caps flatten word shape. Both slow decoding.

Emphasis is bold. Only bold.

### 9. Digits, not number words

"7 files", not "seven files". Digits are recognized by shape. Number words must be decoded.

### 10. Front-load every line

Key word first, context after.

Bad: "After looking through the middleware and the logging config, I found the bug in `auth.ts`."

Good: "Bug found: `auth.ts:42`. The middleware and logging config are clean."

## When to break the rules

1. Code, logs, and error messages stay verbatim. Never rewrite them for readability.
2. "Explain in depth" means long is fine. Keep the chunking and add headers to skim by.
3. Destructive action ahead (`rm -rf`, force push, dropping a table): confirm fully. Safety beats brevity.

## Pre-send check

Before sending, verify:

1. Any block taller than 3 lines? Split it.
2. Any sentence past 15 words? Cut or split.
3. Read only the bold. Does the gist survive?
4. First line = the answer? Last line = the next step?

If yes, send.
