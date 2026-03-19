import styles from './WindowContent.module.css'
import { useState, useEffect, useRef } from 'react'
import Webamp from 'webamp'
import MailContent from './MailContent'

export default function WindowContent({ id }) {
  switch (id) {
    case 'about':   return <AboutContent />
    case 'probtp':  return <ProBtpContent />
    case 'perso':   return <PersoContent />
    case 'cv':      return <CvContent />
    case 'github':  return <GithubContent />
    case 'linkedin':return <LinkedinContent />
    case 'recycle': return <RecycleContent />
    case 'minesweeper': return <MinesweeperContent />
    case 'pinball': return <PinballContent />
    case 'mail':     return <MailContent />
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


function CvContent() {
  const [lang, setLang] = useState('fr')
  const isFr = lang === 'fr'

  return (
    <>
      {/* Onglets langue */}
      <div style={{ display: 'flex', gap: 2, marginBottom: 10 }}>
        <button
          onClick={() => setLang('fr')}
          style={{
            padding: '2px 12px',
            fontFamily: 'inherit',
            fontSize: 12,
            cursor: 'pointer',
            background: isFr ? '#316ac5' : '#ece9d8',
            color: isFr ? '#fff' : '#000',
            border: '1px solid #99bbdd',
            borderBottom: isFr ? '1px solid #316ac5' : '1px solid #ccc',
            borderRadius: '3px 3px 0 0',
          }}
        >🇫🇷 Français</button>
        <button
          onClick={() => setLang('en')}
          style={{
            padding: '2px 12px',
            fontFamily: 'inherit',
            fontSize: 12,
            cursor: 'pointer',
            background: !isFr ? '#316ac5' : '#ece9d8',
            color: !isFr ? '#fff' : '#000',
            border: '1px solid #99bbdd',
            borderBottom: !isFr ? '1px solid #316ac5' : '1px solid #ccc',
            borderRadius: '3px 3px 0 0',
          }}
        >🇬🇧 English</button>
      </div>

      <p style={{ marginBottom: 12 }}>
        <a className={styles.link} href="/LEO_JACKSON_CV.pdf" target="_blank" rel="noreferrer">
          📥 {isFr ? 'Télécharger le CV (PDF)' : 'Download Resume (PDF)'}
        </a>
      </p>

      <SectionTitle>Curriculum Vitæ — Léo Jackson</SectionTitle>

      <div className={styles.tags}>
        <Tag>Python</Tag><Tag>Django</Tag><Tag>Docker</Tag>
        <Tag>Spring Boot</Tag><Tag>Ansible</Tag><Tag>CI/CD</Tag>
        <Tag>Java/Spring</Tag><Tag>React</Tag><Tag>Linux</Tag><Tag>AWS</Tag>
      </div>

      {isFr ? (
        <>
          <Project title="💼 Expériences professionnelles">
            <strong>Alternance — Développeur Full-Stack</strong><br />
            <span style={{color:'#316ac5'}}>PRO BTP | Août 2023 – Juin 2026</span><br />
            Déploiements automatisés en environnements conteneurisés · Wizard d'installation des logiciels développeurs ·
            Outil d'analyse d'obsolescence (conformité DORA) · Monitoring activité contributeurs Jahia · Gestion de tickets
            <br /><br />
            <strong>Emploi — Expériences commerciales</strong><br />
            <span style={{color:'#316ac5'}}>Cause à effet | Mars 2022 – Novembre 2022</span><br />
            Démarchage de supports associatifs (Croix Rouge, Ligue contre le Cancer…)<br /><br />
            <span style={{color:'#316ac5'}}>Gelazur | Juillet 2021 – Février 2022</span><br />
            Gestion du portefeuille clients industriels : prospection, développement produits, négociation tarifaire, gestion logistique
            <br /><br />
            <strong>Recherche — Réponse de la tomate contre des herbivores médiée par mycorhizes</strong><br />
            <span style={{color:'#316ac5'}}>CIRAD | Janvier – Juin 2021</span><br />
            Étude du potentiel biocontrôle des mycorhizes inoculées sur tomate contre différents arthropodes
          </Project>

          <Project title="🎓 Formations">
            <strong>M2 MIAGE MBDS</strong> — Université Côte d'Azur<br />
            <span style={{color:'#316ac5'}}>Sept 2025 – Juin 2026</span><br />
            Systèmes distribués · AWS · React / Spring Boot · IoT<br /><br />

            <strong>Master 1 Concepteur Développeur</strong> — OpenClassrooms<br />
            <span style={{color:'#316ac5'}}>Août 2023 – Août 2025</span><br />
            Python · Scripting · APIs · POO · Green code · Alternance<br /><br />

            <strong>POE DevOps</strong> — IB Group<br />
            <span style={{color:'#316ac5'}}>Nov 2022 – Fév 2023</span><br />
            Agile · Livraison continue · Automation · Conteneurs · Cloud · Linux<br /><br />

            <strong>MSc Biocontrol Solutions for Plant Health</strong> — Mention très bien<br />
            <span style={{color:'#316ac5'}}>Université Côte d'Azur, INRAE | Sept 2019 – Juin 2021</span>
          </Project>

          <Project title="🛠 Compétences">
            <strong>DevOps :</strong> Conteneurisation · Automation · CI/CD · Cloud AWS · Monitoring (ELK)<br />
            <strong>Back-end :</strong> Python · Django · POO · Admin système<br />
            <strong>Front-end :</strong> HTML/CSS · Bootstrap · JavaScript · React<br />
            <strong>Data :</strong> Analyse statistique (R) · Web-scraping · Office
          </Project>

          <Project title="🏅 Certifications">
            DASA — <strong>DevOps Fundamentals</strong> · Permis de conduire
          </Project>

          <Project title="🌍 Langues & loisirs">
            Français Natif · Anglais Bilingue · Python Opérationnel<br />
            🎵 Musicien · 🏀 Basket · 🥾 Randonnée · 🍳 Cuisine
          </Project>
        </>
      ) : (
        <>
          <Project title="💼 Work Experience">
            <strong>Work-study — Full-Stack Developer</strong><br />
            <span style={{color:'#316ac5'}}>PRO BTP | August 2023 – June 2026</span><br />
            Automated deployments in containerized environments · Developer software installation wizard ·
            Obsolescence analysis tool (DORA compliance) · Jahia contributor activity monitoring · Ticket management
            <br /><br />
            <strong>Sales Experiences</strong><br />
            <span style={{color:'#316ac5'}}>Cause à effet | March 2022 – November 2022</span><br />
            Face-to-face contracting of associative supports (Red Cross, National League against Cancer…)<br /><br />
            <span style={{color:'#316ac5'}}>Gelazur | July 2021 – February 2022</span><br />
            Industrial customer portfolio management: prospecting, new product development, price negotiation, logistics
            <br /><br />
            <strong>Research — Mycorrhiza-mediated tomato response against herbivors</strong><br />
            <span style={{color:'#316ac5'}}>CIRAD | January – June 2021</span><br />
            Biocontrol potential study of mycorrhiza inoculated on tomato against various arthropods
          </Project>

          <Project title="🎓 Education">
            <strong>M2 MIAGE MBDS</strong> — Université Côte d'Azur<br />
            <span style={{color:'#316ac5'}}>Sept 2025 – June 2026</span><br />
            Distributed systems · AWS · React / Spring Boot · IoT<br /><br />

            <strong>Master 1 — Developer / Designer</strong> — OpenClassrooms<br />
            <span style={{color:'#316ac5'}}>August 2023 – August 2025</span><br />
            Python · Scripting · APIs · OOP · Green code · Work-study<br /><br />

            <strong>POE DevOps</strong> — IB Group<br />
            <span style={{color:'#316ac5'}}>Nov 2022 – Feb 2023</span><br />
            Agile · Continuous delivery · Automation · Containers · Cloud · Linux<br /><br />

            <strong>MSc Biocontrol Solutions for Plant Health</strong> — With honours<br />
            <span style={{color:'#316ac5'}}>Université Côte d'Azur, INRAE | Sept 2019 – June 2021</span>
          </Project>

          <Project title="🛠 Skills">
            <strong>DevOps:</strong> Containerisation · Automation · CI/CD · Cloud AWS · Monitoring (ELK)<br />
            <strong>Back-end:</strong> Python · Django · OOP · System admin<br />
            <strong>Front-end:</strong> HTML/CSS · Bootstrap · JavaScript · React<br />
            <strong>Data:</strong> Statistical analysis (R) · Web-scraping · Office
          </Project>

          <Project title="🏅 Certifications">
            DASA — <strong>DevOps Fundamentals</strong> · Driving license
          </Project>

          <Project title="🌍 Languages & hobbies">
            French Native · English Bilingual · Python Operational<br />
            🎵 Musician · 🏀 Basketball · 🥾 Hiking · 🍳 Cooking
          </Project>
        </>
      )}
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
