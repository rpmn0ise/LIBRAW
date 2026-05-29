---
title: "Gérer ses APKs avec Obtainium"
description: "Utiliser Obtainium pour installer et mettre à jour automatiquement des applications Android depuis GitHub et d'autres sources, sans passer par un store."
date: 2026-05-29
categorie: outils
niveau: intermediaire
draft: false
---

## Pourquoi ce guide existe

Beaucoup d'applications open source ou modifiées (ReVanced, NewPipe, etc.) se distribuent directement sur GitHub sans passer par le Play Store. Obtainium automatise leur installation et mise à jour — plus besoin de chercher manuellement les nouvelles releases.

## Prérequis

- Android 8+
- Autoriser les sources inconnues (voir guide ReVanced)

## Étape 1 — Installer Obtainium

Télécharge la dernière release depuis GitHub :

**[https://github.com/ImranR98/Obtainium/releases](https://github.com/ImranR98/Obtainium/releases)**

Installe le fichier `.apk`.

## Étape 2 — Ajouter une application

1. Lance Obtainium
2. Clique sur le **+** en bas à droite
3. Colle l'URL du dépôt GitHub de l'app (ex: `https://github.com/driftywinds/YT-builds`)
4. Obtainium détecte automatiquement les releases disponibles
5. Configure si nécessaire le filtre de fichier (ex: `arm64-v8a` pour les téléphones modernes)
6. Clique sur **Ajouter**

## Étape 3 — Installer ou mettre à jour

- **Premier install** : clique sur l'app dans la liste → **Installer**
- **Mises à jour** : Obtainium vérifie périodiquement les nouvelles releases et t'envoie une notification

Pour forcer une vérification manuelle : **Menu → Vérifier les mises à jour**

## Applications recommandées à suivre via Obtainium

| Application | URL GitHub |
|---|---|
| YouTube ReVanced | `https://github.com/driftywinds/YT-builds` |
| NewPipe | `https://github.com/TeamNewPipe/NewPipe` |
| Obtainium lui-même | `https://github.com/ImranR98/Obtainium` |

## Configuration avancée

### Filtrer par architecture CPU
Sur la plupart des téléphones récents : filtre sur `arm64-v8a`. Sur anciens appareils 32 bits : `armeabi-v7a`.

### Intervalle de vérification
**Paramètres → Intervalle de vérification en arrière-plan** → 6h est un bon compromis.

### Export / Import de la liste
**Paramètres → Exporter les apps** → sauvegarde un fichier JSON pour restaurer ta liste sur un autre téléphone.

## Conseils et bonnes pratiques

- Ajoute Obtainium à sa propre liste de suivi pour se mettre à jour lui-même
- Préfère toujours les dépôts GitHub officiels des projets — méfie-toi des forks
- Obtainium supporte aussi GitLab, F-Droid, APKPure et d'autres sources

## Ressources utiles

- [Dépôt GitHub Obtainium](https://github.com/ImranR98/Obtainium)
- [Wiki Obtainium](https://github.com/ImranR98/Obtainium/wiki)
