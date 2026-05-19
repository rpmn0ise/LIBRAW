---
title: "yt-dlp : télécharger n'importe quelle vidéo"
description: "Le guide complet pour utiliser yt-dlp en ligne de commande — installation, commandes essentielles, extraction audio, formats."
date: 2026-01-20
categorie: outils
niveau: debutant
tags:
  - yt-dlp
  - cli
  - youtube
  - audio
  - vidéo
draft: false
---

## Pourquoi yt-dlp

youtube-dl était la référence. yt-dlp est son successeur actif : plus rapide, mieux maintenu, compatible avec plus de sites. YouTube, SoundCloud, Twitch, Dailymotion, Arte, France TV — plus de 1000 sites supportés.

## Installation

**Windows :**

Télécharge `yt-dlp.exe` depuis les [releases GitHub](https://github.com/yt-dlp/yt-dlp/releases). Place-le dans un dossier dans ton PATH (ex: `C:\Windows\System32`) ou utilise-le depuis son dossier.

Avec winget :
```bash
winget install yt-dlp
```

**macOS :**
```bash
brew install yt-dlp
```

**Linux :**
```bash
sudo apt install yt-dlp
# ou
pip install yt-dlp
```

Vérifie l'installation :
```bash
yt-dlp --version
```

Tu auras aussi besoin de **ffmpeg** pour la conversion audio/vidéo. Installe-le séparément (Windows : winget, Mac : brew, Linux : apt).

## Commandes essentielles

**Télécharger une vidéo en meilleure qualité :**
```bash
yt-dlp https://www.youtube.com/watch?v=XXXXX
```

**Choisir la résolution :**
```bash
yt-dlp -f "bestvideo[height<=1080]+bestaudio" URL
```

**Extraire l'audio en MP3 :**
```bash
yt-dlp -x --audio-format mp3 --audio-quality 0 URL
```

**Télécharger une playlist entière :**
```bash
yt-dlp -f best https://www.youtube.com/playlist?list=XXXXX
```

**Télécharger avec les sous-titres :**
```bash
yt-dlp --write-subs --sub-lang fr URL
```

**Reprendre un téléchargement interrompu :**
```bash
yt-dlp -c URL
```

## Formats disponibles

Voir les formats dispo pour une vidéo :
```bash
yt-dlp -F URL
```

Résultat ressemble à :
```
137  mp4   1920x1080  1080p  ...
248  webm  1920x1080  1080p  ...
140  m4a   audio only 128k   ...
```

Télécharger un format spécifique par ID :
```bash
yt-dlp -f 137+140 URL
```

## Dossier de sortie et nommage

```bash
yt-dlp -o "~/Vidéos/%(title)s.%(ext)s" URL
```

Variables utiles : `%(title)s`, `%(uploader)s`, `%(upload_date)s`, `%(id)s`, `%(ext)s`

Pour une playlist bien organisée :
```bash
yt-dlp -o "~/Playlists/%(playlist_title)s/%(playlist_index)s - %(title)s.%(ext)s" URL_PLAYLIST
```

## Mise à jour

yt-dlp se met à jour souvent (YouTube change régulièrement ses APIs) :
```bash
yt-dlp -U
```

À faire tous les mois minimum si tu utilises ça régulièrement.

## Limites et contournements

Certaines vidéos nécessitent d'être connecté. Passe tes cookies au format Netscape :

```bash
yt-dlp --cookies cookies.txt URL
```

Extension Firefox/Chrome "Get cookies.txt LOCALLY" pour exporter tes cookies.

Pour les lives Twitch passés, les VODs ne sont pas toujours disponibles longtemps — télécharge rapidement après la stream.
