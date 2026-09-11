import { useEffect, useState } from 'react'
import mark from '../assets/brocollico-mark.png'
import discoB from '../assets/disco-b.png'

const SOUNDCLOUD = 'https://soundcloud.com/brocollico'
const links = [
  { number: '01', label: 'SOUNDCLOUD', href: SOUNDCLOUD, main: true },
  { number: '02', label: 'INSTAGRAM', href: 'https://www.instagram.com/' },
  { number: '03', label: 'CONTATO / SHOWS', href: 'mailto:contato@brocollico.com' },
]
const tracks = [
  ['01', 'LEVITANDO', 'COOLPE'],
  ['04', 'SUBTERRÂNEO', 'BEGA & COOLPE'],
  ['08', 'ME VIU NO BAILE', 'BEGA, COOLPE & LARSEN'],
  ['11', 'DESLIGA O FLASH', 'COOLPE & ROOJI'],
]

function OutboundLink({ href, className, children, ...props }) {
  const external = href.startsWith('http')
  return <a href={href} className={className} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})} {...props}>{children}</a>
}

export default function App() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return <>
    <div className="noise" aria-hidden="true" />
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`} id="topo">
      <a className="header-logo" href="#inicio" aria-label="BROCOLLICO — início">BROCOLLICO<span>®</span></a>
      <nav aria-label="Navegação principal"><a href="#links">LINKS</a><a href="#sons">SONS</a><a href="#galeria">GALERIA</a></nav>
    </header>

    <main>
      <section className="hero" id="inicio" aria-labelledby="hero-title">
        <div className="hero-stamp">EST. SUBSOLO <span>•</span> BRASIL</div>
        <img className="hero-mark" src={mark} alt="Marca em stencil da Brocollico" />
        <div className="hero-copy"><p className="eyebrow">RAP DE RUA / SEM FLASH</p><h1 id="hero-title">BROCOLLICO</h1><p className="hero-line">FUMAÇA SOBE. O SOM FICA.</p></div>
        <a className="scroll-cue" href="#links" aria-label="Ir para os links">DESCE <i /></a>
      </section>

      <section className="section links-section" id="links" aria-labelledby="links-title">
        <div className="section-heading"><p className="section-index">01 / ONDE COLAR</p><h2 id="links-title">SEM<br />AT<span>A</span>LHO.</h2></div>
        <div className="link-stack">
          {links.map(({ number, label, href, main }) => <OutboundLink className={`street-link ${main ? 'link-main' : ''}`} href={href} key={number}><span>{number}</span><strong>{label}</strong><b aria-hidden="true">↗</b></OutboundLink>)}
        </div>
        <p className="small-note">Links vivos, frequência variável.</p>
      </section>

      <section className="section sounds-section" id="sons" aria-labelledby="sounds-title">
        <div className="record-tag">LADO B <span>///</span> SEMPRE</div>
        <div className="section-heading sound-heading"><p className="section-index">02 / AMOSTRAS</p><h2 id="sounds-title">APER<span>TA</span><br />O PLAY.</h2></div>
        <div className="release-layout">
          <div className="cover-wrap"><img src={discoB} alt="Arte verde do Disco B, da Brocollico" /><div className="cover-label">DISCO B<br /><span>2024</span></div></div>
          <div className="track-list" aria-label="Faixas selecionadas">
            {tracks.map(([number, title, featuring]) => <OutboundLink className="track" href={SOUNDCLOUD} key={number} aria-label={`Ouvir ${title} no SoundCloud`}><span className="track-number">{number}</span><span className="track-name">{title}</span><span className="track-meta">{featuring}</span><span className="track-play" aria-hidden="true">▶</span></OutboundLink>)}
          </div>
        </div>
        <OutboundLink className="all-tracks" href={SOUNDCLOUD}>OUVIR TODAS NO SOUNDCLOUD <span>↗</span></OutboundLink>
      </section>

      <section className="section gallery-section" id="galeria" aria-labelledby="gallery-title">
        <div className="section-heading"><p className="section-index">03 / ARQUIVO</p><h2 id="gallery-title">DISCO<span>GRAFIA.</span></h2></div>
        <div className="gallery-grid">
          <figure className="gallery-item gallery-mark"><img src={mark} alt="Selo da Brocollico sobre textura granulada" /><figcaption>MARCA / 01</figcaption></figure>
          <figure className="gallery-item gallery-album"><img src={discoB} alt="Tracklist do Disco B em verde" /><figcaption>DISCO B / 02</figcaption></figure>
          <div className="gallery-item manifesto" aria-label="Manifesto Brocollico"><span>SEM<br />POSSE.<br />SÓ<br />RITMO.</span><small>SP / BRASIL / 2024</small></div>
        </div>
      </section>
    </main>

    <footer><a href="#inicio">BROCOLLICO<span>®</span></a><p>O BARULHO É NOSSO.</p><p>© {new Date().getFullYear()}</p></footer>
  </>
}
