# Family Bible App — Codebase & Marketing Brief

## Overall Goal

**Family Bible App** is not another Bible reader. It is a **collaborative, audio-first heirloom** — a living archive of Scripture recorded in your family's own voices, verse by verse, chapter by chapter, generation by generation.

The product turns daily devotion into something permanent: kids hear Mom and Dad read the Bible; grandchildren hear a grandparent long after they're gone. The emotional core is **legacy through voice** — sacred, personal, and private.

- **Tagline:** *Record Scripture together, one verse at a time.*
- **Live web app:** [familybibleapp.web.app](https://familybibleapp.web.app)
- **Marketing domain:** [familybibleapp.com](https://familybibleapp.com) (this static site replaces WordPress)
- **Stack:** React 18 + Firebase (Auth, Firestore, Storage, Cloud Functions) on web; Expo/React Native mobile in progress

---

## Who It's For

| Audience | Why they care |
|----------|---------------|
| Parents | Scripture in familiar voices at bedtime and in the car |
| Multi-household families | Grandparents, siblings, cousins building one shared audio Bible |
| Faithful households | A devotional habit that compounds into a keepsake |
| Future generations | Voices preserved — an audio legacy, not just text |

---

## Core Experience (The Three Pillars)

### 1. Record
Pick any book, chapter, and verse. Record yourself on a tactile **retro cassette interface** with live waveform feedback. Audio is cleaned, indexed per verse, and shared with your family. Smart "where to start" logic picks up where you left off. Batch recording keeps the mic warm between verses.

### 2. Listen
Open a chapter and hear it **stitched continuously** across every family member who recorded each verse — like a podcast of your family reading the Bible. Filter by reader, resume where you left off, toggle **Trim Silence** for podcast-tight playback.

### 3. Together
Families invite members, track collective coverage of the Bible, share study notes, follow guided plans, and celebrate streaks and badges. Everyone contributes; the family's audio Bible grows over time.

---

## Full Feature Set (from codebase)

### Recording
- Verse-by-verse recording with cassette-style UI (`RetroCassette.js`, `AudioRecorder.js`)
- Recording scope: all verses or only gaps the family hasn't filled
- Per-verse review before upload; near-instant verse-to-verse flow
- Batch/session recording with draft management (`useBatchRecording.js`, `useDraftManagement.js`)

### Listening
- Continuous chapter playback across multiple readers (`Listen.js`, `MultiAudioPlayer.js`)
- Reader selection, verse highlighting, scroll-synced text (`BibleTextDisplay.js`)
- Trim silence (`trimSilence.js`), resume last position
- Optimized data loading (`useListenDataOptimized.js`)

### Bible Content
- **World English Bible (WEB)** and **Berean Standard Bible (BSB)** — both public domain
- Per-user translation preference (`TranslationContext.js`)
- Full 66-book navigation with accurate verse counts

### Family & Collaboration
- Create/join families, invitations, multi-family membership (`FamilyPage.js`, `FamilyInvitations.js`)
- Admin roles (`roleManager.js`), family progress/coverage (`familyCompletion.js`)
- Private family-scoped audio — secure Firebase Storage

### Study & Engagement
- Verse-level study notes with comments (`Study.js`, `StudyNoteEditor.js`)
- Shareable note links (`ShareableNoteView.js`)
- **Bible Plans** — guided recording and listening plans with progress (`usePlanManagement.js`)
- Dashboard, badges, streaks, completed chapters (`Dashboard.js`, `CompletedChapters.js`)

### Account & Growth
- Email/password auth, onboarding, profiles with photos
- Rich Open Graph / social previews for invites
- Subscription page scaffolded (Stripe planned)
- Super-admin tooling for operations

---

## Brand & Design System

| Token | Hex | Usage |
|-------|-----|-------|
| Cerulean | `#247BA0` | Primary brand, CTAs, links |
| Aqua Deep | `#37B49A` | Gradient end, accents |
| Aquamarine | `#A5FFD6` | Highlights, waveforms |
| Space Cadet | `#063354` | Cassette body, dark backgrounds |
| Mint Green | `#CDFFF9` | Soft backgrounds |
| Coral | `#FD494F` | Recording indicator, alerts |
| Ink | `#232323` | Body text |

**Fonts:** Inter (UI), Caveat (handwritten accents), Georgia (Scripture quotes)

**Signature UI:** The retro cassette recorder — navy body, mint sound waves, white label strip. This is the visual identity anchor for marketing.

---

## Hero Section Strategy (Landing Page)

The WordPress site used generic "app development agency" copy. The real product deserves an **emotional, cinematic hero**:

1. **Headline hook:** Lead with legacy and voice — *"Scripture, in the voices you love."*
2. **Visual drama:** Deep space-cadet canvas with cerulean→aquamarine light blooms; animated sound-wave bars; a CSS cassette mockup showing the real product UI.
3. **Proof of concept:** Three floating "voice chips" (Mom, Dad, Grandma) to show multi-voice chapter stitching.
4. **Single clear CTA:** "Start Your Family Bible" → `familybibleapp.web.app`
5. **Trust line:** Free · Private · Works on any device

Secondary scroll sections: Sacred Echo story → Features → How It Works → Scripture → Final CTA.

---

## What Replaces WordPress

The `site/` folder is a **complete static site** for SiteGround:

```
site/
├── index.html          ← homepage (replaces WP front page)
├── css/styles.css
├── js/main.js
├── images/
│   ├── app-icon.png
│   └── og-image.png
├── PRODUCT_BRIEF.md    ← this file
└── DEPLOY.md           ← SiteGround upload instructions
```

No PHP, no database, no WordPress. Upload to `public_html`, point domain, done.
