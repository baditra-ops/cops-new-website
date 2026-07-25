# IG (Intelligence Group) Vertical — Content Editor Guide

> This guide explains how to add, edit, or remove **AI Projects & Models**, **Researchers & Team Members**, and **Research Papers & WebMDs** on the Intelligence Group (IG) section of the COPS website. No code changes required for routine content updates — just edit the right JSON or drop in a markdown file.

---

## 📁 Folder Map

```
public/
├── igteam/
│   ├── pics/                  ← Team member portrait photos (optional or from /sdgteam/pics/)
│   ├── webmds/                ← Research papers & markdown guides (shown on /resources page)
│   └── igteam.json            ← Researcher & team member data (shown on /team page)
│
└── igprojectsdata/
    ├── pics/                  ← Project thumbnail images (16:9 recommended)
    └── igprojectsdata.json    ← AI project data (shown on /project and landing page)
```

---

## 👥 Team Members & Researchers (`/verticals/ig/team` page)

### Add a New Researcher

**Step 1 — Add the photo**

Place the portrait photo in:
```
public/sdgteam/pics/  (or public/igteam/pics/)
```
- Accepted formats: `.jpeg`, `.jpg`, `.png`, `.webp`
- Recommended: Square or portrait crop, minimum 400×400px
- Keep file names lowercase with no spaces (e.g. `swarit.jpeg`)

**Step 2 — Edit the JSON**

Open `public/igteam/igteam.json` and append a new entry:

```json
{
  "id": 10,
  "name": "Alex Rivers",
  "role": "LLM Alignment Researcher",
  "image": "/sdgteam/pics/alex.jpeg",
  "bio": "Specializes in Direct Preference Optimization (DPO), Constitutional AI, and preference alignment.",
  "github": "https://github.com/alexrivers",
  "linkedin": "https://linkedin.com/in/alexrivers"
}
```

> **Important:** The `id` must be **unique** and higher than the last entry.  
> The `image` path points to the photo file relative to `public/`.

### Field Reference

| Field      | Required | Description                                            |
|------------|----------|--------------------------------------------------------|
| `id`       | ✅        | Unique integer, increment from last                    |
| `name`     | ✅        | Full name of the researcher                            |
| `role`     | ✅        | Research specialization / role in IG wing              |
| `image`    | ✅        | Path to photo file (e.g. `/sdgteam/pics/swarit.jpeg`)  |
| `bio`      | ✅        | One-sentence summary of research focus or superpower   |
| `github`   | ✅        | Full GitHub profile URL (renders clickable icon link)  |
| `linkedin` | ✅        | Full LinkedIn profile URL (renders clickable icon link)|

### Edit an Existing Member

Find the entry by `name` or `id` in `public/igteam/igteam.json` and update any field directly.  
To update a photo, replace the photo file in `public/sdgteam/pics/` or `public/igteam/pics/`.

### Remove a Member

Delete the corresponding JSON object from `public/igteam/igteam.json`.

---

## 🚀 AI Projects & Models (`/verticals/ig/project` page + landing page)

### Add a New AI Project

**Step 1 — Add the thumbnail**

Place the project screenshot in:
```
public/igprojectsdata/pics/
```
- Use **16:9 aspect ratio** (e.g. 1280×720px) for optimal display
- Accepted formats: `.jpg`, `.jpeg`, `.png`, `.webp`

**Step 2 — Edit the JSON**

Open `public/igprojectsdata/igprojectsdata.json` and append a new entry:

```json
{
  "id": 5,
  "projectname": "COPS Vision-RAG Engine",
  "description": "Multimodal retrieval engine integrating Qwen-VL embeddings with LanceDB vector storage for real-time CAD search.",
  "developer": "Swarit Agarwal & Yashashwi Singh",
  "githublink": "https://github.com/cops-ig/vision-rag",
  "deployedlink": "https://ig.copsiitbhu.co.in/vision-rag",
  "status": "OK",
  "featured": true,
  "image": "/igprojectsdata/pics/vision-rag.png",
  "stack": ["PyTorch", "LanceDB", "Qwen-VL", "FastAPI"]
}
```

### Field Reference

