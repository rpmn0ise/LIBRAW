---
title: "uBlock Origin : config optimale"
description: "Installation, listes de filtres, mode avancé — tirer le maximum d'uBlock Origin pour bloquer pub, trackers et malwares."
date: 2026-02-01
categorie: outils
niveau: debutant
tags:
  - ublock
  - adblock
  - privacy
  - navigateur
draft: false
---

## Pourquoi uBlock Origin

AdBlock Plus et ses cousins acceptent des pubs « acceptables » contre rémunération. uBlock Origin n'accepte rien, ne vend rien. C'est le bloqueur le plus efficace, le moins gourmand en mémoire.

**Attention** — Sur Chrome/Edge, la migration vers Manifest V3 en 2024 a limité ses capacités. Utilise Firefox pour garder uBlock à 100%.

## Installation

- **Firefox** : [addons.mozilla.org](https://addons.mozilla.org/fr/firefox/addon/ublock-origin/)
- **Chrome/Edge** : encore disponible sur le Chrome Web Store — profites-en

N'installe pas depuis des sources tierces.

## Listes de filtres recommandées

Dans les paramètres → onglet **Listes de filtres** :

**Activer par défaut (déjà cochés) :**
- uBlock filters (tous)
- EasyList
- EasyPrivacy
- Peter Lowe's Ad and tracking server list

**À activer en plus :**
- `Annoyances > uBlock filters – Annoyances` → bannieres cookies, popups
- `Regions > FRA: Liste FR` → spécifique aux sites français
- `Malware domains > Dan Pollock's hosts file`

Clique **Mettre à jour les listes** après.

## Mode avancé

Activer le mode avancé dans **Paramètres > Je suis un utilisateur avancé** débloque le logger de réseau et le blocage par domaine par clic.

Le logger (`Ctrl+Shift+I` dans l'extension) montre en temps réel tout ce que la page charge et ce qui est bloqué. Utile pour diagnostiquer des bugs sur des sites légitimes.

## Déblocage ciblé

Si un site est cassé à cause du bloqueur :

1. Clique l'icône uBlock dans la barre d'outils
2. Le bouton power orange désactive uBlock pour ce site uniquement
3. Recharge la page

En mode avancé, tu peux débloquer domaine par domaine depuis la popup — plus chirurgical.

## Sites de streaming : config spéciale

Sur les sites de streaming pirate, les pubs sont souvent plus agressives (redirections, faux boutons "Play"). En plus d'uBlock :

- Active les listes **Anti-Adblock Killer** via les listes personnalisées
- Ajoute le filtre communautaire : `https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/annoyances.txt`

## uBlock sur mobile

Sur Android → **Firefox mobile** supporte les extensions. Installe uBlock exactement comme sur desktop.

Sur iOS, les extensions Safari fonctionnent différemment. AdGuard est une alternative acceptable sur iOS.

## Ce qu'uBlock ne fait pas

- Il ne chiffre pas ton trafic → utilise un VPN pour ça
- Il ne t'anonymise pas complètement → cookies, fingerprinting passent à travers
- Il ne bloque pas les pubs dans les apps natives → YouTube app par exemple

Pour aller plus loin côté privacy → installe Firefox avec uBlock + utilisateur de Mullvad Browser.
