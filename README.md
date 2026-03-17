# Portfolio XP 🖥️

Portfolio personnel avec thème Windows XP — boot sequence BIOS, splash screen, écran de login, et desktop interactif.

## Stack

- **React 18** + **Vite**
- **Zustand** — gestion d'état global (phases OS + fenêtres)
- **react-rnd** — fenêtres draggables et redimensionnables
- **CSS Modules** — styles scopés par composant

## Installation

```bash
npm install
npm run dev
```

## Ajouter le vrai wallpaper Bliss

Place `blissxp.webp` dans le dossier `/public/`, puis dans `src/components/Desktop/Desktop.module.css` remplace le commentaire par :

```css
.desktop {
  /* Remplace le background CSS par : */
  background-image: url('/blissxp.webp');
  background-size: cover;
  background-position: center;
}
```

## Structure du projet

```
src/
├── App.jsx                        # Orchestrateur des phases
├── App.css
├── store/
│   └── useOsStore.js              # Zustand store (phase + windows)
├── data/
│   └── windows.js                 # Métadonnées fenêtres, icônes, menus
├── components/
│   ├── Boot/
│   │   ├── BiosScreen.jsx         # Séquence BIOS ligne par ligne
│   │   ├── BiosScreen.module.css
│   │   ├── SplashScreen.jsx       # Splash XP + blocs animés
│   │   └── SplashScreen.module.css
│   ├── Login/
│   │   ├── LoginScreen.jsx        # Écran de connexion XP
│   │   └── LoginScreen.module.css
│   ├── Desktop/
│   │   ├── Desktop.jsx            # Bureau, icônes, taskbar, start menu
│   │   └── Desktop.module.css
│   └── Window/
│       ├── XpWindow.jsx           # Fenêtre draggable (react-rnd)
│       ├── XpWindow.module.css
│       ├── WindowContent.jsx      # Contenu de chaque fenêtre
│       └── WindowContent.module.css
```

## Personnalisation

### Ajouter une nouvelle fenêtre

1. Dans `src/data/windows.js`, ajoute une entrée dans `WINDOWS` et `DESKTOP_ICONS`
2. Dans `src/components/Window/WindowContent.jsx`, ajoute un `case` dans le switch et crée le composant de contenu

### Modifier le contenu

Tout le contenu du portfolio est dans `src/components/Window/WindowContent.jsx` — chaque section est un composant React indépendant.

## Déploiement

```bash
npm run build
# Le dossier dist/ est prêt pour Vercel, Netlify, GitHub Pages...
```
