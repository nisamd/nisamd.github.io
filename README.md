# Nima Samadi — personal website

A small Hugo site for research, programming, and personal writing, published at https://nisamd.github.io. Every page is a Markdown file in `content/`.

## Local setup

Install Hugo (extended) 0.169.0 or newer; GitHub Actions builds with the 0.169.0 pinned in `.github/workflows/pages.yml`:

```sh
brew install hugo
hugo server -D      # preview at http://localhost:1313, including drafts
hugo build --minify # production build into public/
```

No Node, Python, or theme download is needed.

## Writing

```sh
hugo new content blog/my-post/index.md
```

This copies `archetypes/blog.md`. Fill in the title, description, and tags, write in Markdown, and put images next to `index.md`. New posts start as `draft: true`; drafts only show with `hugo server -D` and are never published. Remove the line when the post is ready.

- **Math:** `$...$` inline and `$$...$$` display, rendered by KaTeX at build time. Number equations by hand with `\tag{1}` and refer to them as "Equation (1)".
- **Code:** fenced code blocks with a language name get syntax highlighting, with GitHub colors in light mode and Nord in dark mode. To use other styles, run `sh scripts/syntax-css.sh <light-style> <dark-style>` ([style gallery](https://xyproto.github.io/splash/docs/)).
- **Table of contents:** appears automatically when a post has two or more headings (`##` and `###`). Set `toc: false` to hide it.
- **GitHub issues and PRs:** `{{< github-issue "owner/repo#123" >}}` on its own line shows a card with the title, state, labels, and an excerpt. It's fetched when the site builds, so it updates on each deploy. A typo in the reference prints a warning and falls back to a plain link.
- **Footnotes:** `[^1]` with `[^1]: text` anywhere in the post.
- **References and theorems:** written by hand, for example a numbered list under `## References` and `**Theorem 1.**` in bold.

The sample post `content/blog/writing-math-and-code/` is a draft that shows all of the above. Delete it when you no longer need it.

Each project is its own page too:

```sh
hugo new content projects/my-project.md
```

This copies `archetypes/projects.md`. Projects use `topics` instead of `tags` (so their filter chips only list projects) and an optional `repo` link shown under the title. They are listed newest first by `date`.

Other pages: `content/_index.md` (home intro; the greeting and headline are in its front matter), `content/about.md`, `content/projects/_index.md` (projects page intro), `content/blog/_index.md` (blog page intro).

## Layout

```
hugo.toml            site settings, menu, Giscus IDs
content/             all pages and posts (Markdown)
layouts/             HTML templates; _partials/ for shared pieces, _markup/ for the math hook
assets/css/main.css  all styles; colors are CSS variables at the top
assets/js/main.js    text size, theme toggle, Giscus loader
static/              files copied as-is: résumé PDF, favicon, KaTeX stylesheet and fonts
```

## Comments (Giscus)

Comments are off until GitHub is configured. On `nisamd/nisamd.github.io`, enable Discussions, create a category for comments (for example "Comments", type Announcements), install the [Giscus app](https://github.com/apps/giscus), then use [giscus.app](https://giscus.app/) to get the repository ID and category ID. Put them in `hugo.toml`:

```toml
[params.giscus]
  repo = "nisamd/nisamd.github.io"
  repoId = "R_..."
  category = "Comments"
  categoryId = "DIC_..."
```

Comments then appear under every blog post, using the post's path to find its discussion, and follow the site's light/dark theme. Add `comments: false` to a post's front matter to turn them off for that post. Renaming a post's folder later detaches its existing discussion.

## Visit stats (GoatCounter)

Page views are counted by [GoatCounter](https://nisamd.goatcounter.com) (no cookies). The script is a copy of the official `count.js` in `assets/js/goatcounter.js` and only runs on the published site, not with `hugo server`. To stop counting your own visits, open https://nisamd.github.io/#toggle-goatcounter once in each browser you use. Remove `goatcounter` from `hugo.toml` to turn it off.

## Public résumé

`public-resume/` contains only the sanitized public LaTeX; the built PDF is `static/nima-samadi-resume.pdf`, linked from About. The original `resume/` folder is private and ignored by Git. Never force-add it.

To rebuild the PDF (needs TeX Live/MacTeX):

```sh
sh scripts/build-resume.sh
```

## Publishing (GitHub Pages)

1. Push this repository to `nisamd/nisamd.github.io`.
2. In Settings → Pages, set the source to **GitHub Actions**.

Each push to `main` builds and deploys the site. Pull requests are built but not deployed.

## Portability

The output in `public/` is plain static files. To move hosts, change `baseURL` in `hugo.toml` and upload `public/` anywhere.
