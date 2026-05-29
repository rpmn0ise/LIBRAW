---
name: libraw-content
description: >
  Crée des fiches ressource et des guides Markdown (.md) pour le site LIBRAW, en respectant
  scrupuleusement les templates frontmatter définis. Utilise cette compétence dès que
  l'utilisateur demande à créer, rédiger, générer ou préparer du contenu pour LIBRAW —
  qu'il parle d'une "fiche", d'une "ressource", d'un "guide", d'un "article LIBRAW",
  ou qu'il mentionne un outil/logiciel à documenter pour le site. Déclencher aussi
  quand l'utilisateur donne un nom d'outil, un lien, ou un sujet et demande à créer
  le fichier correspondant pour LIBRAW.
---

# LIBRAW Content Creator

Génère des fichiers `.md` prêts à l'emploi pour le site LIBRAW, en deux formats :
- **Fiche ressource** : référence externe (outil, lien, service)
- **Guide** : tutoriel complet avec contexte, installation, configuration, usage

---

## Étape 1 — Identifier le type de contenu

| L'utilisateur veut…                          | Type à créer    |
|----------------------------------------------|-----------------|
| Référencer un outil / un site / un service   | Fiche ressource |
| Expliquer comment utiliser quelque chose      | Guide           |
| Les deux (ex: outil + tuto)                  | Les deux        |

Si le type n'est pas clair, demande en une seule question avant de continuer.

---

## Étape 2 — Collecter les informations manquantes

Demande **uniquement** ce qui n'a pas déjà été fourni :

| Champ         | Fiche ressource | Guide |
|---------------|:--------------:|:-----:|
| Titre         | ✅             | ✅    |
| Description   | ✅             | ✅    |
| URL           | ✅             | ❌    |
| Catégorie     | ✅             | ✅    |
| Niveau        | ✅             | ✅    |

**Catégories valides** (choisir exactement une) :
`outils` · `streaming` · `download` · `privacy` · `gaming` · `ia`

**Niveaux valides** : `debutant` · `intermediaire` · `avance`

---

## Étape 3 — Générer les fichiers

### Template fiche ressource (copier/adapter exactement)

```markdown
---
title: "Titre de l'outil"
description: "Une phrase claire sur ce que fait l'outil et pourquoi c'est utile."
url: "https://exemple.com"
categorie: outils
niveau: debutant
verifie: true
date_verif: "2026/05"
featured: false
starred: false
draft: false
---
```

> ⚠️ Pas de contenu Markdown après le frontmatter pour les fiches ressource.
> Le frontmatter est le fichier entier.

---

### Template guide (copier/adapter exactement)

```markdown
---
title: "Titre du guide"
description: "Ce que l'utilisateur saura faire après avoir lu ce guide."
date: 2026-05-25
categorie: outils
niveau: debutant
draft: false
---

## Pourquoi ce guide existe

Explique ici le problème ou le besoin concret que l'outil résout.
Donne le contexte LIBRAW si pertinent (ex: liberté numérique, vie privée, etc.).

## Prérequis

- Système d'exploitation concerné
- Logiciels ou comptes nécessaires
- Niveau technique attendu

## Installation

```bash
# Commande principale d'installation
```

Explique ce que fait la commande. Si plusieurs OS, utilise des sous-titres :

### Windows
```bash
winget install exemple
```

### Linux / macOS
```bash
sudo apt install exemple   # Debian/Ubuntu
brew install exemple       # macOS
```

## Configuration

Explique les paramètres importants, les fichiers de config, les options recommandées.
Inclure des captures ou schémas si pertinent (format `![alt](chemin)`).

## Utilisation

Montre les cas d'usage courants avec des exemples concrets.

```bash
# Exemple d'utilisation typique
exemple --option valeur
```

## Conseils et bonnes pratiques

- Conseil 1 spécifique à l'outil
- Conseil 2 en lien avec la philosophie LIBRAW (vie privée, open source, etc.)
- Pièges courants à éviter

## Ressources utiles

- [Documentation officielle](https://...)
- [Dépôt GitHub](https://github.com/...)
- [Forum ou communauté](https://...)
```

---

## Étape 4 — Nommage des fichiers

| Type            | Convention                        | Exemple                   |
|-----------------|-----------------------------------|---------------------------|
| Fiche ressource | `nom-de-loutil.md`               | `ublock-origin.md`        |
| Guide           | `guide-nom-de-loutil.md`         | `guide-ublock-origin.md`  |

- Tout en minuscules
- Tirets à la place des espaces
- Pas d'accents ni de caractères spéciaux

---

## Étape 5 — Règles de qualité

### Pour les descriptions
- Entre 1 et 2 phrases max
- Commencer par un verbe d'action ou le nom de l'outil
- Mentionner le cas d'usage principal
- Éviter le jargon inutile

### Pour le contenu des guides
- Écrire pour un lecteur français, public LIBRAW (tech-curious, soucieux de sa vie privée)
- Privilégier les outils open source / gratuits / respectueux de la vie privée
- Les commandes bash doivent être testables et précises
- Si l'outil est multiplateforme, couvrir au minimum Windows + Linux

### Pour le frontmatter
- Ne jamais modifier les champs `verifie`, `date_verif`, `featured`, `draft` (utiliser les valeurs par défaut des templates)
- `starred: true` uniquement pour les outils vraiment indispensables — ceux que tu recommanderais en premier à n'importe qui. Utiliser avec parcimonie.
- `date` dans les guides : toujours au format `YYYY-MM-DD`
- `date_verif` dans les ressources : toujours au format `"YYYY/MM"`

---

## Assets disponibles

Les templates bruts sont dans `assets/` :
- `assets/template-ressource.md` — frontmatter vide pour fiche ressource
- `assets/template-guide.md` — structure complète vide pour guide

Utilise-les comme base si tu dois créer les fichiers depuis zéro.

---

## Étape 6 — Commande Git de commit

À la fin de chaque génération, fournir automatiquement la commande bash adaptée au type de contenu créé.

### Si c'est une fiche ressource

```bash
git add . && git commit -m "feat(ressource): ajout nom-de-la-ressource" && git push
```

### Si c'est un guide

```bash
git add . && git commit -m "feat(guide): ajout nom-du-guide" && git push
```

### Si plusieurs fichiers sont générés

Utiliser un commit global cohérent :

```bash
git add . && git commit -m "feat(libraw): ajout ressources et guides" && git push
```

---

## Règles pour les messages de commit

- Toujours utiliser des messages courts et explicites
- Format obligatoire :
  - `feat(ressource): ajout ...`
  - `feat(guide): ajout ...`
  - `fix(...)`
  - `docs(...)`
- Utiliser le nom réel du fichier ou de l'outil quand pertinent
- Toujours fournir la commande complète prête à copier-coller
