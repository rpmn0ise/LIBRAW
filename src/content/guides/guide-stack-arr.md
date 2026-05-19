---
title: "Stack *arr : Sonarr + Radarr + Prowlarr + Jellyfin"
description: "Setup complet d'un home media server automatisé — téléchargement automatique, indexeurs, serveur de streaming local."
date: 2026-02-15
categorie: outils
niveau: avance
tags:
  - sonarr
  - radarr
  - prowlarr
  - jellyfin
  - self-hosting
draft: false
---

## Ce que ça fait

L'idée : tu dis à Sonarr « je veux cette série », il cherche automatiquement les nouveaux épisodes, les envoie à qBittorrent, les télécharge, les range dans le bon dossier. Jellyfin te sert ensuite tout ça dans une interface type Netflix.

**La stack complète :**
- **Prowlarr** — gestionnaire d'indexeurs (torrent + Usenet)
- **Radarr** — automation pour les films
- **Sonarr** — automation pour les séries
- **qBittorrent** — client torrent
- **Jellyfin** — serveur media

## Prérequis

Un PC ou NAS qui tourne H24 (ou presque). Docker est le setup le plus propre.

- Docker + Docker Compose installés
- Au moins 2 Go de RAM
- Stockage suffisant pour ta médiathèque

## Docker Compose

Crée un fichier `docker-compose.yml` :

```yaml
version: "3.8"
services:
  jellyfin:
    image: jellyfin/jellyfin
    container_name: jellyfin
    volumes:
      - ./config/jellyfin:/config
      - /media:/media
    ports:
      - "8096:8096"
    restart: unless-stopped

  sonarr:
    image: lscr.io/linuxserver/sonarr
    container_name: sonarr
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Europe/Paris
    volumes:
      - ./config/sonarr:/config
      - /media:/media
      - /downloads:/downloads
    ports:
      - "8989:8989"
    restart: unless-stopped

  radarr:
    image: lscr.io/linuxserver/radarr
    container_name: radarr
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Europe/Paris
    volumes:
      - ./config/radarr:/config
      - /media:/media
      - /downloads:/downloads
    ports:
      - "7878:7878"
    restart: unless-stopped

  prowlarr:
    image: lscr.io/linuxserver/prowlarr
    container_name: prowlarr
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Europe/Paris
    volumes:
      - ./config/prowlarr:/config
    ports:
      - "9696:9696"
    restart: unless-stopped

  qbittorrent:
    image: lscr.io/linuxserver/qbittorrent
    container_name: qbittorrent
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Europe/Paris
      - WEBUI_PORT=8080
    volumes:
      - ./config/qbt:/config
      - /downloads:/downloads
    ports:
      - "8080:8080"
      - "6881:6881"
      - "6881:6881/udp"
    restart: unless-stopped
```

Lance :
```bash
docker compose up -d
```

## Configuration

**Ordre de config : Prowlarr → qBittorrent → Sonarr/Radarr → Jellyfin**

### Prowlarr (localhost:9696)

Ajoute tes indexeurs dans `Indexers > Add Indexer`. Les indexeurs publics classiques : 1337x, YTS (films), Nyaa (anime).

Dans `Settings > Apps`, connecte Sonarr et Radarr avec leurs API keys.

### qBittorrent (localhost:8080)

Login par défaut : `admin` / `adminadmin`. Change le mot de passe immédiatement.

Active le WebUI dans les paramètres si ce n'est pas déjà fait.

### Sonarr (localhost:8989)

- `Settings > Download Clients` → ajoute qBittorrent (host: `qbittorrent`, port: 8080)
- `Settings > Indexers` → les indexeurs Prowlarr se synchronisent automatiquement si tu les as connectés
- `Settings > Media Management` → configure le chemin racine pour les séries (ex: `/media/series`)

Radarr : même logique, pour les films.

### Jellyfin (localhost:8096)

Setup initial : crée un compte admin, ajoute tes bibliothèques (`/media/films`, `/media/series`). Jellyfin indexe automatiquement et récupère les métadonnées (jaquettes, synopsis, etc.).

## Utilisation

Dans Sonarr → `Series > Add New`, cherche une série, sélectionne le profil qualité, ajoute. Sonarr cherche et télécharge automatiquement. Les nouveaux épisodes sont captés dès leur sortie si un indexeur les a.

Dans Radarr → même principe pour les films.

## Accès distant

Pour accéder à Jellyfin depuis l'extérieur, deux options :

- **Tailscale** (recommandé) — VPN mesh, zero-config, accès sécurisé sans ouvrir de port
- **Reverse proxy** (Nginx/Caddy) — plus complexe, nécessite un domaine

Évite d'exposer directement les ports Sonarr/Radarr/Prowlarr à internet.
