// All window content for the portfolio
export const WINDOWS = {
  about: {
    id: 'about',
    title: 'À propos de moi',
    icon: '🧑‍💻',
    defaultSize: { width: 420, height: 300 },
  },
  probtp: {
    id: 'probtp',
    title: 'Projets PRO BTP',
    icon: '🏢',
    defaultSize: { width: 460, height: 380 },
  },
  perso: {
    id: 'perso',
    title: 'Projets personnels',
    icon: '🎮',
    defaultSize: { width: 460, height: 360 },
  },
  musique: {
    id: 'musique',
    title: 'Mes musiques',
    icon: '🎵',
    defaultSize: { width: 400, height: 280 },
  },
  cv: {
    id: 'cv',
    title: 'Mon CV',
    icon: '📄',
    defaultSize: { width: 420, height: 320 },
  },
  github: {
    id: 'github',
    title: 'GitHub',
    icon: '🐙',
    defaultSize: { width: 340, height: 200 },
  },
  linkedin: {
    id: 'linkedin',
    title: 'LinkedIn',
    icon: '💼',
    defaultSize: { width: 340, height: 200 },
  },
  recycle: {
    id: 'recycle',
    title: 'Corbeille',
    icon: '🗑️',
    defaultSize: { width: 300, height: 160 },
  },
}

// Desktop icon layout
export const DESKTOP_ICONS = [
  { id: 'about',   icon: '🧑‍💻', label: 'About me',        col: 0, row: 0 },
  { id: 'probtp',  icon: '🏢',  label: 'Projets PRO BTP', col: 0, row: 1 },
  { id: 'perso',   icon: '🎮',  label: 'Projets perso',   col: 0, row: 2 },
  { id: 'musique', icon: '🎵',  label: 'Mes musiques',    col: 0, row: 3 },
  { id: 'cv',      icon: '📄',  label: 'Mon CV',          col: 0, row: 4 },
  { id: 'github',  icon: '🐙',  label: 'GitHub',          col: 1, row: 0 },
  { id: 'linkedin',icon: '💼',  label: 'LinkedIn',        col: 1, row: 1 },
  { id: 'recycle', icon: '🗑️',  label: 'Corbeille',       col: 1, row: 2 },
]

// Start menu items
export const START_MENU_LEFT = [
  { id: 'about',   icon: '🧑‍💻', label: 'About me' },
  { id: 'probtp',  icon: '🏢',  label: 'Projets PRO BTP' },
  { id: 'perso',   icon: '🎮',  label: 'Projets perso' },
  { id: 'musique', icon: '🎵',  label: 'Mes musiques' },
  { id: 'cv',      icon: '📄',  label: 'Mon CV' },
]
export const START_MENU_RIGHT = [
  { id: 'github',  icon: '🐙',  label: 'GitHub' },
  { id: 'linkedin',icon: '💼',  label: 'LinkedIn' },
]
