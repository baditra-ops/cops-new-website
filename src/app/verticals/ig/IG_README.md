# IG (Intelligence Group) Vertical — Content Editor Guide

> This guide explains how to add, edit, or remove **AI Projects**, **Researchers & Team Members**, and **Research Papers/Articles** on the IG section of the COPS website. No code changes required for routine content updates — just edit the JSON files or add markdown articles.

---

## 📁 Folder Map

```
public/
├── igteam/
│   ├── pics/                  ← Team member portrait photos
│   ├── webmds/                ← Research articles & markdown docs (shown on /resources page)
│   └── igteam.json            ← Team member data (shown on /team page)
│
└── igprojectsdata/
    ├── pics/                  ← Project thumbnail images (16:9 recommended)
    └── igprojectsdata.json    ← Project data (shown on /project and landing page)
```

---

## 👥 Team Members (`/verticals/ig/team` page)

### Add a New Member

1. **Add the portrait photo** (optional if using default avatar glow) in `public/igteam/pics/`.
2. **Edit `public/igteam/igteam.json`** and append a new entry:

```json
{
  "id": 7,
  "name": "Jane Doe",
  "role": "LLM Alignment Researcher",
  "image": "/igteam/pics/jane.jpg",
  "bio": "Researching Direct Preference Optimization (DPO) and constitutional AI alignment.",
  "github": "https://github.com/janedoe",
  "linkedin": "https://linkedin.com/in/janedoe"
}
```

---

## 🚀 Projects & Models (`/verticals/ig/project` page + landing page)

### Add a New Project

1. **Add project screenshot** in `public/igprojectsdata/pics/`.
2. **Edit `public/igprojectsdata/igprojectsdata.json`** and append an entry:

```json
{
  "id": 5,
  "projectname": "COPS RAG Agent",
  "description": "Lightweight retrieval-augmented generation assistant for searching university knowledge bases.",
  "developer": "Jane Doe",
  "githublink": "https://github.com/cops-ig/cops-rag-agent",
  "deployedlink": "https://rag.copsiitbhu.co.in",
  "status": "OK",
  "featured": true,
  "image": "/igprojectsdata/pics/rag-agent.png",
  "stack": ["PyTorch", "FastAPI", "LangChain", "VectorDB"]
}
```

---

## 📚 Research Papers & Articles (`/verticals/ig/resources` page)

### Add a New Paper / Guide

Simply drop a standard Markdown file into:
```
public/igteam/webmds/my-new-paper.md
```

Start the markdown file with a main `# Title` header:

```markdown
# Fine-Tuning Vision Transformers for Edge Telemetry

An overview of ViT patch embedding compression and TensorRT quantization for autonomous drones.

## Abstract
...
```

The system automatically parses the markdown file and renders it on `/verticals/ig/resources`.
