---
title: "Lutris : jouer à tout sur Linux sans se prendre la tête"
description: "Installer et configurer Lutris pour centraliser et lancer vos jeux Windows, natifs Linux et rétro depuis une seule interface."
date: 2026-05-27
categorie: gaming
niveau: debutant
draft: false
---

## Pourquoi ce guide existe

Linux a longtemps été une plateforme hostile aux joueurs. Ce n'est plus le cas : entre Proton, Wine et les couches de compatibilité modernes, la grande majorité des jeux Windows tournent aujourd'hui sous Linux. Lutris est le hub qui centralise tout ça — jeux natifs, jeux Windows, émulateurs, launchers tiers — dans une interface unifiée.

> 💡 Si vous cherchez une solution encore plus simple pour GOG et Epic Games, jetez un œil à [Heroic Games Launcher](https://heroicgameslauncher.com), une alternative légère et très accessible.

## Prérequis

- Linux (Ubuntu 22.04+, Linux Mint, Fedora, Arch…)
- GPU NVIDIA : pilote propriétaire installé et à jour
- GPU AMD / Intel : mesa et drivers à jour via le gestionnaire de paquets
- Connexion internet pour les premiers téléchargements

> Sur **Nobara** ou **Bazzite** (distributions orientées gaming), Lutris est préinstallé et préconfigurés — vous pouvez passer directement à la section Configuration.

## Installation

### Méthode recommandée : Flatpak

La version Flatpak est toujours à jour et s'installe en une commande. C'est la méthode la plus simple et la plus universelle.

```bash
# Activer Flathub si ce n'est pas déjà fait
flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo

# Installer Lutris
flatpak install flathub net.lutris.Lutris
```

Installez également ces deux compagnons indispensables :

```bash
# Flatseal : gérer les permissions des apps Flatpak
flatpak install flathub com.github.tchx84.Flatseal

# ProtonPlus : télécharger et gérer les versions de Proton/Wine
flatpak install flathub com.vysp3r.ProtonPlus
```

### Via APT (Debian/Ubuntu)

```bash
sudo dpkg --add-architecture i386
sudo apt update && sudo apt install lutris
```

> ⚠️ La version APT peut être ancienne selon votre distribution. Préférez Flatpak pour avoir les dernières corrections.

## Configuration initiale

### 1. Ouvrir les permissions Flatpak avec Flatseal

Lutris en Flatpak est sandboxé par défaut, ce qui peut l'empêcher d'accéder à vos dossiers de jeux.

1. Ouvrez **Flatseal**
2. Dans la barre latérale, sélectionnez **Lutris**
3. Dans la section *Système de fichiers*, activez **"Tous les systèmes de fichiers"**

### 2. Télécharger Wine dans Lutris

1. Ouvrez Lutris, laissez-le se mettre à jour
2. Menu hamburger (en haut à droite) → **Préférences** → **Runners**
3. Recherchez **Wine** → cliquez sur le bouton de téléchargement → installez au moins une version

### 3. Passer sur Proton-GE (fortement recommandé)

Proton-GE est une version communautaire de Proton avec plus de correctifs de compatibilité que la version officielle.

Via **ProtonPlus** :
1. Ouvrez ProtonPlus → sélectionnez **Lutris (Flatpak)**
2. Choisissez **Proton GE** → téléchargez la version **Latest**
3. Relancez Lutris

Dans les paramètres globaux de Lutris (ou par jeu) : Options de Runner → Version de Wine → **GE-Proton Latest**

### 4. Forcer le GPU dédié (laptops et PC hybrides)

Si votre machine a un GPU intégré et un GPU dédié, forcez Lutris à utiliser le dédié :

Options système du jeu → Affichage → GPU → sélectionnez votre GPU dédié (au lieu de Auto)

## Ajouter et lancer des jeux

### Préparer l'arborescence de dossiers

Avant d'ajouter un jeu, créez une structure claire dans votre dossier personnel :

```
~/games/
├── monojeu/          ← fichiers du jeu
│   └── prefix/       ← environnement Windows virtuel (wineprefix)
```

> Pas d'espaces ni de caractères spéciaux dans les noms de dossiers — cela peut causer des erreurs.

### Ajouter un jeu installé localement

1. Dans Lutris : bouton **+** en haut à gauche
2. Sélectionnez **"Ajouter un jeu installé localement"**

**Onglet "Informations sur le jeu"**
- Nom : ce que vous voulez
- Runner : **Wine (Exécuter le jeu Windows)**

**Onglet "Options de jeu"**
- Exécutable : sélectionnez le `.exe` du jeu
- Répertoire de travail : dossier du jeu (`~/games/monojeu/`)
- Répertoire Wineprefix : dossier prefix (`~/games/monojeu/prefix/`)

**Onglet "Options de Runner"**
- Version de Wine : **GE-Proton Latest**

Sauvegardez, puis double-cliquez sur le jeu pour le lancer. Le premier démarrage est plus long (compilation du prefix).

### Connecter des launchers tiers

Lutris peut installer automatiquement des launchers comme GOG Galaxy, EA App ou Battle.net. Dans la recherche Lutris, tapez le nom du launcher — des scripts d'installation communautaires apparaîtront.

## Dépannage

### Le jeu plante ou ne se lance pas

Essayez dans cet ordre :

1. **Changer la version de Proton/Wine** : clic droit sur le jeu → Configurer → Options de Runner → Version de Wine. Téléchargez une version plus ancienne via ProtonPlus si besoin.
2. **Installer des dépendances manquantes** via winetricks : clic droit → icône de verre → triangle → *Winetricks* → *Default wineprefix* → *Installer un composant Windows/DLL*.
3. **Désactiver ou activer le mode Gaming Feral** : Options système → CPU.
4. **Redémarrer** Lutris et/ou le PC.

### Override de DLL (mods, fixes en ligne)

Clic droit sur le jeu → Configurer → Options de Runner → **Override DLL** → Ajouter :
- Clé : nom de la DLL (ex. `dinput8`)
- Valeur : `n` (natif) ou `b` (builtin)

### Trouver l'aide

- [Forums Lutris](https://forums.lutris.net)
- [r/linux_gaming](https://reddit.com/r/linux_gaming)
- [ProtonDB](https://www.protondb.com) — rapports de compatibilité par jeu

## Conseils et bonnes pratiques

- **Un wineprefix par jeu** : cela isole les environnements et évite les conflits de DLL entre jeux.
- **Vérifiez ProtonDB avant d'installer** : le site recense les retours d'expérience de la communauté sur chaque jeu sous Linux.
- **Préférez les distributions gaming-ready** pour débuter : Bazzite ou Nobara embarquent tout le nécessaire et évitent de nombreuses heures de configuration.
- **MangoDB HUD** : si installé, activez-le dans les Options système de chaque jeu pour monitorer FPS, GPU et CPU en superposition.

## Ressources utiles

- [Site officiel Lutris](https://lutris.net)
- [GitHub Lutris](https://github.com/lutris/lutris)
- [Guide des pilotes GPU (Lutris)](https://github.com/lutris/docs/blob/master/InstallingDrivers.md)
- [ProtonDB — compatibilité des jeux](https://www.protondb.com)
- [Heroic Games Launcher](https://heroicgameslauncher.com) (alternative pour GOG/Epic)
- [Bazzite — distribution gaming Linux](https://bazzite.gg)