| Field          | Required | Description                                                               |
|----------------|----------|---------------------------------------------------------------------------|
| `id`           | ✅        | Unique integer, increment from last                                       |
| `projectname`  | ✅        | AI Project display name                                                   |
| `description`  | ✅        | Short summary of model architecture or project purpose                    |
| `developer`    | ✅        | Project lead or researcher names                                          |
| `githublink`   | ✅        | GitHub repository URL                                                     |
| `deployedlink` | ✅        | Live interactive demo URL — set to `""` if not deployed                   |
| `status`       | ✅        | One of: `"OK"`, `"IN_PROGRESS"`, `"PLANNED"` (controls status badge)       |
| `featured`     | ✅        | `true` = featured on IG landing page Top Projects section (max 4 shown)   |
| `image`        | ✅        | Path to project thumbnail in `public/igprojectsdata/pics/`                |
| `stack`        | ✅        | Array of tech stack tags (e.g. `["PyTorch", "Transformers", "CUDA"]`)      |

### Status Badge Values

| Value           | Color    | Meaning                              |
|-----------------|----------|--------------------------------------|
| `"OK"`          | 🟢 Green | Model / pipeline deployed & live     |
| `"IN_PROGRESS"` | 🟡 Amber | Actively in training / development   |
| `"PLANNED"`     | ⚫ Gray  | Planned research initiative          |

### Featured Projects (IG Landing Page)

The IG homepage displays up to **4 projects** marked with `"featured": true`.  
To feature a project, set `"featured": true`. Set `"featured": false` to show it only on `/verticals/ig/project`.

---

## 📄 Research Papers & WebMDs (`/verticals/ig/resources` page)

Resources on the IG website are **markdown files** (`.md`) placed in the `public/igteam/webmds/` directory. The resources page dynamically reads and renders all markdown files in this folder.

### Add a New Research Paper or Guide

**Step 1 — Write the Markdown File**

Create a `.md` file with a top-level `# Heading` for the title:

```markdown
# Multimodal Diffusion Transformer Benchmarks

An in-depth evaluation of latent space alignment and score-based generative modeling for 3D synthetic assets.

---

## 1. Introduction

Generative models have advanced rapidly...
```

**Step 2 — Drop the File in WebMDs**

Place the `.md` file in:
```
public/igteam/webmds/
```
For example: `public/igteam/webmds/multimodal-diffusion.md`.

The paper will **automatically appear** on the `/verticals/ig/resources` page on next load.

### Domain Categorization Rules

The resources page automatically categorizes papers into **NLP**, **CV**, or **RL** based on the filename:

| Filename Contains          | Assigned Category | Tag Badge  |
|----------------------------|-------------------|------------|
| `vision`, `cv`             | Computer Vision   | `[CV]`     |
| `reinforcement`, `rl`      | Reinforcement Lrn | `[RL]`     |
| `llm`, `rag`, `nlp`        | Natural Language  | `[NLP]`    |
| *any other filename*       | General Research  | `[RESEARCH]`|

> **Automatic Metadata:** Reading time (e.g. `⚡ 4 min read`) and word counts are calculated automatically from the text.

### Remove a Research Paper

Delete the `.md` file from `public/igteam/webmds/`. It will be removed from the page automatically.

---

## 🔧 Quick Reference — What File to Edit

| I want to...                            | Edit this file / folder                                                    |
|-----------------------------------------|----------------------------------------------------------------------------|
| Add an IG researcher                    | `public/igteam/igteam.json` + add photo to `public/sdgteam/pics/`          |
| Update researcher profile / links       | `public/igteam/igteam.json`                                                |
| Add an AI project / model               | `public/igprojectsdata/igprojectsdata.json` + image in `igprojectsdata/pics/`|
| Feature a project on IG homepage        | Set `"featured": true` in `igprojectsdata.json`                            |
| Add a research paper / guide (WebMD)    | Drop `.md` file into `public/igteam/webmds/`                               |
| Remove a research paper                 | Delete `.md` file from `public/igteam/webmds/`                            |

---

## ⚠️ Common Mistakes

- **Invalid image path**: Ensure the `image` field starts with `/sdgteam/pics/` or `/igprojectsdata/pics/` (relative to `public/`).
- **Duplicate `id`**: Each JSON entry must have a unique `id` integer.
- **Strict JSON syntax**: Use valid JSON without trailing commas before closing brackets.
- **Unescaped quotes in markdown**: Use standard markdown backticks for inline code blocks.
- **Filename categorization**: Include `cv`, `rl`, or `nlp` in the `.md` filename if you want it categorized under a specific research wing.

---

*Last updated by Intelligence Group (IG) — COPS IIT (BHU) Varanasi*
