#!/usr/bin/env python3
"""
Content checker for SmartWebCare's written pages (see docs/CONTENT-STYLE.md).

  python3 scripts/check-content.py data/service-subpages/ai-agents.json   # one or more files
  python3 scripts/check-content.py --all                                  # every file + duplicate scan

Checks structure, counts, word counts, SEO field lengths, banned filler phrases, internal link
targets and — with --all — repeated sentences / near-duplicate passages across pages.
Exit code 1 if any error is found. Standard library only.
"""
import json
import re
import sys
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
ALLOWED = set((ROOT / "scripts" / "allowed-paths.txt").read_text().split())
CATEGORIES = {"ai-automation", "search-visibility", "social-content", "brand-growth"}

BANNED = [
    "in today's fast-paced", "digital landscape", "ever-evolving", "game-changer", "game changer",
    "unlock", "unleash", "leverage", "delve", "elevate", "revolutioniz", "cutting-edge",
    "seamless", "supercharge", "skyrocket", "in conclusion", "look no further", "one-stop",
    "world-class", "#1", "best-in-class", "100%",
]
LINK_RE = re.compile(r"\[([^\]]+)\]\(([^)\s]+)\)")


def words(text):
    return len(re.findall(r"[A-Za-z0-9₹'’-]+", LINK_RE.sub(r"\1", text)))


class Report:
    def __init__(self, name):
        self.name, self.errors, self.warnings = name, [], []

    def err(self, msg):
        self.errors.append(msg)

    def warn(self, msg):
        self.warnings.append(msg)


def texts_of(node):
    """Every human-readable string inside a JSON node (skips slugs/urls)."""
    if isinstance(node, str):
        yield node
    elif isinstance(node, list):
        for x in node:
            yield from texts_of(x)
    elif isinstance(node, dict):
        for k, v in node.items():
            if k in ("slug", "category", "url", "published", "updated"):
                continue
            yield from texts_of(v)


def need(r, obj, key, kind, where):
    v = obj.get(key) if isinstance(obj, dict) else None
    if kind == "str" and not (isinstance(v, str) and v.strip()):
        r.err(f"{where}.{key}: missing or empty text")
        return ""
    if kind == "list" and not isinstance(v, list):
        r.err(f"{where}.{key}: must be a list")
        return []
    return v


def check_count(r, items, lo, hi, where):
    if not (lo <= len(items) <= hi):
        r.err(f"{where}: has {len(items)} items, needs {lo}–{hi}")


def check_seo(r, page, where):
    t = need(r, page, "metaTitle", "str", where)
    d = need(r, page, "metaDescription", "str", where)
    need(r, page, "title", "str", where)
    need(r, page, "lead", "str", where)
    if t and not (30 <= len(t) <= 52):
        r.err(f"{where}.metaTitle: {len(t)} chars, needs 30–52 ({t!r})")
    if d and not (120 <= len(d) <= 158):
        r.err(f"{where}.metaDescription: {len(d)} chars, needs 120–158")
    return t


def check_faqs(r, page, where, lo=3, hi=4):
    faqs = need(r, page, "faqs", "list", where)
    check_count(r, faqs, lo, hi, f"{where}.faqs")
    for i, f in enumerate(faqs):
        need(r, f, "q", "str", f"{where}.faqs[{i}]")
        need(r, f, "a", "str", f"{where}.faqs[{i}]")


def check_sections(r, page, where, lo, hi):
    secs = need(r, page, "sections", "list", where)
    check_count(r, secs, lo, hi, f"{where}.sections")
    for i, s in enumerate(secs):
        w = f"{where}.sections[{i}]"
        need(r, s, "heading", "str", w)
        paras = need(r, s, "paragraphs", "list", w)
        if not paras:
            r.err(f"{w}.paragraphs: needs at least one paragraph")
        if "bullets" in s and not isinstance(s["bullets"], list):
            r.err(f"{w}.bullets: must be a list")


def page_words(page):
    return sum(words(t) for t in texts_of({k: v for k, v in page.items() if k not in ("metaTitle", "metaDescription", "sources")}))


def check_service(r, d):
    if not d.get("slug"):
        r.err("slug: missing")
    g = d.get("guide") or {}
    check_seo(r, g, "guide")
    check_sections(r, g, "guide", 5, 8)
    check_count(r, need(r, g, "takeaways", "list", "guide"), 4, 6, "guide.takeaways")
    check_faqs(r, g, "guide")
    if page_words(g) < 900:
        r.err(f"guide: {page_words(g)} words, needs ≥ 900")

    p = d.get("process") or {}
    check_seo(r, p, "process")
    steps = need(r, p, "steps", "list", "process")
    check_count(r, steps, 5, 7, "process.steps")
    for i, s in enumerate(steps):
        w = f"process.steps[{i}]"
        for k in ("title", "summary", "output"):
            need(r, s, k, "str", w)
        check_count(r, need(r, s, "activities", "list", w), 2, 5, f"{w}.activities")
    check_count(r, need(r, p, "deliverables", "list", "process"), 5, 8, "process.deliverables")
    check_count(r, need(r, p, "youProvide", "list", "process"), 3, 5, "process.youProvide")
    check_faqs(r, p, "process", 3, 3)
    if page_words(p) < 550:
        r.err(f"process: {page_words(p)} words, needs ≥ 550")

    u = d.get("useCases") or {}
    check_seo(r, u, "useCases")
    cases = need(r, u, "cases", "list", "useCases")
    check_count(r, cases, 5, 6, "useCases.cases")
    for i, c in enumerate(cases):
        w = f"useCases.cases[{i}]"
        for k in ("title", "businessType", "challenge"):
            need(r, c, k, "str", w)
        check_count(r, need(r, c, "approach", "list", w), 2, 4, f"{w}.approach")
        check_count(r, need(r, c, "measure", "list", w), 2, 3, f"{w}.measure")
    check_faqs(r, u, "useCases", 3, 3)
    if page_words(u) < 550:
        r.err(f"useCases: {page_words(u)} words, needs ≥ 550")


