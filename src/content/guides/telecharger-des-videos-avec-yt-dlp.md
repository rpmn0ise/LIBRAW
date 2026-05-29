---
title: "Télécharger des vidéos avec yt-dlp"
description: "Maîtriser yt-dlp pour télécharger vidéos et musiques depuis YouTube et des centaines d'autres plateformes, en choisissant format et qualité."
date: 2026-05-29
categorie: download
niveau: intermediaire
draft: false
---

## Pourquoi ce guide existe

yt-dlp est l'outil le plus puissant pour télécharger du contenu vidéo et audio en ligne. Il remplace youtube-dl (abandonné) et supporte plus de 1000 sites. Une fois maîtrisé, il devient indispensable.

## Prérequis

- Windows, macOS ou Linux
- Terminal / invite de commandes
- `ffmpeg` installé (pour la fusion audio/vidéo)

## Installation

### Windows
```bash
winget install yt-dlp
```
Ou télécharge `yt-dlp.exe` depuis [GitHub Releases](https://github.com/yt-dlp/yt-dlp/releases) et place-le dans un dossier du PATH.

### Linux / macOS
```bash
sudo curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /usr/local/bin/yt-dlp
sudo chmod a+rx /usr/local/bin/yt-dlp
```

### Installer ffmpeg (nécessaire pour la meilleure qualité)

**Windows :**
```bash
winget install ffmpeg
```

**Linux :**
```bash
sudo apt install ffmpeg
```

## Utilisation

### Téléchargement basique
```bash
yt-dlp https://www.youtube.com/watch?v=XXXXXXX
```

### Choisir la meilleure qualité vidéo + audio
```bash
yt-dlp -f "bestvideo+bestaudio" https://www.youtube.com/watch?v=XXXXXXX
```

### Télécharger uniquement l'audio en MP3
```bash
yt-dlp -x --audio-format mp3 --audio-quality 0 https://www.youtube.com/watch?v=XXXXXXX
```

### Télécharger une playlist entière
```bash
yt-dlp -f "bestvideo+bestaudio" https://www.youtube.com/playlist?list=XXXXXXX
```

### Définir le dossier de sortie et le nom de fichier
```bash
yt-dlp -o "~/Musique/%(title)s.%(ext)s" -x --audio-format mp3 URL
```

### Lister les formats disponibles
```bash
yt-dlp -F https://www.youtube.com/watch?v=XXXXXXX
```

## Configuration persistante

Crée un fichier de config pour ne pas retaper les options à chaque fois :

**Chemin :**
- Windows : `%APPDATA%\yt-dlp\config`
- Linux/macOS : `~/.config/yt-dlp/config`

**Contenu recommandé :**
```
-f bestvideo+bestaudio
--merge-output-format mkv
-o ~/Vidéos/%(uploader)s/%(title)s.%(ext)s
--embed-thumbnail
--add-metadata
```

## Conseils et bonnes pratiques

- Mets à jour yt-dlp régulièrement : `yt-dlp -U` — les sites changent souvent leurs APIs
- Pour Twitch, SoundCloud, Dailymotion, la syntaxe est identique, yt-dlp gère tout
- Évite de télécharger en masse depuis un IP résidentiel sans délai : `--sleep-interval 3`
- Préfère `mkv` comme conteneur de sortie, il accepte tous les codecs sans recompression

## Ressources utiles

- [Dépôt GitHub yt-dlp](https://github.com/yt-dlp/yt-dlp)
- [Stacher](https://stacher.io/) — interface graphique pour yt-dlp si tu préfères éviter le terminal
