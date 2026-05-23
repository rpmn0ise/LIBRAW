---
title: "Émuler la Nintendo Switch en 2026"
description: "Ryujinx fork, keys, firmware, ROMs — tout pour lancer des jeux Switch sur PC sans console."
date: 2026-03-01
categorie: gaming
niveau: avance
tags:
  - switch
  - ryujinx
  - emulation
  - nintendo
  - roms
draft: false
---

## Contexte

Ryujinx a été arrêté en octobre 2024 après un accord avec Nintendo. Le fork communautaire **Ryubing** (sur GitHub) continue le développement activement. C'est l'option à utiliser en 2026.

Yuzu est mort depuis mars 2024 (procès Nintendo). Ne télécharge pas ses mirrors — certains contiennent des malwares.

## Ce qu'il te faut

- **PC** avec au moins 8 Go de RAM, GPU récent (les jeux Switch sont gourmands en émulation)
- **Ryubing** (fork de Ryujinx)
- **Prod.keys** — clés de déchiffrement (à extraire d'une vraie Switch ou à trouver)
- **Firmware** — firmware Nintendo Switch
- **ROMs** au format `.nsp` ou `.xci`

## Installer Ryubing

Télécharge la dernière release depuis [github.com/Ryubing/Ryujinx](https://github.com/Ryubing/Ryujinx).

Archive `.zip` à extraire — pas d'installateur. Lance `Ryujinx.exe`.

Au premier lancement, il te demande le fichier `prod.keys`.

## Keys et firmware

Les keys sont nécessaires pour déchiffrer les ROMs. Tu peux les extraire toi-même depuis une Switch hackée, ou les trouver sur des forums spécialisés.

Même chose pour le firmware — cherche sur les ressources listées dans FMHY (section émulation).

**Emplacement des fichiers :**
- Keys → `%APPDATA%\Ryujinx\system\prod.keys`
- Firmware → installe via Ryubing : `Tools > Install Firmware > Install from XCI/ZIP`

## Configuration Ryubing

`Options > Settings` :

- **Graphics** → Vulkan recommandé (OpenGL si Vulkan crash)
- **System** → Active `Enable PPTC` (cache JIT — accélère après le premier lancement)
- **CPU** → `Unsafe` pour plus de performances si ton PC le supporte
- **Memory** → `4 GiB` minimum alloué

## Où trouver des ROMs

FMHY liste les sources. Les formats :

- `.nsp` — titre individuel installé
- `.xci` — image de la cartouche (plus complet, inclut souvent les updates)

Préfère les ROMs avec les dernières updates intégrées (format `[vXXXXXX]` dans le nom de fichier = numéro de version).

## Installer une ROM

Dans Ryubing, `File > Open Ryujinx Folder` → dossier `games`. Glisse-déposes tes ROMs ici, ou ajoute le dossier dans `Options > Settings > UI > Game Directories`.

Pour les `.nsp` → `File > Install files to NAND` si tu veux les gérer comme sur console.

## Performances

- **Shader compilation** : les premières parties sont saccadées pendant la compilation des shaders. Normal. Ça s'améliore au fur et à mesure.
- **Mods de résolution** : via des mods `.pchtxt` qui forcent des résolutions supérieures à 1080p sur certains jeux
- **60fps patches** : disponibles sur [github.com/theboy181](https://github.com/theboy181/switch-ptchtxt-mods) pour certains jeux

## Jeux les plus compatibles

Zelda BotW/TotK, Mario Odyssey, Pokémon, Metroid Dread — tous jouables à 100% ou quasi. Certains jeux récents ont des problèmes graphiques ou de performances.

Vérifie la compatibilité sur le [spreadsheet communautaire Ryujinx](https://github.com/Ryubing/Ryujinx/issues) avant de perdre du temps.
