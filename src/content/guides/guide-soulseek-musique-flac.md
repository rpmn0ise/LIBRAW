---
title: "Soulseek : trouver de la musique rare en FLAC"
description: "Utiliser Soulseek pour accéder à une immense bibliothèque communautaire de musique en haute qualité (FLAC, MP3, WAV), configurer ses ports et protéger son IP avec un VPN."
date: 2026-05-27
categorie: download
niveau: debutant
draft: false
---

## Pourquoi ce guide existe

Soulseek est un réseau P2P dédié à la musique, actif depuis plus de 20 ans et toujours en croissance. Contrairement aux plateformes de streaming, sa force réside dans sa communauté : des passionnés qui partagent des discographies complètes en FLAC, des pressings rares, des bootlegs, des albums introuvables sur les services commerciaux. Si vous cherchez un album sorti en tirage limité, une face B japonaise ou un enregistrement live de 1973, Soulseek est souvent votre meilleure chance.

Ce guide couvre l'installation, la configuration des ports (indispensable pour bien partager), l'utilisation avec un VPN, et quelques pratiques pour être un bon membre de la communauté.

## Prérequis

- Windows, macOS ou Linux
- Éventuellement un VPN avec support du port forwarding (AirVPN, ProtonVPN, Mullvad)
- Aucune compétence technique particulière requise

## Installation

### Télécharger SoulseekQt

Rendez-vous sur le site officiel : **[slsknet.org](https://www.slsknet.org/news/)** — c'est le seul site officiel. Choisissez votre système d'exploitation et installez l'application normalement.

> ℹ️ Il n'y a **pas de création de compte** au sens habituel. Au premier lancement, Soulseek vous demande un nom d'utilisateur et un mot de passe de votre choix. Si le pseudo est disponible, il vous est attribué directement.

### Partager votre musique

Dès le premier lancement, Soulseek vous propose de sélectionner un dossier à partager. **C'est fondamental** : Soulseek repose sur le partage mutuel. Partagez au minimum votre bibliothèque musicale existante pour contribuer à la communauté.

- Les utilisateurs apprécient les collections organisées (par artiste / album), pas les dossiers en vrac avec des centaines de fichiers sans structure.
- Vous pouvez définir qui peut accéder à vos fichiers (tout le monde, ou seulement vos contacts).

## Configuration des ports

### Pourquoi c'est important

Sans port ouvert, vous pouvez télécharger, mais les autres utilisateurs ne peuvent pas télécharger depuis vous — ce qui vous expose à des bans de la part de membres qui considèrent cela comme du "leeching". Avoir un port ouvert améliore aussi vos résultats de recherche et vos vitesses.

### Vérifier l'état de votre port

Dans Soulseek : **Options → Login → Check Ports**

- ✅ `TCP open. Your router and Soulseek client is configured correctly.` — rien à faire.
- ❌ `Port CLOSED.` — suivez les étapes ci-dessous.

### Étape 1 : Activer UPnP et NAT-PMP

Dans **Options → Login**, cochez :
- ✅ UPnP port mapping
- ✅ NAT-PMP port mapping (surtout utile sur macOS)

Fermez complètement Soulseek (ne pas juste minimiser), relancez-le, et retestez. Ça suffit dans la majorité des cas sur un réseau domestique.

### Étape 2 : Autoriser Soulseek dans le pare-feu système

**Windows :**
1. Recherchez *Windows Defender Firewall* dans le menu démarrer
2. Cliquez sur *Autoriser une application via le pare-feu*
3. Cochez `SoulseekQt` en Public et/ou Privé selon votre réseau

**macOS :**
1. Préférences Système → Sécurité et confidentialité → Pare-feu
2. Options du pare-feu → ajoutez Soulseek si absent, autorisez les connexions entrantes

### Étape 3 : Redirection de port sur le routeur

Si les étapes précédentes ne suffisent pas, configurez manuellement la redirection du port d'écoute Soulseek dans l'interface d'administration de votre routeur (généralement accessible via `192.168.1.1`). Le port utilisé est affiché dans **Options → Login**.

### Utilisation avec un VPN

Si vous utilisez un VPN, il peut bloquer le port d'écoute. **Choisissez un VPN qui supporte le port forwarding** — c'est indispensable pour Soulseek :

| VPN | Port forwarding | Notes |
|---|---|---|
| AirVPN | ✅ Port fixe configurable | Recommandé |
| ProtonVPN (plan Plus) | ✅ | Fonctionne bien |
| Mullvad | ✅ | Port aléatoire |
| Private Internet Access | ⚠️ Port aléatoire | À reconfigurer à chaque session |
| Surfshark, NordVPN… | ❌ | Incompatibles avec Soulseek |

Avec PIA ou Mullvad (port aléatoire) : copiez le port affiché par votre client VPN après connexion, puis collez-le dans **Options → Login → Listening port** avant de lancer Soulseek.

> ℹ️ Sur un **réseau d'école ou d'entreprise**, la redirection de port est généralement impossible sans VPN dédié. Soulseek fonctionnera en téléchargement seul, mais vous ne pourrez pas être sourcé par d'autres.

## Utilisation

### Rechercher de la musique

Rendez-vous dans l'onglet **Search**. Quelques stratégies pour les recherches difficiles :

- Essayez plusieurs formulations : nom de l'artiste seul, titre de l'album, numéro de catalogue
- Utilisez **[Discogs](https://www.discogs.com)** en parallèle pour retrouver les noms exacts, labels, et numéros de catalogue — très utile pour les pressings rares
- Affinez avec le filtre en bas de la fenêtre de résultats si vous avez trop de résultats

### Lire les résultats

Dans les résultats, vous voyez pour chaque fichier :
- Le **bitrate** ou format (FLAC, MP3 320, etc.)
- La **vitesse d'upload** de l'utilisateur source
- Le **nombre de slots disponibles** (slots d'upload libres)

Privilégiez les utilisateurs avec une vitesse élevée et des slots disponibles. Un utilisateur hors ligne (icône rouge) ne peut pas être téléchargé.

### Télécharger

- **Clic droit → Download file** pour un fichier individuel
- **Clic droit → Download folder** pour un album entier

La progression est visible dans l'onglet **Transfers**.

## Conseils et bonnes pratiques

- **Partagez généreusement** : la santé du réseau repose sur le partage. Un ratio déséquilibré (beaucoup de téléchargements, peu de partage) vous vaudra des bans d'utilisateurs.
- **Organisez votre bibliothèque partagée** : dossiers par artiste et par album, fichiers correctement tagués — c'est ce que la communauté apprécie.
- **Vitesse d'upload** : si vous limitez votre upload, ne descendez pas sous 200 kbps pour ne pas décourager les téléchargements depuis vous.
- **Évitez les salons de discussion** : les rooms Soulseek sont peu utiles pour trouver de la musique et généralement peu modérées.
- **Android** : l'application **Seeker** (disponible sur F-Droid et Play Store) est un client Soulseek mobile bien conçu.

## Ressources utiles

- [Site officiel Soulseek](https://www.slsknet.org/news/)
- [Seeker — Client Android](https://github.com/nicholasgasior/soulseek-android)
- [Discogs — Base de données musicale](https://www.discogs.com)
- [AirVPN — VPN avec port forwarding](https://airvpn.org/)
- [r/Soulseek — Communauté d'entraide](https://www.reddit.com/r/Soulseek/)