def check_insight(r, d):
    for k in ("slug", "category", "published"):
        need(r, d, k, "str", "article")
    if d.get("category") not in CATEGORIES:
        r.err(f"category: must be one of {sorted(CATEGORIES)}")
    if d.get("slug") and f"/insights/{d['slug']}" not in ALLOWED:
        r.err(f"slug {d['slug']!r} is not one of the planned insights articles")
    check_seo(r, d, "article")
    check_count(r, need(r, d, "keyPoints", "list", "article"), 3, 5, "keyPoints")
    check_sections(r, d, "article", 6, 10)
    check_faqs(r, d, "article")
    src = d.get("sources", [])
    if not isinstance(src, list):
        r.err("sources: must be a list")
    for i, s in enumerate(src if isinstance(src, list) else []):
        if not (isinstance(s, dict) and s.get("label") and str(s.get("url", "")).startswith("https://")):
            r.err(f"sources[{i}]: needs label + https url")
    if page_words(d) < 1100:
        r.err(f"article: {page_words(d)} words, needs ≥ 1100")


def check_text_rules(r, d):
    links = 0
    for t in texts_of({k: v for k, v in d.items() if k != "sources"}):
        low = t.lower()
        for b in BANNED:
            if b in low:
                r.err(f"banned phrase {b!r} in: {t[:90]!r}")
        for label, href in LINK_RE.findall(t):
            links += 1
            if href.startswith("http"):
                r.err(f"external link in body ({href}) — put references in sources instead")
            elif href.split("#")[0] not in ALLOWED:
                r.err(f"link target not on the site: {href}")
        if re.search(r"\d+(\.\d+)?\s?%", t):
            r.warn(f"percentage — make sure it's a cited public fact: {t[:90]!r}")
    if links < 2:
        r.warn(f"only {links} internal link(s); aim for 2–5 per page")


def check_file(path):
    r = Report(str(path.relative_to(ROOT)))
    try:
        d = json.loads(path.read_text())
    except Exception as e:  # noqa: BLE001
        r.err(f"invalid JSON: {e}")
        return r, None
    if "guide" in d:
        if path.stem != d.get("slug"):
            r.err(f"file name must match slug ({d.get('slug')!r})")
        check_service(r, d)
        for part in ("guide", "process", "useCases"):
            check_text_rules(r, d.get(part, {}))
    else:
        check_insight(r, d)
        check_text_rules(r, d)
    return r, d


def sentences(d):
    for t in texts_of(d):
        for s in re.split(r"(?<=[.!?])\s+", LINK_RE.sub(r"\1", t)):
            s = s.strip().lower()
            if len(s.split()) >= 9:
                yield s


def duplicate_scan(docs):
    """Repeated sentences and shared 10-word runs across different pages."""
    problems = []
    seen = defaultdict(set)
    for name, d in docs:
        for part, node in (d.items() if "guide" in d else [("article", d)]):
            if part in ("slug", "category", "published", "sources"):
                continue
            for s in set(sentences(node)):
                seen[s].add(f"{name}:{part}")
    for s, where in seen.items():
        if len(where) > 1:
            problems.append(f"same sentence on {len(where)} pages {sorted(where)[:3]}: {s[:80]!r}")
    grams = defaultdict(set)
    for name, d in docs:
        for part, node in (d.items() if "guide" in d else [("article", d)]):
            if part in ("slug", "category", "published", "sources"):
                continue
            toks = re.findall(r"[a-z0-9']+", LINK_RE.sub(r"\1", " ".join(texts_of(node))).lower())
            for i in range(len(toks) - 9):
                grams[" ".join(toks[i:i + 10])].add(f"{name}:{part}")
    shared = [(g, w) for g, w in grams.items() if len(w) > 1]
    for g, w in shared[:40]:
        problems.append(f"10-word run on {len(w)} pages {sorted(w)[:3]}: {g!r}")
    return problems


def main(argv):
    files = []
    if "--all" in argv:
        files = sorted((ROOT / "data" / "service-subpages").glob("*.json")) + sorted((ROOT / "data" / "insights").glob("*.json"))
    files += [Path(a).resolve() for a in argv if not a.startswith("--")]
    if not files:
        print(__doc__)
        return 2
    failed = 0
    docs = []
    for f in files:
        r, d = check_file(f)
        if d is not None:
            docs.append((f.stem, d))
        status = "OK " if not r.errors else "ERR"
        print(f"[{status}] {r.name}  ({len(r.errors)} errors, {len(r.warnings)} warnings)")
        for e in r.errors:
            print(f"   ✗ {e}")
        for w in r.warnings:
            print(f"   ! {w}")
        failed += bool(r.errors)
    if "--all" in argv or len(docs) > 1:
        dups = duplicate_scan(docs)
        print(f"\nDuplicate scan across {len(docs)} files: {len(dups)} issue(s)")
        for p in dups:
            print(f"   ✗ {p}")
        failed += bool(dups)
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
