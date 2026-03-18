// All window content for the portfolio
export const WINDOWS = {
  about: {
    id: 'about',
    title: 'À propos de moi',
    icon: '🧑‍💻',
    img: "/winxp_icons/User 1.ico",
    defaultSize: { width: 420, height: 300 },
  },
  probtp: {
    id: 'probtp',
    title: 'Projets PRO BTP',
    icon: '🏢',
    img: "/winxp_icons/Manage your Server.ico",
    defaultSize: { width: 460, height: 380 },
  },
  perso: {
    id: 'perso',
    title: 'Projets personnels',
    icon: '🎮',
    img: "/winxp_icons/Game Controller.ico",
    defaultSize: { width: 460, height: 360 },
  },
  musique: {
    id: 'musique',
    title: 'Mes musiques',
    icon: '🎵',
    img: "/winxp_icons/Music File.ico",
    defaultSize: { width: 400, height: 280 },
  },
  cv: {
    id: 'cv',
    title: 'Mon CV',
    icon: '📄',
    img: "/winxp_icons/File.ico",
    defaultSize: { width: 420, height: 320 },
  },
  github: {
    id: 'github',
    title: 'GitHub',
    icon: '🐙',
    img: "/winxp_icons/Earth (fixed).ico",
    defaultSize: { width: 340, height: 200 },
  },
  linkedin: {
    id: 'linkedin',
    title: 'LinkedIn',
    icon: '💼',
    img: "/winxp_icons/User Accounts.ico",
    defaultSize: { width: 340, height: 200 },
  },
  recycle: {
    id: 'recycle',
    title: 'Corbeille',
    icon: '🗑️',
    img: "/winxp_icons/Folder Closed (Alt).ico",
    defaultSize: { width: 300, height: 160 },
  },
  minesweeper: {
    id: 'minesweeper',
    title: 'Minesweeper',
    icon: '💣',
    img: "/winxp_icons/Minesweeper.ico",
    defaultSize: { width: 220, height: 320 },
  },
}

// Desktop icon layout
export const DESKTOP_ICONS = [
  { id: 'about',   icon: '🧑‍💻', img: '/winxp_icons/User 1.ico', label: 'About me',        col: 0, row: 0 },
  { id: 'probtp',  icon: '🏢',  img: '/winxp_icons/Manage your Server.ico', label: 'Projets PRO BTP', col: 0, row: 1 },
  { id: 'perso',   icon: '🎮',  img: '/winxp_icons/Game Controller.ico', label: 'Projets perso',   col: 0, row: 2 },
  { id: 'musique', icon: '🎵',  img: '/winxp_icons/Music File.ico', label: 'Mes musiques',    col: 0, row: 3 },
  { id: 'cv',      icon: '📄',  img: '/winxp_icons/File.ico', label: 'Mon CV',          col: 0, row: 4 },
  { id: 'github',  icon: '🐙',  img: '/winxp_icons/Earth (fixed).ico', label: 'GitHub',          col: 1, row: 0 },
  { id: 'linkedin',icon: '💼',  img: '/winxp_icons/User Accounts.ico', label: 'LinkedIn',        col: 1, row: 1 },
  { id: 'recycle', icon: '🗑️',  img: '/winxp_icons/Folder Closed (Alt).ico', label: 'Corbeille',       col: 1, row: 2 },
  { id: 'minesweeper', icon: '💣', img: '/winxp_icons/Minesweeper.ico', label: 'Minesweeper', col: 1, row: 3 },
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
