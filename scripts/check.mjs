#!/usr/bin/env node
// Checks replies against the rules of skills/i-have-dyslexia/SKILL.md that a script can judge.
// Usage: node scripts/check.mjs <transcript.jsonl>...   (Claude Code session transcripts)
//        node scripts/check.mjs --text <file>...        (one reply per file)
// Prints, per rule, how many replies break it and the share of replies, plus a few short examples.
import { readFileSync } from "node:fs";

const CJK = /[㐀-鿿豈-﫿]/g;
const NUMBER_WORDS = /\b(two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|twenty)\b|[兩二三四五六七八九十][個條次項台份張步行頁天種組輪筆支位]/gi;

// Replies are the last text block of each assistant turn that a person's message follows.
function repliesFromTranscript(path) {
  const replies = [];
  let last = null;
  for (const line of readFileSync(path, "utf8").split("\n")) {
    if (!line) continue;
    let o;
    try { o = JSON.parse(line); } catch { continue; }
    if (o.isSidechain) continue;
    if (o.type === "assistant") {
      for (const c of o.message?.content ?? []) if (c.type === "text" && c.text.trim()) last = c.text;
    } else if (o.type === "user") {
      const content = o.message?.content;
      const human = typeof content === "string" || (Array.isArray(content) && content.some((c) => c.type === "text") && !content.some((c) => c.type === "tool_result"));
      if (human && last) { replies.push(last); last = null; }
    }
  }
  if (last) replies.push(last);
  return replies;
}

// Code blocks, inline code, links and tables are kept verbatim by the rules, so they are not judged.
function prose(text) {
  return text
    .replace(/```[\s\S]*?```/g, "")
    .split("\n")
    .filter((l) => !/^\s*\|/.test(l))
    .join("\n")
    .replace(/`[^`]*`/g, "X")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/https?:\/\/\S+/g, "URL");
}

const sentences = (block) => block.replace(/\*\*/g, "").split(/(?<=[。！？])|(?<=[.!?])\s+/).map((s) => s.trim()).filter((s) => s.length > 1);
const isCjk = (s) => (s.match(CJK) ?? []).length > s.length * 0.3;
// CJK: each character is 1 unit and each Latin word or number is 1 unit, so "MCP server" counts 2, not 9.
const units = (s) => (s.match(CJK) ?? []).length + (s.replace(CJK, " ").match(/[A-Za-z0-9][\w.'-]*/g) ?? []).length;
const tooLong = (s) => (isCjk(s) ? units(s) > 30 : s.split(/\s+/).length > 15);
const listItem = /^\s*(?:[-*+]|\d+\.)\s+/;

function check(reply) {
  const text = prose(reply);
  const lines = text.split("\n");
  const found = {};
  const hit = (rule, sample) => { (found[rule] ??= []).push(sample.trim().slice(0, 80)); };

  // Rule 8: a list holds 5 items at most (items at the same indent, in one run).
  let run = 0, indent = -1;
  for (const l of [...lines, ""]) {
    const m = l.match(/^(\s*)(?:[-*+]|\d+\.)\s+/);
    if (m && (indent === -1 || m[1].length === indent)) { run++; indent = m[1].length; }
    else if (m && m[1].length > indent) continue;
    else { if (run > 5) hit("8 list over 5 items", `${run} items`); run = m ? 1 : 0; indent = m ? m[1].length : -1; }
  }
  // Rules 6, 7, 8: one sentence per bullet, short sentences, paragraphs of 2 sentences at most.
  for (const block of text.split(/\n\s*\n/)) {
    const ls = block.split("\n").filter((l) => l.trim() && !/^\s*#/.test(l));
    for (const l of ls) {
      const body = l.replace(listItem, "");
      const ss = sentences(body);
      if (listItem.test(l) && ss.length > 1) hit("6 bullet with 2+ sentences", body);
      for (const s of ss) if (tooLong(s)) hit("7 sentence too long", s);
    }
    const para = ls.filter((l) => !listItem.test(l)).join(" ");
    if (para && sentences(para).length > 2) hit("8 paragraph over 2 sentences", para);
  }
  // Rule 11: no italics.
  for (const m of text.matchAll(/(?<![*\w])\*(?!\*)[^*\n]+\*(?!\*)|(?<![\w_])_[^_\n]+_(?![\w_])/g)) hit("11 italics", m[0]);
  // Rule 12: digits, not number words.
  for (const m of text.matchAll(NUMBER_WORDS)) hit("12 number word", m[0]);
  // Rule 9: bold only the anchors (flag a reply where bold covers over a quarter of the prose).
  const bold = [...text.matchAll(/\*\*([^*]+)\*\*/g)].reduce((n, m) => n + m[1].length, 0);
  const plain = text.replace(/\*\*/g, "").replace(/\s/g, "").length;
  if (plain > 40 && bold / plain > 0.25) hit("9 bold over 25%", `${Math.round((bold / plain) * 100)}%`);
  // Rule 5: the last line is not a question unless the reader must decide (counted, not judged).
  const lastLine = lines.filter((l) => l.trim()).at(-1) ?? "";
  if (/[?？]\s*$/.test(lastLine)) hit("5 ends with a question (check by hand)", lastLine);
  return found;
}

const args = process.argv.slice(2);
const textMode = args[0] === "--text";
const files = textMode ? args.slice(1) : args;
const replies = files.flatMap((f) => (textMode ? [readFileSync(f, "utf8")] : repliesFromTranscript(f)));
const totals = {};
for (const r of replies) for (const [rule, samples] of Object.entries(check(r))) (totals[rule] ??= { replies: 0, hits: 0, samples: [] }), totals[rule].replies++, (totals[rule].hits += samples.length), totals[rule].samples.push(...samples.slice(0, 1));
console.log(`${replies.length} replies`);
for (const [rule, t] of Object.entries(totals).sort((a, b) => b[1].replies - a[1].replies)) {
  console.log(`\n${rule}: ${t.replies} replies (${Math.round((t.replies / replies.length) * 100)}%), ${t.hits} hits`);
  for (const s of t.samples.slice(0, 3)) console.log(`  e.g. ${s}`);
}
