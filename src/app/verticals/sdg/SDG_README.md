# SDG Vertical — Content Editor Guide

> This guide explains how to add, edit, or remove **Projects**, **Team Members**, and **Resources**
> on the SDG section of the COPS website. No code changes required for routine content updates — 
> just edit the right JSON or drop in the right file.

---

## 📁 Folder Map

```
public/
├── sdgteam/
│   ├── pics/                  ← Team member portrait photos
│   ├── webmds/                ← Resource markdown documents (shown on /resources page)
│   └── sdgteam.json           ← Team member data (shown on /team page)
│
└── sdgprojectsdata/
    ├── pics/                  ← Project thumbnail images (16:9 recommended)
    └── sdgprojectsdata.json   ← Project data (shown on /project and landing page)
```

---

## 👥 Team Members (`/team` page)

### Add a New Member

**Step 1 — Add the photo**

Place the portrait photo in:
```
public/sdgteam/pics/
```
- Accepted formats: `.jpg`, `.jpeg`, `.png`, `.webp`
- Recommended: Square crop, minimum 400×400px
- Keep file names lowercase with no spaces (e.g. `john_doe.jpg`)

**Step 2 — Edit the JSON**

Open `public/sdgteam/sdgteam.json` and append a new entry:

```json
{
  "id": 10,
  "name": "John Doe",
  "role": "Full Stack Developer",
  "image": "/sdgteam/pics/john_doe.jpg",
  "bio": "One-line description of this person's focus or superpower.",
  "github": "https://github.com/johndoe",
  "linkedin": "https://linkedin.com/in/johndoe"
}
```

> **Important:** The `id` must be **unique** and higher than the last entry.  
> The `image` path starts with `/sdgteam/pics/` (relative to `public/`).

### Field Reference

| Field      | Required | Description                                      |
|------------|----------|--------------------------------------------------|
| `id`       | ✅        | Unique integer, increment from last              |
| `name`     | ✅        | Full name, displayed in small-caps on the card   |
| `role`     | ✅        | Job title / role, shown in parentheses           |
| `image`    | ✅        | Path to photo in `public/sdgteam/pics/`          |
| `bio`      | ✅        | Short one-liner about the person                 |
| `github`   | ✅        | Full GitHub URL (used for the GitHub icon link)  |
| `linkedin` | ✅        | Full LinkedIn URL (used for the LinkedIn icon)   |

### Edit an Existing Member

Find the entry by `name` or `id` in `sdgteam.json` and update any field directly.  
To change a photo, replace the file in `public/sdgteam/pics/` (keep the same filename to avoid updating JSON).

### Remove a Member

Delete the entire JSON object for that person from `sdgteam.json`.  
You may also delete their photo from `public/sdgteam/pics/` to free up space.

> **Layout auto-adjusts:** The `/team` page dynamically generates the scattered collage layout based
> on how many members are in the JSON. Adding more members simply creates more rows — no layout code
> needs to change.

---

## 🚀 Projects (`/project` page + landing page featured section)

### Add a New Project

**Step 1 — Add the thumbnail**

Place the project screenshot/image in:
```
public/sdgprojectsdata/pics/
```
- Use **16:9 aspect ratio** (e.g. 1280×720px) for best display
- Accepted formats: `.jpg`, `.jpeg`, `.png`, `.webp`
- Keep file names lowercase, no spaces (e.g. `myproject.png`)

**Step 2 — Edit the JSON**

Open `public/sdgprojectsdata/sdgprojectsdata.json` and append a new entry:

```json
{
  "id": 5,
  "projectname": "My New Project",
  "description": "A concise one or two sentence description of what this project does and who it's for.",
  "developer": "Your Name",
  "githublink": "https://github.com/cops-sdg/my-new-project",
  "deployedlink": "https://myproject.copsiitbhu.co.in",
  "status": "IN_PROGRESS",
  "featured": false,
  "image": "/sdgprojectsdata/pics/myproject.png",
  "stack": ["Next.js", "Node.js", "MongoDB"]
}
```

### Field Reference

