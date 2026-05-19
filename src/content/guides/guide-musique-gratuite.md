---
title: "Musique gratuite : yt-dlp, Soulseek, Deemix"
description: "Trois méthodes pour récupérer de la musique en qualité — YouTube, Soulseek peer-to-peer, et Deemix pour la qualité Deezer."
date: 2026-04-01
categorie: musique
niveau: debutant
tags:
  - musique
  - yt-dlp
  - soulseek
  - deemix
  - audio
draft: false
---

## Les trois approches

- **yt-dlp** — simple, fonctionne partout, qualité variable (max 320kbps AAC ou Opus)
- **Soulseek** — P2P spécialisé musique, souvent des FLAC de qualité
- **Deemix** — qualité Deezer (FLAC 1411kbps si tu as un compte Premium/HiFi)

## yt-dlp — la méthode rapide

Prérequis : yt-dlp installé + ffmpeg. Voir le [guide yt-dlp](/guides/guide-yt-dlp/).

**Télécharger une chanson en MP3 320kbps :**
```bash
yt-dlp -x --audio-format mp3 --audio-quality 0 "URL_YOUTUBE"
```

**Télécharger une playlist en MP3 avec métadonnées :**
```bash
yt-dlp -x --audio-format mp3 --audio-quality 0 \
  --embed-thumbnail --add-metadata \
  -o "%(playlist_index)s - %(title)s.%(ext)s" \
  "URL_PLAYLIST"
```

La qualité dépend de la source YouTube — rarement du vrai lossless. Correct pour un usage quotidien.

## Soulseek — le réseau communautaire

Soulseek est un réseau P2P dédié à la musique, populaire depuis les années 2000. Les utilisateurs partagent leurs bibliothèques. Tu trouves des FLAC introuvables ailleurs.

**Client recommandé :** SoulseekQt — [slsknet.org](https://www.slsknet.org)

**Setup :**
1. Télécharge et installe SoulseekQt
2. Crée un compte (pseudo + mdp, pas d'email requis)
3. Configure un dossier partagé — partager en retour est la norme du réseau
4. Recherche un artiste/album

**Astuces :**
- Filtre par extension FLAC pour la qualité maximale
- Vérifie que l'uploader a un bon ratio (partage activement)
- La vitesse dépend de la connexion de l'autre utilisateur

## Deemix — qualité Deezer

Deemix permet de télécharger depuis Deezer en qualité originale. Avec un compte Deezer Premium, tu obtiens du MP3 320kbps. Avec un compte HiFi (Deezer HQ), tu obtiens du FLAC.

**Installation :**
Télécharge depuis [deemix.app](https://deemix.app) ou GitHub.

**Configuration :**
1. Lance Deemix → ouvre l'interface web (`localhost:6595`)
2. Entre ton ARL Deezer (cookie de session — récupérable dans les DevTools de ton navigateur sur deezer.com)
3. Colle l'URL d'un album/artiste/playlist Deezer → télécharge

**Trouver son ARL :**
Sur deezer.com → F12 → Application → Cookies → `arl` → copie la valeur.

L'ARL expire régulièrement — à renouveler en se reconnectant à Deezer.

## Organisation de la bibliothèque

**Beets** est un outil CLI pour tagger automatiquement ta musique avec MusicBrainz :
```bash
pip install beets
beet import ~/Musique/
```

Il normalise les noms de fichiers, ajoute les tags (genre, année, album art) et organise les dossiers proprement.

## Format : MP3 vs FLAC vs Opus

- **MP3 320kbps** — compatible partout, qualité suffisante, taille raisonnable
- **FLAC** — lossless, gros fichiers, pour les audiophiles ou l'archivage
- **Opus** — codec moderne, qualité supérieure au MP3 à taille équivalente — utilisé par YouTube

Pour un usage sur téléphone ou Bluetooth, MP3 320kbps ou Opus 192kbps suffisent largement.
