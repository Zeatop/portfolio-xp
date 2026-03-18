import styles from './WindowContent.module.css'

export default function WindowContent({ id }) {
  switch (id) {
    case 'about':   return <AboutContent />
    case 'probtp':  return <ProBtpContent />
    case 'perso':   return <PersoContent />
    case 'musique': return <MusiqueContent />
    case 'cv':      return <CvContent />
    case 'github':  return <GithubContent />
    case 'linkedin':return <LinkedinContent />
    case 'recycle': return <RecycleContent />
    case 'minesweeper': return <MinesweeperContent />
    case 'pinball': return <PinballContent />
    default:        return <p>Contenu à venir...</p>
  }
}

function SectionTitle({ children }) {
  return <h2 className={styles.sectionTitle}>{children}</h2>
}

function Project({ title, children }) {
  return (
    <div className={styles.project}>
      <h4 className={styles.projectTitle}>{title}</h4>
      <p className={styles.projectBody}>{children}</p>
    </div>
  )
}

function Tag({ children }) {
  return <span className={styles.tag}>{children}</span>
}

function AboutContent() {
  return (
    <>
      <SectionTitle>Léo — Concepteur Développeur</SectionTitle>
      <p className={styles.para}>
        Étudiant en <strong>Master 2 MIAGE MBDS</strong> à l'Université Côte d'Azur (Nice),
        en alternance chez <strong>PRO BTP</strong> au sein de l'équipe DevOps.
      </p>
      <p className={styles.para}>
        Passionné par le développement logiciel, la composition musicale fantasy
        et le game dev (Godot).
      </p>
      <div className={styles.tags}>
        <Tag>Java / Spring</Tag>
        <Tag>Python / Django</Tag>
        <Tag>Docker Swarm</Tag>
        <Tag>Ansible</Tag>
        <Tag>Godot / GDScript</Tag>
        <Tag>React</Tag>
        <Tag>CI/CD</Tag>
      </div>
    </>
  )
}

function ProBtpContent() {
  return (
    <>
      <SectionTitle>Alternance — PRO BTP · Équipe DevOps</SectionTitle>
      <Project title="⏱ Chronos">
        Outil d'analyse d'obsolescence applicative répondant aux exigences réglementaires DORA.
        Stack : Java / Spring Boot, Docker Swarm, Traefik.
      </Project>
      <Project title="📊 Monitoring Jahia CMS">
        Mise en place de dashboards de supervision pour le CMS Jahia.
        Stack : Grafana, InfluxDB, Telegraf.
      </Project>
      <Project title="🛠 PFD Toolbox">
        Outil de configuration automatisée des environnements de développement.
        Stack : Ansible, Docker Swarm, Traefik.
      </Project>
    </>
  )
}

function PersoContent() {
  return (
    <>
      <SectionTitle>Développement & création</SectionTitle>
      <Project title="🎮 Tic-Tac-Toe multijoueur (Godot)">
        Variante "shifting" avec synchronisation d'état via API HTTP. Architecture modulaire
        avec GameConfig autoload, Board.gd, OnlineManager.gd.
      </Project>
      <Project title="📖 QuestlyTales">
        Application Spring Boot de type choose-your-own-adventure. Système d'actions
        dynamiques basé sur JPA, MapStruct et attributs d'entités.
      </Project>
      <Project title="📊 GitLab Analytics Dashboard">
        Dashboard Python / InfluxDB / Grafana avec requêtes Flux pour statistiques
        de projets GitLab (activité, langages, inactivité).
      </Project>
    </>
  )
}

function MusiqueContent() {
  return (
    <>
      <SectionTitle>Compositions — Fantasy & Cinématique</SectionTitle>
      <p className={styles.para}>
        Compositeur amateur spécialisé dans les musiques <strong>fantasy</strong> et
        <strong> cinématiques</strong>. Travail sur l'harmonie modale,
        les progressions en A Dorian et G mineur.
      </p>
      <Project title="🎼 Styles explorés">
        <span>—</span>
      </Project>
      <div className={styles.tags}>
        <Tag>Modal harmony</Tag>
        <Tag>A Dorian</Tag>
        <Tag>G minor</Tag>
        <Tag>Orchestral</Tag>
        <Tag>Cinématique</Tag>
      </div>
      <p className={styles.hint}>→ Liens SoundCloud / YouTube à venir</p>
    </>
  )
}

function CvContent() {
  return (
    <>
      <SectionTitle>Curriculum Vitæ</SectionTitle>
      <Project title="🎓 Formation">
        Master 2 MIAGE MBDS — Université Côte d'Azur, Nice (2024–2025)
      </Project>
      <Project title="💼 Expérience">
        Concepteur Développeur — PRO BTP, équipe DevOps (alternance 2023–2025)
      </Project>
      <Project title="🛠 Compétences clés">
        <span>—</span>
      </Project>
      <div className={styles.tags}>
        <Tag>Java/Spring</Tag><Tag>Python</Tag><Tag>Docker</Tag>
        <Tag>Ansible</Tag><Tag>CI/CD</Tag><Tag>Godot</Tag><Tag>React</Tag>
      </div>
      <p style={{ marginTop: 12 }}>
        <a className={styles.link} href="#">📥 Télécharger le CV (PDF)</a>
      </p>
    </>
  )
}

function GithubContent() {
  return (
    <>
      <SectionTitle>GitHub</SectionTitle>
      <p className={styles.para}>Retrouvez mes projets open source et contributions.</p>
      <p><a className={styles.link} href="https://github.com" target="_blank" rel="noreferrer">🔗 github.com/léo</a></p>
    </>
  )
}

function LinkedinContent() {
  return (
    <>
      <SectionTitle>LinkedIn</SectionTitle>
      <p className={styles.para}>Mon profil professionnel — expériences et formations.</p>
      <p><a className={styles.link} href="https://linkedin.com" target="_blank" rel="noreferrer">🔗 linkedin.com/in/léo</a></p>
    </>
  )
}

function RecycleContent() {
  return (
    <div style={{ textAlign: 'center', paddingTop: 24 }}>
      <p style={{ fontSize: 40 }}>🗑️</p>
      <p style={{ marginTop: 10, color: '#666' }}>La corbeille est vide.</p>
    </div>
  )
}

function MinesweeperContent() {
  return (
    <iframe
      src="/Minesweeper-XP/index.html"
      style={{ width: '100%', height: '100%', border: 'none' , padding: 0, overflow: 'hidden'}}
    />
  )
}

function PinballContent() {
  return (
    <iframe
      src="/Pinball/index.html"
      style={{ width: '100%', height: '100%', border: 'none' }}
      onMouseEnter={(e) => e.target.focus()}
      onClick={(e) => e.target.focus()}
    />
  )
}
