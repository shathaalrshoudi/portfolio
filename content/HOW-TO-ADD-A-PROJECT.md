# Adding or changing a project

Everything in **Selected work**, **All work**, the hero image wall and the project pages comes from one file: `content/projects.js`. You never edit the page layout to add work.

## 1. Add the media

Create a folder named after the project and put its files there:

```
assets/projects/my-new-project/
  cover.webp
  screen-1.webp
  demo.mp4
```

WebP or JPG at up to about 1800 px on the long side keeps the site fast. Then record the image sizes so layouts don't jump while loading:

```bash
python tools/media-manifest.py
```

## 2. Add the entry

Copy any existing entry in `content/projects.js` and change it. A minimal project:

```js
{
  slug: 'my-new-project',                 // used in the link: #/work/my-new-project
  featured: 0,                            // 0 = library only
  year: '2027',
  title: { en: 'Project name', ar: 'اسم المشروع' },
  client: { en: 'Client', ar: 'الجهة' },
  categories: ['software'],               // software, it, security, identity, ui
  role: { en: 'What I did', ar: 'دوري' },
  summary: { en: 'One or two sentences.', ar: 'جملة أو جملتان.' },
  tools: ['Python', 'Flask'],
  outcomes: [],                           // only verified results
  cover: { src: 'assets/projects/my-new-project/cover.webp', alt: 'What the cover shows' },
  blocks: [
    { type: 'text', title: { en: 'What it does', ar: 'ما الذي يقدّمه' }, body: { en: '…', ar: '…' } },
    { type: 'gallery', layout: 'series', items: [
      { src: 'assets/projects/my-new-project/screen-1.webp', alt: 'Screen description' },
    ] },
    { type: 'video', src: 'assets/projects/my-new-project/demo.mp4', poster: 'assets/projects/my-new-project/cover.webp' },
  ],
},
```

No images yet? Leave out `cover` and the project gets a typographic cover.

## Changing the hero images

The two-column image wall at the top of the site is the `hero` list at the start of `content/projects.js`. Each entry is an image and the project it opens:

```js
{ src: 'assets/projects/autopent/05-dashboard.webp', slug: 'autopent' },
```

Keep it to your 6–10 strongest visuals. Odd entries go in the left column, even entries in the right.

## 3. Feature it (or stop featuring it)

Set `featured` to a number: `1` appears first in **Selected work**, `2` second, and so on. Set it back to `0` to keep the project only in **All work**.

A featured project also needs a `showcase`:

- Technical work, with an interactive demo: `showcase: { kind: 'interface', demo: 'scan-steps' }`
- Design work, with a hero image and a fan of pieces:
  ```js
  showcase: {
    kind: 'identity',
    hero: { src: '…/poster.webp', alt: '…' },        // or  logo: '…/logo.svg'
    rack: [ { src: '…/badge-1.webp', alt: '…' }, … ],
  },
  tone: { bg: '#10263F', fg: '#EEF4F5' },            // the colour the section takes on
  palette: ['#hex', '#hex', …],                      // colours sampled from the work
  ```

## Block types for project pages

| type | use it for |
|---|---|
| `text` | a heading and a paragraph |
| `list` | a heading and short points |
| `gallery` | images or videos; `layout`: `row`, `series` (side by side), `grid` (2 columns), `rack` (fanned pieces like badges), `stack` (document pages), `deck` (slides). Add `grid: true` to offer a layout-grid overlay |
| `zoom` | one large image the visitor can inspect up close (maps, UI sheets) |
| `video` | a video with controls |
| `logo` | an SVG mark that draws itself |
| `palette` | colour swatches |
| `demo` | an interactive component: `permission-model`, `request-flow`, `scan-steps`, `scan-profiles`, `architecture`, `hosting-flow` |
| `note` | small print, such as where screenshots came from |

## Replacing the AutoPent video

Put the new file in `assets/projects/autopent/video/` and change the `src` (and `poster`) of the video block in the `autopent` entry. The current files stay until you do.

## After any change

If the live site still shows the old version, raise the `?v=` number on the four `css/` and `js/` links in `index.html` so browsers fetch the new files.
