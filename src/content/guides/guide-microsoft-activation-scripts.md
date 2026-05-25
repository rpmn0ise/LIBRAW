---
title: "Activer Windows et Office avec MAS"
description: "Apprends à utiliser Microsoft Activation Scripts (MAS), l'outil open source de référence pour activer Windows et Office proprement, sans logiciel tiers douteux."
date: 2026-05-25
categorie: outils
niveau: debutant
draft: false
---

## Pourquoi ce guide existe

La plupart des méthodes d'activation qui circulent sur le web sont des exécutables obscurs, bourrés de malwares ou de bloatware. **MAS (Microsoft Activation Scripts)** est l'alternative propre : le code est entièrement open source, auditable, et n'installe rien de superflu.

Il est maintenu activement par la communauté sur GitHub et utilisé par des millions de personnes. C'est aujourd'hui la référence pour activer Windows 10/11 et la suite Office.

## Prérequis

- Windows 10 ou Windows 11
- PowerShell (inclus nativement, aucune installation requise)
- Connexion internet active
- Désactiver temporairement votre antivirus si celui-ci bloque l'exécution du script (faux positif courant)

## Méthode recommandée — via PowerShell (1 commande)

C'est la méthode la plus simple et la plus à jour.

Ouvre **PowerShell en administrateur** (clic droit sur le menu Démarrer → "Terminal (admin)" ou "Windows PowerShell (admin)"), puis colle cette commande :

```powershell
irm https://get.activated.win | iex
```

Un menu interactif s'affiche. Suis les instructions à l'écran pour choisir ce que tu veux activer.

> ⚠️ **Vérifie toujours l'URL avant d'exécuter.** La commande `irm` télécharge un script depuis internet et `iex` l'exécute immédiatement. L'URL officielle est uniquement `https://get.activated.win` — méfie-toi de toute variante.

## Méthode alternative — téléchargement manuel

Si tu préfères inspecter le script avant de l'exécuter (bonne pratique) :

1. Va sur [github.com/massgravel/Microsoft-Activation-Scripts](https://github.com/massgravel/Microsoft-Activation-Scripts)
2. Clique sur **Code → Download ZIP**
3. Extrais l'archive
4. Dans le dossier extrait, ouvre le fichier `MAS_AIO.cmd` **en tant qu'administrateur** (clic droit → Exécuter en tant qu'administrateur)

## Méthodes d'activation disponibles

MAS propose plusieurs méthodes selon ton cas d'usage :

| Méthode | Produits compatibles | Activation |
|---|---|---|
| **HWID** | Windows 10/11 | Permanente, liée au matériel |
| **Ohook** | Office (toutes versions) | Permanente |
| **KMS38** | Windows 10/11 | Jusqu'en 2038 |
| **Online KMS** | Windows + Office | Renewal tous les 180 jours |

**Pour la plupart des utilisateurs :** HWID pour Windows + Ohook pour Office.

## Résolution de problèmes

### Le script ne se télécharge pas

Certains FAI ou fournisseurs DNS bloquent l'accès aux domaines de MAS. Pour contourner ça, active le **DNS-over-HTTPS (DoH)** dans ton navigateur :

- **Firefox** : Paramètres → Confidentialité → DNS via HTTPS
- **Chrome/Edge** : Paramètres → Confidentialité → Utiliser un DNS sécurisé
- Fournisseur recommandé : Cloudflare (`1.1.1.1`)

Tu peux aussi utiliser l'URL alternative : `https://massgrave.dev/`

### L'antivirus bloque l'exécution

C'est un faux positif classique — les antivirus sont souvent sensibles aux scripts PowerShell qui modifient des licences. Désactive temporairement la protection en temps réel, exécute MAS, puis réactive-la.

### Activer des produits supplémentaires

MAS supporte également :
- **Office pour macOS**
- **Visual Studio**
- **Windows XP / versions anciennes**
- **RDS CALs**

Consulte la page dédiée : [massgrave.dev/unsupported_products_activation](https://massgrave.dev/unsupported_products_activation)

### Mode silencieux (sans interface)

Pour automatiser l'activation dans un script ou un déploiement sans interaction manuelle, MAS supporte des arguments en ligne de commande.

Documentation : [massgrave.dev/command_line_switches](https://massgrave.dev/command_line_switches)

## Conseils et bonnes pratiques

- **Ne télécharge MAS que depuis les sources officielles** : GitHub ou `massgrave.dev`. Des copies modifiées circulent avec des malwares intégrés — c'est le principal vecteur d'infection lié à cet outil.
- **L'activation HWID est la plus solide** : elle survit aux réinstallations et aux mises à jour Windows, car elle est liée à ton matériel et enregistrée chez Microsoft.
- **Pas besoin de répéter l'activation** après une mise à jour Windows ou Office.
- MAS est entièrement open source — si tu as le moindre doute, tu peux lire le code source ligne par ligne sur GitHub avant de l'exécuter.

## Ressources utiles

- [Site officiel MAS](https://massgrave.dev/)
- [Dépôt GitHub](https://github.com/massgravel/Microsoft-Activation-Scripts)
- [Résolution de problèmes](https://massgrave.dev/troubleshoot)
- [Activation de produits non standards](https://massgrave.dev/unsupported_products_activation)
- [Options en ligne de commande](https://massgrave.dev/command_line_switches)
