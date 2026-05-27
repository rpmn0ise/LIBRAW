---
title: "GrapheneOS : installer et configurer un Android vraiment privé"
description: "Installer GrapheneOS sur un Google Pixel et configurer un smartphone Android renforcé, sans télémétrie, avec Google Play optionnel en sandbox."
date: 2026-05-27
categorie: privacy
niveau: intermediaire
draft: false
---

## Pourquoi ce guide existe

Android stock envoie en permanence des données à Google — localisation, usage des applications, identifiants publicitaires. GrapheneOS est un fork d'Android Open Source Project (AOSP) qui retire tout ça et renforce la sécurité en profondeur : pas de Google Services par défaut, pas de télémétrie, des protections mémoire supplémentaires, et des mises à jour de sécurité déployées plus rapidement que sur le Pixel stock. Les apps Google Play restent disponibles — mais en sandbox, sans accès privilégié au système.

Ce guide couvre l'installation complète et la configuration initiale recommandée pour un usage quotidien.

## Prérequis

- Un **Google Pixel** officiellement supporté (voir liste ci-dessous)
- Un câble USB-C de qualité (préférez le câble officiel Google)
- Un ordinateur sous Windows 10+, macOS Sonoma+ ou Linux (Debian, Ubuntu, Arch)
- 30 à 60 minutes disponibles
- **La clé USB ou la version carrier-locked du Pixel est à éviter** — les variantes opérateur désactivent le déverrouillage bootloader

### Appareils supportés en 2026

Séries Pixel 6, 7, 7a, 8, 8a, 8 Pro, 9, 9 Pro, 9 Pro XL, 9 Pro Fold, 9a, 10, 10 Pro, 10 Pro XL, 10 Pro Fold, 10a, Pixel Fold, Pixel Tablet.

> Les Pixel 5 et antérieurs ne sont plus supportés (fin de vie).

## Préparation de l'appareil

### 1. Activer les options développeur

**Paramètres → À propos du téléphone → Numéro de build** : appuyez 7 fois dessus jusqu'à ce que le message "Vous êtes maintenant développeur" s'affiche.

### 2. Activer le déverrouillage OEM

**Paramètres → Système → Options développeur → Déverrouillage OEM** : activez cette option. Une connexion internet est requise sur certains modèles pour vérifier que l'appareil n'est pas verrouillé opérateur.

> ⚠️ Sur le **Pixel 6a** : le déverrouillage OEM ne fonctionne pas avec la version d'usine. Mettez à jour l'appareil vers la version de juin 2022 minimum, puis effectuez une réinitialisation d'usine avant de continuer.

### 3. Sauvegarder vos données

L'installation **efface intégralement** l'appareil. Sauvegardez photos, contacts, et données d'applications avant de commencer. Chargez la batterie à 80 % minimum.

## Installation

### Méthode 1 : Web Installer (recommandée)

La méthode la plus simple. Aucune ligne de commande requise.

