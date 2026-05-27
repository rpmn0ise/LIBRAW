---
title: "Ollama : faire tourner un LLM en local en 5 minutes"
description: "Installer Ollama et lancer votre premier modèle de langage en local — sans abonnement, sans cloud, sans connexion internet une fois le modèle téléchargé."
date: 2026-05-27
categorie: ia
niveau: debutant
draft: false
---

## Pourquoi ce guide existe

Les assistants IA en ligne (ChatGPT, Claude, Gemini…) ont un point commun : vos données transitent par des serveurs tiers, et chaque requête est facturée ou limitée. Ollama inverse ce modèle : les modèles tournent entièrement sur votre machine. Confidentialité totale, usage illimité, fonctionnement hors ligne.

Ce guide vous mène de zéro à une conversation avec un LLM local en moins de 10 minutes.

## Prérequis

- Windows 10+, macOS 14.4+ ou Linux (Ubuntu 22.04+, Fedora, Arch…)
- **8 Go de RAM minimum** (16 Go recommandés pour une bonne expérience)
- 10 Go d'espace disque libre (par modèle installé)
- Savoir ouvrir un terminal

### RAM et modèles : ce qu'il faut savoir

| RAM disponible | Modèles adaptés | Expérience |
|---|---|---|
| 8 Go | Modèles 3B (ex. Llama 3.2) | Fonctionnel |
| 16 Go | Modèles 7–8B (ex. Mistral, Gemma) | Confortable |
| 32 Go | Modèles 13–14B | Excellente |
| 64 Go+ | Modèles 70B+ | Professionnelle |

Un GPU NVIDIA (8 Go VRAM+) accélère considérablement les réponses, mais n'est pas obligatoire — le CPU suffit pour démarrer. Les Mac Apple Silicon (M1/M2/M3/M4) sont particulièrement bien adaptés grâce à leur mémoire unifiée.

## Installation

### Linux

```bash
curl -fsSL https://ollama.com/install.sh | sh
```

Le script détecte votre distribution et installe Ollama comme service système. Vérifiez :

```bash
ollama --version
sudo systemctl status ollama
```

### Windows

Téléchargez l'installateur depuis [ollama.com/download](https://ollama.com/download) et lancez `OllamaSetup.exe`. Ollama s'installe en arrière-plan (icône dans la zone de notification).

```powershell
# Vérification dans PowerShell
ollama --version
```

> 💡 Alternative via winget : `winget install ollama.ollama`

### macOS

