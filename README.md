# MateusDCC Unix Blog Index

A static Next.js blog rebuilt around a Gruvbox Light Vim and Unix interface.

## Commands

```sh
yarn dev
yarn build
yarn start
```

Posts live in `posts/*.md`. Each file uses front matter for `title`, `date`, and `desc`.

## JSON API

- `GET /api/projects` returns every post as a project object.
- `GET /api/projects/:id` returns one project by its stable post slug.

Each project includes `id`, `title`, `content`, `slug`, and `date`. The `slug` is the direct Markdown-style site path, such as `/anote.md`; `content` contains the raw Markdown post body.

- `GET /who-is-me` returns the shared MateusDCC profile model as JSON.
- `GET /api/who-is-me` is the underlying API route.

The profile model is versioned with `schema: "mateusdcc.who-is-me"` and includes identity, avatar, summary, bio, website, canonical links, and site context so other MateusDCC websites can consume the same shape.