| Field          | Required | Description                                                               |
|----------------|----------|---------------------------------------------------------------------------|
| `id`           | ✅        | Unique integer, increment from last                                       |
| `projectname`  | ✅        | Project display name                                                      |
| `description`  | ✅        | Short description shown in the list row and verbose dropdown              |
| `developer`    | ✅        | Lead developer's name (displayed in DEV_LEAD column)                      |
| `githublink`   | ✅        | GitHub repo URL (shown as a button in the expanded dropdown)              |
| `deployedlink` | ✅        | Live URL — set to `""` if not yet deployed                                |
| `status`       | ✅        | One of: `"OK"`, `"IN_PROGRESS"`, `"PLANNED"` (controls the status badge) |
| `featured`     | ✅        | `true` = shown on the landing page Top Projects section (max 4 shown)    |
| `image`        | ✅        | Path to thumbnail in `public/sdgprojectsdata/pics/`                      |
| `stack`        | ✅        | Array of tech stack tags (shown in the verbose dropdown)                  |

### Status Badge Values

| Value           | Color    | Meaning                        |
|-----------------|----------|--------------------------------|
| `"OK"`          | 🟢 Green | Project is shipped and live    |
| `"IN_PROGRESS"` | 🟡 Amber | Actively being worked on       |
| `"PLANNED"`     | ⚫ Gray  | Planned but not started yet    |

### Featured Projects (Landing Page)

The landing page shows up to **4 projects** marked with `"featured": true`.  
To feature a project, set `"featured": true` in its JSON entry.  
To remove it from the landing page, set `"featured": false` — it will still appear on `/project`.

> If more than 4 projects have `"featured": true`, only the first 4 (in JSON order) will be shown.

---

## 📄 Resources (`/resources` page)

Resources are **markdown files** (.md) placed in a folder. The page auto-reads all files in that folder.

### Add a New Resource

**Step 1 — Write the markdown**

Create a `.md` file with standard markdown content.  
The first `# Heading` line becomes the document title on the resources page.

```markdown
# My Resource Title

Short intro paragraph.

## Section 1

Content here...
```

**Step 2 — Drop the file**

Place it in:
```
public/sdgteam/webmds/
```

That's it — the file **automatically appears** on the `/resources` page on next page load.  
The auto-generated tag is derived from the filename (e.g. `web3.md` → tag `web3`).

### Naming Convention

| Filename        | Auto Tag     | Auto Type |
|-----------------|--------------|-----------|
| `web.md`        | `web`        | `DOC`     |
| `flutter.md`    | `flutter`    | `DOC`     |
| `web3.md`       | `web3`       | `DOC`     |
| `your-guide.md` | `your-guide` | `DOC`     |

### Remove a Resource

Delete the `.md` file from `public/sdgteam/webmds/`. It will no longer appear on the page.

---

## 🔧 Quick Reference — What file to edit

| I want to...                           | Edit this file / folder                                         |
|----------------------------------------|-----------------------------------------------------------------|
| Add a team member                      | `public/sdgteam/sdgteam.json` + add photo to `public/sdgteam/pics/` |
| Edit team member info / links          | `public/sdgteam/sdgteam.json`                                   |
| Change a team member's photo           | Replace file in `public/sdgteam/pics/`                          |
| Add a project                          | `public/sdgprojectsdata/sdgprojectsdata.json` + add image to `public/sdgprojectsdata/pics/` |
| Feature a project on landing page      | Set `"featured": true` in `sdgprojectsdata.json`                |
| Change a project's status badge        | Change `"status"` field in `sdgprojectsdata.json`               |
| Add a resource doc                     | Drop a `.md` file into `public/sdgteam/webmds/`                 |
| Remove a resource doc                  | Delete the `.md` file from `public/sdgteam/webmds/`             |

---

## ⚠️ Common Mistakes

- **Wrong image path**: The `image` field must start with `/sdgteam/pics/` or `/sdgprojectsdata/pics/` — not a local filesystem path.
- **Duplicate `id`**: Each JSON entry must have a unique `id`. Always increment from the highest existing value.
- **Missing comma**: JSON is strict about commas between entries. Use a JSON validator if the page breaks after editing.
- **Wrong status value**: Only `"OK"`, `"IN_PROGRESS"`, and `"PLANNED"` are valid status values — any other string falls back to dim styling.
- **Image not 16:9 (projects)**: Project cards display images in a 16:9 container. Non-16:9 images will be cropped/stretched.

---

*Last updated by SDG — COPS IIT (BHU) Varanasi*
