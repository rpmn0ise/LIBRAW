---
title: "Ventoy : créer une clé USB multiboot avec plusieurs ISO"
description: "Transformer une clé USB en lanceur multiboot universel avec Ventoy — copiez vos ISO dessus et démarrez dessus directement, sans reformater."
date: 2026-05-27
categorie: outils
niveau: debutant
draft: false
---

## Pourquoi ce guide existe

Installer un OS, tester une distribution Linux Live, réparer un système avec Hiren's BootCD, déployer Windows sur une nouvelle machine — chacun de ces scénarios demande traditionnellement une clé USB dédiée, reformatée à chaque usage. Ventoy résout ce problème : une fois installé sur la clé, il suffit de copier vos fichiers ISO dessus comme vous le feriez avec n'importe quel fichier. Au démarrage, Ventoy présente un menu avec toutes les ISO disponibles. Pas de reformatage, pas de logiciel tiers à chaque fois, juste du copier-coller.

## Prérequis

- Une clé USB de 32 Go minimum (les ISO peuvent peser 4 Go ou plus)
- Windows, macOS ou Linux pour installer Ventoy
- Les fichiers ISO à stocker (téléchargeables indépendamment)

> ⚠️ L'installation de Ventoy **formate la clé USB**. Sauvegardez son contenu avant de commencer.

## Installation

### Windows (interface graphique)

1. Téléchargez la dernière version sur **[github.com/ventoy/Ventoy/releases](https://github.com/ventoy/Ventoy/releases)** — choisissez `ventoy-x.x.xx-windows.zip`
2. Décompressez l'archive et lancez `Ventoy2Disk.exe` (droits administrateur requis)
3. Sélectionnez votre clé USB dans le menu déroulant — vérifiez bien la lettre de lecteur
4. Cliquez sur **Install** et confirmez l'avertissement de formatage

Ventoy crée deux partitions : une petite partition EFI (système) et une grande partition exFAT visible dans l'Explorateur, où vous déposerez vos ISO.

### Linux (ligne de commande)

```bash
# Décompressez l'archive
tar -xzf ventoy-x.x.xx-linux.tar.gz
cd ventoy-x.x.xx

# Installez sur votre clé (remplacez /dev/sdX par votre périphérique)
# Vérifiez d'abord avec `lsblk` pour identifier la bonne lettre
sudo sh Ventoy2Disk.sh -i /dev/sdX
```

Options utiles :

```bash
-I   # Forcer l'installation même si Ventoy est déjà présent
-u   # Mettre à jour Ventoy sans toucher aux fichiers ISO
-g   # Utiliser le style de partition GPT (au lieu de MBR par défaut)
-s   # Activer le support Secure Boot
```

### Linux (interface web)

```bash
sudo sh VentoyWeb.sh
```

Une interface web s'ouvre sur `http://127.0.0.1:24680` — même logique que l'interface Windows.

## Ajouter des ISO

Une fois Ventoy installé, copiez simplement vos fichiers ISO sur la partition principale de la clé (la grande partition exFAT visible dans votre gestionnaire de fichiers).

```
📁 Clé USB Ventoy/
├── 📁 Linux/
│   ├── ubuntu-24.04.iso
│   └── debian-12.iso
├── 📁 Windows/
│   └── Win11_24H2_French_x64.iso
└── 📁 Outils/
    └── hirens-bootcd-pe.iso
```

Ventoy parcourt automatiquement tous les dossiers et sous-dossiers pour trouver les images. Organisez librement avec des sous-dossiers — un mode d'affichage **TreeView** est disponible dans le menu de démarrage pour naviguer dans l'arborescence.

**Formats supportés :** `.iso`, `.wim`, `.img`, `.vhd`, `.vhdx`

> Ventoy est compatible avec plus de 1 200 images testées. La liste complète est disponible sur [ventoy.net/en/isolist.html](https://www.ventoy.net/en/isolist.html).

## Démarrer depuis la clé

Branchez la clé et démarrez votre machine en bootant sur la clé USB. Selon votre ordinateur, appuyez sur **F2, F12, Suppr ou Échap** au démarrage pour accéder au BIOS/UEFI et modifier l'ordre de boot.

> 💡 Beaucoup de PC proposent un **Boot Menu** (souvent F10 ou F11) pour choisir le périphérique de démarrage ponctuellement, sans modifier l'ordre de boot de façon permanente.

Le menu Ventoy affiche toutes vos ISO. Sélectionnez celle de votre choix et démarrez.

**Si une ISO refuse de démarrer :** essayez le mode Memdisk (raccourci `Ctrl + D` depuis la version 1.0.83) — l'image est chargée en RAM, ce qui contourne certains problèmes de compatibilité.

> ℹ️ Ventoy supporte les modes **Legacy BIOS et UEFI**. Si le démarrage échoue malgré une bonne config, désactivez temporairement le **Secure Boot** dans le BIOS.

## Configuration avancée

Ventoy dispose d'un système de plugins configurables via l'outil `VentoyPlugson.exe` (Windows) ou `VentoyPlugson.sh` (Linux), qui ouvre une interface web locale. La configuration est sauvegardée dans un fichier JSON sur la clé (`/ventoy/ventoy.json`).

### Mettre à jour Ventoy

La mise à jour **ne supprime pas vos ISO**. Téléchargez la nouvelle version, lancez `Ventoy2Disk.exe` et cliquez sur **Update** au lieu d'Install.

```bash
# Linux
sudo sh Ventoy2Disk.sh -u /dev/sdX
```

### Thème personnalisé

Ventoy est basé sur GRUB2 et accepte ses thèmes. Téléchargez un thème sur [gnome-look.org](https://www.gnome-look.org/browse?cat=109) (catégorie GRUB Themes), copiez le dossier du thème sur la clé, puis déclarez le fichier `theme.txt` via **VentoyPlugson → Theme Plugin**.

### Fichier de réponse automatique (Windows)

Le plugin **Auto Install** permet d'associer une ISO Windows à un fichier `autounattend.xml` pour automatiser complètement l'installation (langue, partition, compte utilisateur, etc.). Utile pour les déploiements répétitifs.

Configuration via **VentoyPlugson → Auto Install Plugin** : indiquez le chemin vers l'ISO et vers le fichier XML.

Pour générer un fichier de réponse Windows : [schneegans.de/windows/autounattend-generator](https://schneegans.de/windows/autounattend-generator/)

### Protection par mot de passe

Le plugin **Password Plugin** permet de verrouiller l'accès global à la clé ou à des ISO spécifiques par mot de passe — pratique si la clé contient des outils sensibles.

## Conseils et bonnes pratiques

- **Formatez la partition en NTFS** si vous avez des ISO de plus de 4 Go (la limite du FAT32) — Ventoy est compatible avec exFAT, NTFS, ext4, etc.
- **Utilisez des sous-dossiers** dès le début pour garder une clé lisible une fois que vous avez 10+ ISO.
- **Gardez un ISO de récupération système** toujours présent (Hiren's BootCD PE, SystemRescue) — c'est la vraie force de Ventoy.
- La clé reste utilisable comme stockage USB normal : les fichiers non-ISO cohabitent sans problème avec Ventoy.

## Ressources utiles

- [Site officiel Ventoy](https://www.ventoy.net/)
- [Releases GitHub](https://github.com/ventoy/Ventoy/releases)
- [Liste des ISO compatibles](https://www.ventoy.net/en/isolist.html)
- [Documentation des plugins](https://www.ventoy.net/en/plugin.html)
- [Bibliothèque de thèmes GRUB2](https://www.gnome-look.org/browse?cat=109)
