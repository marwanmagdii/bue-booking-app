# Graph Report - .  (2026-08-02)

## Corpus Check
- Large corpus: 87 files · ~1,694,389 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder.

## Summary
- 804 nodes · 2480 edges · 34 communities (33 shown, 1 thin omitted)
- Extraction: 88% EXTRACTED · 12% INFERRED · 0% AMBIGUOUS · INFERRED: 302 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Docs Bundled Runtime
- Docs React Navigation Core
- Docs Component Tree State
- App View Transition State
- React DOM Client Hydration
- Core Dependencies & Tooling
- Docs UI Icons & Utilities
- Interactive Motion & Effects
- Docs Layout & Theme Registry
- Docs Date & Schedule Controls
- Calendar & Date Utilities
- Docs Booking Card Renders
- Vite Application Entry Bundle
- TypeScript Client Config
- QR Pass & Access Engine
- Room Filter & Search Engine
- Shadcn UI Path Aliases
- Notification & Badge Dispatcher
- TypeScript Node & Vite Config
- Team Member Invite Flow
- Floorplan & 3D Interactive Map
- Oxlint Linter Rules
- Category Chips & Quick Filters
- Docs Space Category Controls
- Time Slot Picker & Capacity
- Booking Confirmation Modal
- React Scheduler & Hydration Hook
- Toast Notification Banner
- Profile & History Manager
- Project Architecture & Deployment
- TypeScript Root References

## God Nodes (most connected - your core abstractions)
1. `ne()` - 48 edges
2. `ne()` - 48 edges
3. `n()` - 47 edges
4. `n()` - 47 edges
5. `nc()` - 42 edges
6. `nc()` - 42 edges
7. `r()` - 39 edges
8. `r()` - 39 edges
9. `t()` - 35 edges
10. `t()` - 35 edges

## Surprising Connections (you probably didn't know these)
- `BUE Smart Space Booking` --DEPLOYS_VIA--> `GitHub Pages Deployment Workflow`  [EXTRACTED]
  README.md → .github/workflows/deploy.yml
- `BUE Smart Space Booking` --FOLLOWS_GUIDELINES--> `BUE Web Design Guidelines & Liquid Glass`  [EXTRACTED]
  README.md → .agents/skills/web-design-guidelines/SKILL.md

## Import Cycles
- None detected.

## Communities (34 total, 1 thin omitted)

### Community 0 - "Docs Bundled Runtime"
Cohesion: 0.05
Nodes (48): _a(), bi(), br(), bs(), Cn(), cr(), cs(), dd() (+40 more)

### Community 1 - "Docs React Navigation Core"
Cohesion: 0.07
Nodes (58): ac(), af(), at(), be(), c(), Ca(), cc(), cf() (+50 more)

### Community 2 - "Docs Component Tree State"
Cohesion: 0.07
Nodes (51): ae(), ar(), bn(), bu(), cd(), ce(), De(), dn() (+43 more)

### Community 3 - "App View Transition State"
Cohesion: 0.07
Nodes (45): ai(), Ao(), as(), Bo(), bs(), ci(), cs(), ds() (+37 more)

### Community 4 - "React DOM Client Hydration"
Cohesion: 0.11
Nodes (42): aa(), af(), bd(), bi(), bt(), cd(), d(), dt() (+34 more)

### Community 5 - "Core Dependencies & Tooling"
Cohesion: 0.05
Nodes (41): autoprefixer, gh-pages, lucide-react, oxlint, dependencies, lucide-react, react, react-dom (+33 more)

### Community 6 - "Docs UI Icons & Utilities"
Cohesion: 0.09
Nodes (42): bl(), bt(), cl(), da(), df(), dl(), ec(), ef() (+34 more)

### Community 7 - "Interactive Motion & Effects"
Cohesion: 0.11
Nodes (41): ac(), be(), Ca(), cc(), cf(), co(), dc(), Do() (+33 more)

### Community 8 - "Docs Layout & Theme Registry"
Cohesion: 0.13
Nodes (41): aa(), as(), b(), bd(), Bo(), cp(), d(), dt() (+33 more)

### Community 9 - "Docs Date & Schedule Controls"
Cohesion: 0.08
Nodes (36): ai(), ap(), ci(), ct(), dp(), fs(), Go(), Gt() (+28 more)

### Community 10 - "Calendar & Date Utilities"
Cohesion: 0.12
Nodes (33): ae(), b(), c(), ce(), De(), Ee(), f(), fd() (+25 more)

### Community 11 - "Docs Booking Card Renders"
Cohesion: 0.11
Nodes (30): ad(), Ao(), Au(), Cu(), $e(), Eu(), Fu(), Gd() (+22 more)

### Community 12 - "Vite Application Entry Bundle"
Cohesion: 0.10
Nodes (11): _a(), Cn(), dd(), df(), ga(), hl(), jl(), ml() (+3 more)

### Community 13 - "TypeScript Client Config"
Cohesion: 0.07
Nodes (26): DOM, src, vite/client, compilerOptions, allowArbitraryExtensions, allowImportingTsExtensions, baseUrl, erasableSyntaxOnly (+18 more)