1. Ouvrez **Chrome, Chromium, Edge ou Brave** (Brave : désactivez Brave Shields le temps de l'installation). Firefox n'est pas supporté (pas de WebUSB).
2. Rendez-vous sur **[grapheneos.org/install/web](https://grapheneos.org/install/web)**
3. Connectez votre Pixel en USB-C
4. Suivez les étapes guidées : démarrage en mode bootloader, déverrouillage, téléchargement + flash automatique de GrapheneOS, puis **verrouillage du bootloader**

> ⚠️ Ne sautez pas le verrouillage du bootloader en fin d'installation — il active le verified boot et protège l'OS contre toute modification non autorisée.

Durée estimée : 15 à 20 minutes.

### Méthode 2 : Ligne de commande (avancé)

Pour les utilisateurs à l'aise avec le terminal ou dont le navigateur ne supporte pas WebUSB.

#### Installer fastboot

```bash
# Arch Linux
sudo pacman -S android-tools

# Debian / Ubuntu
sudo apt install android-sdk-platform-tools

# macOS (Homebrew)
brew install android-platform-tools
```

Sur Windows, téléchargez les [platform-tools officiels](https://developer.android.com/tools/releases/platform-tools) et ajoutez-les au PATH.

#### Linux : règles udev (non-root)

```bash
# Debian / Ubuntu
sudo apt install android-sdk-platform-tools-common

# Arch Linux
sudo pacman -S android-udev
```

#### Bloquer fwupd si nécessaire (Linux)

```bash
# fwupd peut accaparer le périphérique USB en fastboot
sudo systemctl stop fwupd.service
```

#### Procédure d'installation

```bash
# 1. Démarrer en mode bootloader
# Éteignez l'appareil, maintenez Volume Bas au démarrage
# jusqu'à l'affichage du triangle rouge "Fastboot Mode"

# 2. Déverrouiller le bootloader
fastboot flashing unlock
# Confirmez sur l'écran de l'appareil (Volume + Power)

# 3. Télécharger et vérifier les factory images
# Sur https://grapheneos.org/releases, notez le DEVICE_NAME (ex: shiba pour Pixel 8)
curl -O https://releases.grapheneos.org/allowed_signers
curl -O https://releases.grapheneos.org/DEVICE_NAME-install-VERSION.zip
curl -O https://releases.grapheneos.org/DEVICE_NAME-install-VERSION.zip.sig

# Vérifier la signature cryptographique
ssh-keygen -Y verify -f allowed_signers \
  -I contact@grapheneos.org \
  -n "factory images" \
  -s DEVICE_NAME-install-VERSION.zip.sig \
  < DEVICE_NAME-install-VERSION.zip

# 4. Flasher GrapheneOS
# Linux
bsdtar xvf DEVICE_NAME-install-VERSION.zip
cd DEVICE_NAME-install-VERSION
bash flash-all.sh

# Windows
tar xvf DEVICE_NAME-install-VERSION.zip
cd DEVICE_NAME-install-VERSION
./flash-all.bat

# 5. Verrouiller le bootloader (obligatoire)
fastboot flashing lock
```

## Configuration initiale

Au premier démarrage, GrapheneOS affiche un assistant minimal sans compte Google requis.

### Sécurité de l'écran de verrouillage

Choisissez un **mot de passe alphanumérique** plutôt qu'un PIN court — c'est la clé de dérivation du chiffrement complet de l'appareil. Minimum 8 caractères, combinaison de lettres et chiffres.

### Désactiver le déverrouillage OEM

Le dernier écran de l'assistant propose de désactiver le déverrouillage OEM. **Laissez cette option cochée** — c'est la configuration recommandée en production.

### DNS privé

**Paramètres → Réseau et Internet → DNS privé** → entrez `dns.quad9.net` ou `dns.adguard.com` pour chiffrer vos requêtes DNS et bloquer les domaines malveillants.

## Configuration avancée

### Sécurité USB-C

**Paramètres → Sécurité → Protection contre les exploits → Port USB-C** : réglez sur *Charging-only when locked* (valeur par défaut). Les données USB sont bloquées quand l'écran est verrouillé — protège contre les attaques physiques et le juice-jacking.

### Redémarrage automatique

**Paramètres → Sécurité → Protection contre les exploits → Redémarrage automatique** : réglez sur 18 à 24 heures. Si l'appareil n'est pas déverrouillé dans ce délai, il redémarre automatiquement et repasse en chiffrement complet (Before First Unlock).

### PIN aléatoire

**Paramètres → Sécurité → Mélanger le layout PIN** : le clavier est réordonné aléatoirement à chaque saisie — rend le shoulder-surfing et l'analyse des traces de doigt inefficaces.

### Permissions par application

Pour chaque application sensible, vérifiez les permissions via **Paramètres → Applications → [App] → Permissions** :

- Localisation : *Uniquement pendant l'utilisation* ou *Refuser*
- Caméra / Micro : *Demander à chaque fois*
- Capteurs (gyroscope, accéléromètre) : désactivables par app dans GrapheneOS

### Storage Scopes et Contact Scopes

GrapheneOS propose deux fonctionnalités exclusives pour limiter l'accès des apps aux fichiers et contacts sans les bloquer complètement :

- **Storage Scopes** : l'app croit avoir les permissions de stockage mais ne voit que ses propres fichiers. Activable dans les paramètres de l'app.
- **Contact Scopes** : accordez l'accès à un contact spécifique ou un groupe, pas à toute la liste. Utile pour les apps de messagerie qui exigent les contacts.

## Installer des applications

### Option A : Aurora Store (accès anonyme au Play Store)

Téléchargez l'APK depuis [auroraoss.com](https://auroraoss.com), installez-le, et choisissez la connexion **Anonymous**. Donne accès à presque toutes les apps du Play Store sans compte Google.

### Option B : F-Droid (apps open source)

Téléchargez depuis [f-droid.org](https://f-droid.org). Contient uniquement des applications libres et open source — Aegis (2FA), NewPipe (YouTube), Organic Maps, K-9 Mail, etc.

### Option C : Google Play en sandbox (optionnel)

Pour les apps qui nécessitent Google Services (apps bancaires, etc.) :

1. **Paramètres → Applications → App Repository (GrapheneOS)**
2. Installez *Google Play Services* — cela installe aussi le Play Store
3. Google Play fonctionne comme une app normale, sans accès privilégié au système
4. Donnez une exception d'optimisation batterie à Google Play Services pour les notifications push

> Google Play sandboxé peut être désinstallé à tout moment sans affecter le reste du système.

## Applications recommandées

Quelques incontournables compatibles GrapheneOS :

- **Signal** — messagerie chiffrée, fonctionne sans Google Play Services
- **Vanadium** — navigateur basé sur Chromium, inclus par défaut, renforcé par GrapheneOS
- **Aegis Authenticator** — 2FA avec sauvegardes chiffrées locales (F-Droid)
- **Bitwarden** — gestionnaire de mots de passe open source
- **Organic Maps** — cartes hors-ligne basées sur OpenStreetMap
- **Mullvad VPN ou ProtonVPN** — VPN avec politique no-log auditée

## Vérifier l'installation

### Hash du verified boot (Pixel 6 et supérieur)

Au démarrage, GrapheneOS affiche brièvement un écran jaune avec le hash de la clé de verified boot. Vous pouvez le comparer aux hashes officiels publiés sur [grapheneos.org/install/web](https://grapheneos.org/install/web) pour confirmer l'authenticité de l'installation.

### Auditor

L'application **Auditor** (incluse dans GrapheneOS) permet une vérification matérielle via attestation : elle confirme que le hardware, le firmware et l'OS sont authentiques et non modifiés. Un second appareil Android est nécessaire pour la vérification locale par QR code.

## Mises à jour

GrapheneOS vérifie automatiquement les mises à jour toutes les 6 heures. Les patches de sécurité sont déployés plus rapidement que sur le Pixel stock — généralement 7 à 14 jours après la publication par Google.

**Paramètres → Système → Mise à jour système** pour vérifier manuellement ou configurer les réseaux autorisés (Wi-Fi uniquement recommandé pour économiser les données mobiles).

## Ressources utiles

- [Site officiel GrapheneOS](https://grapheneos.org/)
- [Web Installer](https://grapheneos.org/install/web)
- [Guide d'utilisation officiel](https://grapheneos.org/usage)
- [Compatibilité des apps bancaires (PrivSec.dev)](https://privsec.dev/posts/android/banking-applications-compatibility-with-grapheneos/)
- [Salon de discussion officiel](https://grapheneos.org/contact#community)
