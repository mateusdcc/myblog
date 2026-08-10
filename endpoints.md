# JSON Endpoints

Base URL:

```text
https://mateusdcc.vercel.app
```

All endpoints currently support `GET` and return `application/json`.

## `GET /api/projects`

Returns all blog posts as project records.

### Response

```json
[
  {
    "id": "anote",
    "title": "Anote",
    "content": "...raw Markdown content...",
    "slug": "/anote.md",
    "date": "09/06/2022"
  }
]
```

Fields:

| Field | Type | Description |
| --- | --- | --- |
| `id` | string | Stable post identifier derived from the Markdown filename. |
| `title` | string | Post title from front matter. |
| `content` | string | Raw Markdown body. |
| `slug` | string | Direct URL path for the post, including the `.md` suffix. |
| `date` | string | Post date from front matter. |

## `GET /api/projects/:id`

Returns one project by its stable ID.

Example:

```text
GET /api/projects/anote
```

### Response

```json
{
  "id": "anote",
  "title": "Anote",
  "content": "...raw Markdown content...",
  "slug": "/anote.md",
  "date": "09/06/2022"
}
```

Unknown IDs return:

```json
{
  "error": "Project not found"
}
```

with HTTP status `404`.

## `GET /who-is-me`

Returns the shared MateusDCC profile model for reuse across MateusDCC websites. `/who-is-me` is a rewrite to `/api/who-is-me` and is the preferred public URL.

### Response

```json
{
  "schema": "mateusdcc.who-is-me",
  "version": 1,
  "id": "mateusdcc",
  "name": "MateusDCC",
  "role": "Software Engineer",
  "avatar": "https://github.com/mateusdcc.png",
  "summary": "MateusDCC is a software engineer creating modern web systems, developer tools, and technical architecture articles.",
  "bio": "Full-stack developer focused on clean architecture, minimal design systems, functional web tools, and open source code.",
  "operatingPrinciple": "love using infinite meta-everything as excuse to procastinate a real project",
  "website": "https://mateusdcc.github.io",
  "links": [
    {
      "id": "portfolio",
      "label": "[Me] Portfolio",
      "url": "https://mateusdcc.github.io"
    },
    {
      "id": "blog",
      "label": "[Blog] Articles",
      "url": "https://mateusdcc.vercel.app"
    },
    {
      "id": "github",
      "label": "[GitHub] Profile",
      "url": "https://github.com/mateusdcc"
    }
  ],
  "context": {
    "title": "MateusDCC Universe",
    "description": "An Obsidian-style visual graph indexer acting as a central directory for all official MateusDCC URLs."
  }
}
```

The same profile is also available at `GET /api/who-is-me`.

## Caching and errors

Successful responses use short-lived public caching with stale-while-revalidate. Unsupported methods return HTTP `405` with an `Allow: GET` header. Server-side loading failures return HTTP `500` with an `error` field.
