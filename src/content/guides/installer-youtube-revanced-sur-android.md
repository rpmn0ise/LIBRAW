---
title: "Installer YouTube ReVanced sur Android"
description: "Patcher YouTube sur Android pour supprimer les publicités, activer la lecture en arrière-plan et personnaliser l'application."
date: 2026-05-29
categorie: outils
niveau: debutant
draft: false
---

## Pourquoi ce guide existe

YouTube affiche de plus en plus de publicités non skippables et bloque la lecture en arrière-plan sans abonnement Premium. ReVanced est un patch open source qui corrige ça directement dans l'APK, sans root requis.

## Prérequis

- Téléphone Android (Android 8+)
- Autoriser l'installation d'APK depuis des sources inconnues

## Étape 1 — Activer les sources inconnues

**Paramètres → Applications → Menu ⋮ → Accès spécial → Installer des apps inconnues**

Active l'option pour ton navigateur ou gestionnaire de fichiers.

## Étape 2 — Télécharger le bon APK YouTube

ReVanced doit être patché sur une version précise de YouTube. Récupère la dernière build maintenue ici :

**[https://github.com/driftywinds/YT-builds](https://github.com/driftywinds/YT-builds)**

Télécharge le fichier `.apk` de la dernière release.

## Étape 3 — Installer l'APK

1. Ouvre le fichier `.apk` téléchargé depuis ton gestionnaire de fichiers
2. Accepte l'avertissement de sécurité Android
3. Clique sur **Installer**

> Si Android bloque l'installation en mentionnant un conflit avec l'application YouTube existante, désinstalle d'abord l'app YouTube officielle du Play Store.

## Étape 4 — Connexion au compte Google

Au premier lancement, connecte-toi normalement avec ton compte Google. ReVanced prend en charge la connexion standard.

> Si la connexion échoue, installe **MicroG** (inclus dans certaines builds) qui gère l'authentification Google sans les services officiels.

## Fonctionnalités débloquées

- ✅ Suppression de toutes les publicités
- ✅ Lecture en arrière-plan (écran éteint)
- ✅ Image dans l'image (PiP)
- ✅ Interface personnalisable (retirer les Shorts, le feed, etc.)
- ✅ Qualité vidéo jusqu'à 4K disponible

## Conseils et bonnes pratiques

- Désactive les mises à jour automatiques de YouTube dans le Play Store pour éviter l'écrasement de ReVanced
- Utilise **Obtainium** ([guide dédié](guide-obtainium.md)) pour recevoir les mises à jour de ReVanced automatiquement depuis GitHub
- Scanne toujours l'APK sur [VirusTotal](https://www.virustotal.com/) avant installation si tu n'es pas sûr de la source

## Ressources utiles

- [Builds ReVanced YT](https://github.com/driftywinds/YT-builds)
- [Projet ReVanced officiel](https://revanced.app/)
- [Obtainium](https://github.com/ImranR98/Obtainium)
