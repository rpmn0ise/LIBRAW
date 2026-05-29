---
title: "Bloquer les publicités sur les sites de streaming"
description: "Configurer uBlock Origin pour profiter des sites de streaming sans publicités intrusives, popups et redirections malveillantes."
date: 2026-05-29
categorie: streaming
niveau: debutant
draft: false
---

## Pourquoi ce guide existe

Les sites de streaming gratuits survivent grâce à la publicité, souvent agressive : popups, redirections, faux boutons de lecture, voire scripts malveillants. Un bon bloqueur de pub correctement configuré rend l'expérience fluide et sécurisée.

## Prérequis

- Un navigateur : Chrome, Firefox, Edge ou Brave
- 5 minutes

## Étape 1 — Installer uBlock Origin

uBlock Origin est le bloqueur de référence : open source, léger, efficace.

- **Firefox** : [addons.mozilla.org](https://addons.mozilla.org/fr/firefox/addon/ublock-origin/)
- **Chrome / Edge** : [Chrome Web Store](https://chrome.google.com/webstore/detail/ublock-origin/cjpalhdlnbpafiamejdnhcphjbkeiagm)

> ⚠️ Installe uniquement depuis les stores officiels. Méfie-toi des clones au nom similaire.

## Étape 2 — Activer les listes de filtres avancées

Par défaut uBlock Origin est déjà très efficace. Pour les sites de streaming, active des listes supplémentaires :

1. Clique sur l'icône uBlock Origin → **Tableau de bord** (roue dentée)
2. Va dans l'onglet **Listes de filtres**
3. Active :
   - `Annonces` → toutes les listes cochées par défaut ✅
   - `Vie privée` → EasyPrivacy ✅
   - `Nuisances` → uBlock filters – Annoyances ✅
   - `Régions` → **FRA: Liste FR** ✅ (spécifique aux sites français)
4. Clique sur **Appliquer les changements**

## Étape 3 — Activer le mode avancé (optionnel, intermédiaire)

Le mode avancé permet de bloquer les scripts tiers à la volée.

Dans le tableau de bord → **Paramètres** → cocher **J'ai compris les risques du mode avancé**.

Sur un site de streaming, clique sur l'icône uBlock → tu vois un tableau de domaines. Clique sur la case rouge des domaines publicitaires pour les bloquer définitivement.

## Étape 4 — Gérer les faux boutons de lecture

Certains sites superposent de faux boutons "Play" qui sont en réalité des publicités. uBlock Origin les bloque généralement. Si un faux bouton persiste :

1. Fais un clic droit sur l'élément → **Bloquer l'élément**
2. Ajuste le sélecteur CSS proposé → **Créer**

## Conseils et bonnes pratiques

- Ne désactive jamais uBlock Origin sur les sites de streaming, même si le site le demande
- Sur mobile, utilise **Firefox + uBlock Origin** : c'est la seule vraie solution sur Android
- Brave Browser intègre un bloqueur natif efficace comme alternative
- SponsorBlock (extension complémentaire) retire automatiquement les segments sponsorisés sur YouTube

## Ressources utiles

- [uBlock Origin GitHub](https://github.com/gorhill/uBlock)
- [SponsorBlock](https://sponsor.ajay.app/)
- [Firefox Android](https://www.mozilla.org/fr/firefox/browsers/mobile/android/)