Téléchargez le `.dmg` depuis [ollama.com/download](https://ollama.com/download), glissez `Ollama.app` dans `/Applications`, puis lancez-le. Une icône de lama apparaît dans la barre de menu.

```bash
# Vérification dans le Terminal
ollama --version
```

> 💡 Alternative via Homebrew : `brew install ollama`

## Télécharger et lancer un premier modèle

Une fois Ollama installé, téléchargez **Llama 3.2** (3B, ~2 Go) — un excellent point de départ, polyvalent et bon en français :

```bash
ollama pull llama3.2
```

La progression s'affiche. Une connexion internet est nécessaire uniquement pour ce téléchargement initial. Ensuite, lancez une conversation :

```bash
ollama run llama3.2
```

Le prompt `>>>` apparaît — posez votre question :

```
>>> Explique ce qu'est une API REST en 3 phrases simples
```

Pour quitter : tapez `/bye`.

## Commandes essentielles

```bash
# Lister les modèles installés
ollama list

# Télécharger un modèle
ollama pull mistral

# Lancer une question unique (sans session interactive)
ollama run llama3.2 "Quelle est la capitale de l'Australie ?"

# Supprimer un modèle pour libérer de l'espace
ollama rm mistral

# Voir les détails d'un modèle
ollama show llama3.2
```

## Choisir son modèle

| Modèle | Taille | Point fort | Commande |
|---|---|---|---|
| llama3.2 | ~2 Go | Polyvalent, bon en français | `ollama pull llama3.2` |
| mistral | ~4 Go | Raisonnement, logique | `ollama pull mistral` |
| codellama | ~4 Go | Génération de code | `ollama pull codellama` |
| gemma | ~2 Go | Léger et rapide | `ollama pull gemma` |
| phi | ~1,5 Go | Ultra-léger, petites machines | `ollama pull phi` |

En 2026, les modèles **Gemma 4** et **Qwen3** offrent d'excellentes performances pour une utilisation quotidienne. La gamme 14B en quantification Q5_K_M est souvent le meilleur compromis qualité/vitesse sur du matériel grand public.

### Quantification : comprendre les suffixes

Quand vous voyez `Q4_K_M` ou `Q5_K_M` dans les noms de variantes, il s'agit du niveau de compression du modèle :

- **Q5_K_M / Q6_K** : haute qualité, peu de dégradation — recommandé pour les modèles 7–14B
- **Q4_K_M** : bon compromis pour les modèles 27–32B quand la VRAM est limitée
- En dessous de Q4 : dégradation notable du raisonnement, à éviter sauf contrainte matérielle forte

## Utiliser l'API REST

Quand Ollama tourne, il expose une API sur `localhost:11434`. Testez-la :

```bash
curl http://localhost:11434/api/chat -d '{
  "model": "llama3.2",
  "messages": [{"role": "user", "content": "Bonjour, comment vas-tu ?"}]
}'
```

C'est cette API que des outils comme Open WebUI, Continue (VS Code) ou vos propres scripts Python utilisent pour communiquer avec les modèles.

### Exemple Python (avec litellm)

```bash
pip install litellm
```

```python
import litellm

response = litellm.completion(
    model="ollama/llama3.2",
    messages=[{"role": "user", "content": "Résume ce qu'est le machine learning en 5 lignes"}]
)

print(response.choices[0].message['content'])
```

## Dépannage

### Ollama ne répond pas

```bash
# Linux : redémarrer le service
sudo systemctl restart ollama
sudo journalctl -u ollama -f  # Voir les logs

# Windows : vérifier l'icône dans la barre des tâches, relancer l'app
# macOS : cliquer sur l'icône dans la barre de menu → vérifier "Running"
```

### "model not found"

```bash
ollama list          # Vérifier les modèles installés
ollama pull llama3.2 # Télécharger le modèle manquant
```

### Réponses très lentes

- Le modèle est trop grand pour votre RAM → passez à un modèle plus petit (ex. `phi`)
- La première réponse après le lancement est toujours plus longue (chargement en mémoire)
- Fermez les applications gourmandes pour libérer de la RAM

### Vérifier que le GPU est bien utilisé (NVIDIA)

```bash
# Dans un second terminal, pendant qu'Ollama génère une réponse
nvidia-smi
```

La colonne `GPU-Util` doit afficher une valeur > 0%. Si elle reste à 0%, Ollama tourne sur CPU uniquement.

## Conseils et bonnes pratiques

- **Soyez précis dans vos questions** : "Écris une fonction Python qui prend une liste de strings et retourne la plus longue" donnera un meilleur résultat que "écris du code Python".
- **Un modèle par usage** : `codellama` pour le code, `llama3.2` pour le texte général — inutile de vouloir tout faire avec un seul modèle.
- **Contexte 8k–16k** : suffisant pour 95% des usages quotidiens. Pousser à 32k+ ralentit sans gain notable sauf besoin spécifique.
- **Open WebUI** : pour une interface graphique façon ChatGPT par-dessus Ollama, installez [Open WebUI](https://openwebui.com) — c'est la combinaison la plus populaire en 2026.
- **Confidentialité réelle** : une fois le modèle téléchargé, coupez internet — tout fonctionne hors ligne. Rien ne sort de votre machine.

## Ressources utiles

- [Site officiel Ollama](https://ollama.com)
- [Catalogue de modèles](https://ollama.com/library)
- [Documentation API](https://github.com/ollama/ollama/blob/main/docs/api.md)
- [GitHub Ollama](https://github.com/ollama/ollama)
- [Open WebUI — interface graphique](https://openwebui.com)
