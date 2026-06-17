# Deploying to SiteGround

This folder is a **complete static website** that replaces WordPress on [familybibleapp.com](https://familybibleapp.com).

## What's in this folder

| File | Purpose |
|------|---------|
| `index.html` | Homepage — upload as your site root |
| `css/styles.css` | All styles |
| `js/main.js` | Nav, mobile menu, scroll animations |
| `images/` | App icon and Open Graph image |

The live app stays at **[familybibleapp.web.app](https://familybibleapp.web.app)**. All "Get Started" buttons link there.

## Preview locally

**Do not** serve from `public/` — that's the React app shell (blank white page without `npm start`).

From the project root:

```bash
npm run serve:site
```

Or manually:

```bash
python3 -m http.server 8085 --directory site
```

Then open [http://localhost:8085](http://localhost:8085).

## SiteGround upload steps

### Option A — File Manager (simplest)

1. Log in to **SiteGround** → **Site Tools** → **Site** → **File Manager**
2. Open `public_html` (or the folder your domain points to)
3. **Back up** existing WordPress files (download or move to a `wordpress-backup/` folder)
4. Delete WordPress files from `public_html` *or* point the domain to a clean folder
5. Upload **everything inside** the `site/` folder into `public_html`:
   - `index.html` at the root of `public_html`
   - `css/`, `js/`, `images/` as subfolders
6. Visit `https://familybibleapp.com` — you should see the new landing page

### Option B — SFTP

1. Use FileZilla or Cyberduck with your SiteGround SFTP credentials
2. Connect to your hosting account
3. Navigate to `public_html`
4. Upload the contents of `site/` (not the `site` folder itself unless you want `familybibleapp.com/site/`)

### After upload — recommended cleanup

1. **Remove WordPress** from SiteGround if you no longer need it (saves space and avoids confusion)
2. In SiteGround **Domain** settings, confirm `familybibleapp.com` points to `public_html`
3. Enable **HTTPS** (Let's Encrypt) if not already active
4. Optional: add a redirect in `.htaccess` if old WP URLs were bookmarked:

```apache
# Redirect old WordPress paths to homepage (adjust as needed)
RedirectMatch 301 ^/wp-content/.*$ https://familybibleapp.com/
RedirectMatch 301 ^/wp-admin/.*$ https://familybibleapp.com/
```

## Updating the site later

1. Edit files locally in the `site/` folder
2. Re-upload changed files via File Manager or SFTP
3. Hard-refresh the browser (Cmd+Shift+R) to bust cache

## Open Graph / social previews

Meta tags in `index.html` reference:

- `https://familybibleapp.com/images/og-image.png`

After deploy, test with [opengraph.xyz](https://www.opengraph.xyz/) or iMessage link preview.

## Contact email

Update the footer contact link in `index.html` when you have a real support address (currently `mailto:hello@familybibleapp.com`).

## Do not upload to Firebase

The React app uses `public/index.html` as its entry point. This `site/` folder is **only** for the marketing domain on SiteGround — keep them separate.
