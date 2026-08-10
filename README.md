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

Each project includes `id`, `title`, `content`, `slug`, and `date`. The `slug` is the direct site path, such as `/anote`; `content` contains the raw Markdown post body.
