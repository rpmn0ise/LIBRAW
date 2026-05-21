# LIBRAW

> Bibliothèque FR ultra-sélective d'outils et guides pour utilisateurs tech.  
> Streaming, download, privacy, émulation — sélection vérifiée manuellement.

**→ [libraw.pages.dev](https://libraw.pages.dev)**

---

## C'est quoi

LIBRAW est un annuaire statique, opinioné et sans bullshit. Pas d'affiliation, pas de sponsor, pas de 200 entrées gonflées au SEO. Chaque ressource est là parce qu'elle a été testée et qu'elle est réellement utile.

Le site regroupe deux types de contenu :

- **Ressources** — liens directs vers des outils, sites et logiciels classés par catégorie, avec niveau de difficulté, badges, et date de vérification
- **Guides** — tutoriels pratiques liés aux ressources (config, installation, tips)

### Catégories

| Catégorie | Contenu |
|-----------|---------|
| 📺 Streaming | Films, séries, anime en streaming direct |
| ⬇️ Download | Torrents, DDL, archives, ebooks |
| 🔧 Outils | Logiciels, extensions, utilitaires |
| 🔒 Privacy | VPN, navigateurs, anonymat |
| 🎮 Émulation | Émulateurs, ROMs, consoles |

---

## Stack technique

- **[Eleventy 3](https://www.11ty.dev/)** — générateur de site statique
- **Nunjucks** — templates
- **Markdown** — contenu (ressources + guides)
- **Cloudflare Pages** — hébergement + déploiement continu
- Zéro framework JS, zéro dépendance frontend, CSS custom

---

## Structure du repo

```
LIBRAW/
├── src/
│   ├── _data/
│   │   ├── site.json          # Config globale : titre, URL, catégories, nav
│   │   └── env.js             # Variables d'environnement (date de build...)
│   ├── _includes/
│   │   ├── components/        # Macros Nunjucks réutilisables (cards, header, footer...)
│   │   └── layouts/           # Layouts de page (base, guide, catégorie, home...)
│   ├── assets/
│   │   ├── css/main.css       # Styles (CSS custom, pas de framework)
│   │   └── js/main.js         # JS vanilla (recherche, TOC, filtres)
│   ├── content/
│   │   ├── ressources/        # Une fiche .md par ressource
│   │   └── guides/            # Un fichier .md par guide
│   └── pages/                 # Pages Nunjucks (index, catégories, guides...)
├── eleventy.config.js         # Config Eleventy (collections, filtres, shortcodes)
├── netlify.toml               # Config déploiement
└── package.json
```

---

## Ajouter une ressource

Crée un fichier `src/content/ressources/nom-de-la-ressource.md` :

```yaml
---
title: "Nom de l'outil"
description: "Ce que ça fait, en une phrase directe."
url: "https://..."
categorie: outils          # streaming | download | outils | privacy | emulation
tags:
  - tag1
  - tag2
niveau: debutant           # debutant | avance | expert
verifie: true
date_verif: "MM/YYYY"
featured: false            # true = apparaît dans la section "essentiels" en home
badges:
  - 🧠                     # optionnel — badges visuels libres
guide: /guides/mon-guide/  # optionnel — lien vers un guide associé
draft: false
---
```

Pas de contenu Markdown nécessaire pour une ressource — tout est dans le frontmatter.

---

## Ajouter un guide

Crée un fichier `src/content/guides/mon-guide.md` :

```yaml
---
title: "Titre du guide"
description: "Une phrase qui résume ce que le guide explique."
date: YYYY-MM-DD
categorie: outils          # même valeurs que les ressources
niveau: debutant           # debutant | avance | expert
tags:
  - tag1
  - tag2
draft: false
---
```

Puis écris le contenu en Markdown. Les H2/H3 sont automatiquement indexés dans la sidebar (TOC généré en JS).

---

## Développement local

```bash
# Cloner le repo
git clone https://github.com/rpmn0ise/LIBRAW.git
cd LIBRAW

# Installer les dépendances
npm install

# Lancer en dev (hot reload)
npm run dev

# Build de production
npm run build
```

Requiert Node.js >= 20.

---

## Déploiement

Le site est déployé sur **Cloudflare Pages** via Git. Chaque push sur `main` déclenche un build automatique.

```toml
# netlify.toml (aussi compatible Cloudflare Pages)
[build]
  command = "npm run build"
  publish = "_site"
```

---

## Philosophie

Pas d'auto-complétion de liste pour faire du volume. Chaque entrée doit avoir une raison d'être là. Si un site ferme ou devient pourri, il sort. La date de vérification est visible sur chaque fiche — si c'est vieux, c'est vieux.

---

Made by [RPMN0ISE](https://rpmn0ise.github.io)