### Community 14 - "QR Pass & Access Engine"
Cohesion: 0.13
Nodes (23): bl(), da(), dl(), ef(), gf(), gl(), Hf(), If() (+15 more)

### Community 15 - "Room Filter & Search Engine"
Cohesion: 0.16
Nodes (22): ad(), Au(), Cu(), $e(), Eu(), Gd(), gu(), id() (+14 more)

### Community 16 - "Shadcn UI Path Aliases"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 17 - "Notification & Badge Dispatcher"
Cohesion: 0.16
Nodes (20): cl(), ec(), el(), fl(), hc(), Il(), jc(), Ll() (+12 more)

### Community 18 - "TypeScript Node & Vite Config"
Cohesion: 0.10
Nodes (19): node, vite.config.ts, compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection (+11 more)

### Community 19 - "Team Member Invite Flow"
Cohesion: 0.18
Nodes (16): ar(), bn(), Dr(), Ed(), fn(), gs(), lr(), m() (+8 more)

### Community 20 - "Floorplan & 3D Interactive Map"
Cohesion: 0.16
Nodes (14): bu(), cp(), dn(), dp(), ln(), lp(), on(), qe() (+6 more)

### Community 21 - "Oxlint Linter Rules"
Cohesion: 0.16
Nodes (11): plugins, rules, react/only-export-components, react/rules-of-hooks, $schema, oxc, react, typescript (+3 more)

### Community 22 - "Category Chips & Quick Filters"
Cohesion: 0.32
Nodes (13): Bc(), fo(), ia(), io(), Ki(), O(), po(), Rc() (+5 more)

### Community 23 - "Docs Space Category Controls"
Cohesion: 0.35
Nodes (12): Bc(), fo(), io(), Ki(), Mo(), O(), Rc(), vc() (+4 more)

### Community 24 - "Time Slot Picker & Capacity"
Cohesion: 0.24
Nodes (10): at(), Go(), Ho(), hu(), it(), lt(), Lu(), Uu() (+2 more)

### Community 25 - "Booking Confirmation Modal"
Cohesion: 0.25
Nodes (9): br(), cr(), fr(), pr(), Sr(), wr(), xr(), yd() (+1 more)

### Community 26 - "React Scheduler & Hydration Hook"
Cohesion: 0.25
Nodes (7): ct(), Gt(), ip(), op(), rp(), st(), ut()

### Community 27 - "Toast Notification Banner"
Cohesion: 0.29
Nodes (7): ap(), kp(), np(), ot(), qa(), tp(), wp()

### Community 28 - "Profile & History Manager"
Cohesion: 0.40
Nodes (5): fc(), Ic(), pc(), rt(), wu()

### Community 29 - "Project Architecture & Deployment"
Cohesion: 0.67
Nodes (3): BUE Smart Space Booking, GitHub Pages Deployment Workflow, BUE Web Design Guidelines & Liquid Glass

## Knowledge Gaps
- **89 isolated node(s):** `$schema`, `typescript`, `oxc`, `react/rules-of-hooks`, `warn` (+84 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ne()` connect `Calendar & Date Utilities` to `App View Transition State`, `React DOM Client Hydration`, `Interactive Motion & Effects`, `Vite Application Entry Bundle`, `Notification & Badge Dispatcher`, `Team Member Invite Flow`, `Floorplan & 3D Interactive Map`, `Category Chips & Quick Filters`, `Time Slot Picker & Capacity`, `React Scheduler & Hydration Hook`?**
  _High betweenness centrality (0.002) - this node is a cross-community bridge._
- **Why does `ne()` connect `Docs Component Tree State` to `Docs Bundled Runtime`, `Docs React Navigation Core`, `Docs UI Icons & Utilities`, `Docs Layout & Theme Registry`, `Docs Date & Schedule Controls`, `Docs Space Category Controls`?**
  _High betweenness centrality (0.002) - this node is a cross-community bridge._
- **Are the 17 inferred relationships involving `ne()` (e.g. with `be()` and `ce()`) actually correct?**
  _`ne()` has 17 INFERRED edges - model-reasoned connections that need verification._
- **Are the 17 inferred relationships involving `ne()` (e.g. with `be()` and `ce()`) actually correct?**
  _`ne()` has 17 INFERRED edges - model-reasoned connections that need verification._
- **Are the 28 inferred relationships involving `n()` (e.g. with `assets/index-A5cx1w-l.js` and `as()`) actually correct?**
  _`n()` has 28 INFERRED edges - model-reasoned connections that need verification._
- **Are the 28 inferred relationships involving `n()` (e.g. with `docs/assets/index-A5cx1w-l.js` and `as()`) actually correct?**
  _`n()` has 28 INFERRED edges - model-reasoned connections that need verification._
- **What connects `$schema`, `typescript`, `oxc` to the rest of the system?**
  _89 weakly-connected nodes found - possible documentation gaps or missing edges._