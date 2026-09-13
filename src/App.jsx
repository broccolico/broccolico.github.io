import { useEffect, useRef, useState } from 'react'
import mark from '../assets/broccolico-mark.png'
import discoCover from '../assets/WhatsApp Image 2026-09-11 at 13.46.17.jpeg'
import dolpeBeatNo1 from '../assets/09-09-beat-g-minor.mp3'
import dolpeBeatNo5 from '../assets/22-08 beat 5.mp3'
import dolpeBeatNo10 from '../assets/30-08 BEAT 10.mp3'
import dolpeBeatEbMinor from '../assets/07-08 beat Eb Minor.mp3'
import dolpeBeatNo2CSharpMinor from '../assets/13-06 beat 2 Csharp Minor.mp3'
import dolpeBeatBMinor from '../assets/27-06 beat B Minor.mp3'
import dolpeBeatNo4CSharpMinor from '../assets/16-08 BEAT 4 Csharp Minor.mp3'
import dolpeBeatBbMinor from '../assets/28-06 beat Bb Minor.mp3'
import dolpeBeatFMinor from '../assets/11-08 BEAT F Minor.mp3'
import dolpeBeatNo2BMinor from '../assets/02-08 beat 2 B Minor.mp3'
import dolpeBeatAMinor from '../assets/12-06 beat A Minor.mp3'

const SPOTIFY_ARTIST_URL = 'https://open.spotify.com/intl-pt/artist/5YDfo3roAlk7dhvOnNhICd?si=VCp5zmZKQWeRlq0pK_jdog'
const FEATURED_ALBUM_URL = 'https://open.spotify.com/intl-pt/album/0YfaYpdPCP02wrkI6mShdC'
const FEATURED_YOUTUBE_URL = 'https://www.youtube.com/watch?v=jKMhRhrmNLA&list=OLAK5uy_mr0JPBvrZ64hZEfSswwTncynXhmPihc7o'
const YOUTUBE_URL = 'https://www.youtube.com/watch?v=BRwSt_PLAss&list=PLM0SRGcOWtegiiPzWlJUmAjPnbE6bUoG2'
const releaseIds = ['0YfaYpdPCP02wrkI6mShdC','6waxAD6jAFWKOWnNKSzyRR','36PP4oGai0dG3FIYwktztD','3XM09swHSuGqAdK1NYIgB0','4QrWj3L9sT6mMnHWiNfhtA','05eJWrLT4x6uHbtCTAZ9jp','5yM8MXnmLIircYQEeYDS21','3udyEGvRkYErjxLCUKiZov','09cgvP9d1TnIbEAGSlfez9','0ld7kRLqgB728gSzhQLnOs','1JE5vo8F7mokWJMY2Vnv8b','7elfYtB38oVusRDisZmhhW','62BVR0afdevkqP75wW2u8k','2g0YN8ObthoEwhws6jdFwZ','6egpAfGjyWOjO863ZEepki','1mrtRVdOxcMmaPdDGh7pby','29rAd6zBGFFCV4WTWMvh8E','2qAZIRxBlKvQuygTdJPKha','2PBjtHjI4sMoSRXLKA4w08','3J5EOpy9xiLyY0tDyJVkjw','1pyoGfa9i3hTWpCj4HpyuL','531Qr2UNGDMwQEar1HgSpm','2MiTw6q1aJGWk0X3nu0tHR','7uUrrSJavUoawPsDsjhfxw','08k4JC2ukanEZ21qwrCw35']
const beatTracks = [
  [dolpeBeatNo5, 'Dolpe: Beat, No. 5'], [dolpeBeatNo1, 'Dolpe: Beat, No. 1 in G# Minor'], [dolpeBeatNo10, 'Dolpe: Beat, No. 10'], [dolpeBeatEbMinor, 'Dolpe: Beat in E♭ Minor'], [dolpeBeatNo2CSharpMinor, 'Dolpe: Beat, No. 2 in C# Minor'], [dolpeBeatBMinor, 'Dolpe: Beat in B Minor'], [dolpeBeatNo4CSharpMinor, 'Dolpe: Beat, No. 4 in C# Minor'], [dolpeBeatBbMinor, 'Dolpe: Beat in B♭ Minor'], [dolpeBeatFMinor, 'Dolpe: Beat in F Minor'], [dolpeBeatNo2BMinor, 'Dolpe: Beat, No. 2 in B Minor'], [dolpeBeatAMinor, 'Dolpe: Beat in A Minor'],
].map(([src, label]) => ({ src, label, artist: 'BROCCOLI CO.' }))
const links = [
  ['01', 'SPOTIFY', SPOTIFY_ARTIST_URL], ['02', 'YOUTUBE', 'https://www.youtube.com/@BROCCOLICO47'], ['03', 'INSTAGRAM', 'https://www.instagram.com/broccoli.comp'],
]
function OutboundLink({ href, className, children, ...props }) { return <a href={href} className={className} target="_blank" rel="noreferrer" {...props}>{children}</a> }
function formatTime(seconds) { if (!Number.isFinite(seconds)) return '00:00'; return `${Math.floor(seconds / 60).toString().padStart(2, '0')}:${Math.floor(seconds % 60).toString().padStart(2, '0')}` }

export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const [activeNav, setActiveNav] = useState('lancamento')
  const [beatPlaying, setBeatPlaying] = useState(false)
  const [beatIndex, setBeatIndex] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(.8)
  const [releaseFlipped, setReleaseFlipped] = useState(false)
  const carouselRef = useRef(null)
  const beatAudioRef = useRef(null)
  const currentBeat = beatTracks[beatIndex]

  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 48); onScroll(); window.addEventListener('scroll', onScroll, { passive: true }); return () => window.removeEventListener('scroll', onScroll) }, [])
  useEffect(() => {
    const ids = ['lancamento', 'discografia', 'video', 'links', 'sobre']
    const update = () => { const line = window.innerHeight * .38; const id = ids.find((item) => { const section = document.getElementById(item); if (!section) return false; const { top, bottom } = section.getBoundingClientRect(); return top <= line && bottom > line }); if (id) setActiveNav(id) }
    update(); window.addEventListener('scroll', update, { passive: true }); window.addEventListener('resize', update); return () => { window.removeEventListener('scroll', update); window.removeEventListener('resize', update) }
  }, [])
  useEffect(() => { if (beatAudioRef.current) beatAudioRef.current.volume = volume }, [volume])
  useEffect(() => { if (beatPlaying) beatAudioRef.current?.play().catch(() => setBeatPlaying(false)) }, [beatIndex, beatPlaying])
  useEffect(() => { const start = (event) => { if (!event?.target?.closest?.('.beat-player')) beatAudioRef.current?.play().catch(() => setBeatPlaying(false)) }; window.addEventListener('pointerdown', start, { once: true }); window.addEventListener('keydown', start, { once: true }); return () => { window.removeEventListener('pointerdown', start); window.removeEventListener('keydown', start) } }, [])
  const toggleBeat = async () => { const audio = beatAudioRef.current; if (!audio) return; if (audio.paused) { try { await audio.play() } catch { setBeatPlaying(false) } } else audio.pause() }
  const changeBeat = (direction) => { setCurrentTime(0); setDuration(0); setBeatPlaying(true); setBeatIndex((index) => (index + direction + beatTracks.length) % beatTracks.length) }
  const seek = (event) => { const time = Number(event.target.value); if (beatAudioRef.current && Number.isFinite(time)) { beatAudioRef.current.currentTime = time; setCurrentTime(time) } }
  const scrollDiscography = (direction) => carouselRef.current?.scrollBy({ left: direction * carouselRef.current.clientWidth * .82, behavior: 'smooth' })
  const toggleReleaseDetails = () => setReleaseFlipped((flipped) => !flipped)
  const handleReleaseKeyDown = (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); toggleReleaseDetails() } }

  return <>
    <div className="noise" aria-hidden="true" />
    <audio ref={beatAudioRef} src={currentBeat.src} preload="metadata" onPlay={() => setBeatPlaying(true)} onPause={() => setBeatPlaying(false)} onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)} onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)} onDurationChange={(event) => setDuration(event.currentTarget.duration)} onEnded={() => changeBeat(1)} />
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`} id="topo"><a className="header-logo" href="#inicio" aria-label="BROCCOLI CO. — início">BROCCOLI CO<span>®</span></a><nav aria-label="Navegação principal">{[['lancamento','LANÇAMENTO'],['discografia','DISCOGRAFIA'],['video','VÍDEO'],['links','LINKS'],['sobre','SOBRE']].map(([id,label]) => <a className={activeNav === id ? 'is-active' : undefined} href={`#${id}`} key={id}>{label}</a>)}</nav></header>
    <main>
      <section className="hero brand-hero" id="inicio" aria-labelledby="hero-title">
        <img className="hero-mark" src={mark} alt="Marca em stencil da BROCCOLI CO." />
        <div className="hero-copy"><p className="eyebrow hero-pill hero-pill-top">UNDERGROUND DE ORIGEM</p><h1 id="hero-title">BROCCOLI CO.</h1><p className="hero-line hero-pill hero-pill-bottom">SELO INDEPENDENTE CRIATIVO</p></div>
        <a className="scroll-cue" href="#lancamento">DESCE</a>
      </section>
      <section className="hero release-hero" id="lancamento" aria-labelledby="release-title">
        <img className="hero-mark" src={mark} alt="" aria-hidden="true" /><p className="hero-stamp">BROCCOLI CO. <span>INDEPENDENTE</span></p>
        <div className="release-intro"><p className="eyebrow hero-pill hero-pill-top">01 / NOVO LANÇAMENTO</p><p className="release-project">BROCCOLI CO. APRESENTA</p><h1 id="release-title">DISCO <span>B.</span></h1><p className="release-description">Um arquivo de beats para a cidade depois da meia-noite. Volume novo, ruído de fundo e graves sem atalho.</p><div className="release-actions"><OutboundLink className="listen-cta" href={FEATURED_ALBUM_URL}>OUVIR O ÁLBUM <span>↗</span></OutboundLink><OutboundLink className="platform-link" href={FEATURED_ALBUM_URL}>SPOTIFY</OutboundLink><OutboundLink className="platform-link" href={FEATURED_YOUTUBE_URL}>YOUTUBE</OutboundLink></div></div>
        <article className={`hero-cover-wrap release-flip${releaseFlipped ? ' is-flipped' : ''}`} role="button" tabIndex="0" aria-pressed={releaseFlipped} aria-label={releaseFlipped ? 'Fechar texto dos discos' : 'Ler texto dos discos'} onClick={toggleReleaseDetails} onKeyDown={handleReleaseKeyDown}>
          <div className="release-flip-inner">
            <div className="release-card-face release-card-front"><img src={discoCover} alt="Capa do álbum Disco B da BROCCOLI CO." /><p>CAT. 001 // 2024</p><span>CLIQUE P/ VIRAR ↻</span></div>
            <div className="release-card-face release-card-back"><div className="release-back-copy"><h3>DISCO <span>A</span></h3><p>O Disco A nasceu dentro de um quarto que engole o tempo. Madrugadas, dias, lembranças — tudo se mistura até virar batida. É o lado mais íntimo do Dolpe Beats Vol. 1: melancolia, piano, respiração pesada.</p><p>Não é sobre festa nem sobre vitrine. É sobre andar com fantasmas, escrever pra não sumir, transformar silêncio em som.</p><p>Cada beat é cicatriz, cada acorde é confissão. E mesmo assim, no meio da dor, há vida. Porque se o quarto foi prisão, também foi abrigo. E se essa música nasceu da nossa melancolia, ela também pode ser o refúgio de quem escuta.</p><p>O Disco A não é música triste. É música feita daquilo que a tristeza deixou: memória, confissão, silêncio transformado em batida. É o lado que não disfarça nada, mas prova que até no vazio pode nascer fôlego.</p><h3>DISCO <span>B</span></h3><p>O Disco B é o outro lado do espelho. Se o Disco A mostrou a melancolia fria, íntima e calma do universo BROCCOLI, aqui a luz apaga de vez e sobra o caos: impulsos, pressões internas, intensidade, raiva, desejo e aquela energia elétrica do quarto onde tudo nasceu.</p><p>O Disco B é mais agressivo, mais caótico e mais direto. A estética verde aparece como marca do desconforto, da sujeira e da eletricidade emocional de cada faixa. Aqui, a Broccoli Co. explorou outras cores dentro da mesma identidade: pianos menores, melodias introspectivas, mas agora com peso, distorção, ataque e aquela sensação de “tá tudo na beira de explodir”.</p><p>Todas as vozes, ideias e performances carregam a química e a história real do coletivo: Dolpe, Lar$en, Bega, Matteo, Rodji e Kinhu. Esse disco fecha o primeiro volume do projeto — e fecha com força, mostrando que a Broccoli nunca faz nada pela metade.</p><p><strong>Dolpe Beats — Volume 1 não é só um álbum.</strong><br />É uma fase inteira registrada.<br />É o fim de um ciclo e o começo de outro.</p><span className="release-back-hint">CLIQUE P/ VOLTAR ↻</span></div></div>
          </div>
        </article><a className="scroll-cue" href="#discografia">VER ARQUIVO ↓</a>
      </section>
      <section className="section discography-section" id="discografia" aria-labelledby="discography-title"><div className="discography-header"><div className="section-heading"><p className="section-index">02 / ARQUIVO SONORO</p><h2 id="discography-title">DISCO<span>GRAFIA.</span></h2></div><div className="carousel-controls" aria-label="Controles da discografia"><button type="button" onClick={() => scrollDiscography(-1)} aria-label="Ver lançamentos anteriores">←</button><button type="button" onClick={() => scrollDiscography(1)} aria-label="Ver próximos lançamentos">→</button></div></div><div className="album-carousel" ref={carouselRef} aria-label="Discografia no Spotify">{releaseIds.map((id,index) => <article className="release-entry" key={id}><div className="release-meta"><span>{String(index + 1).padStart(2,'0')}</span><p><strong>{index === 0 ? 'DISCO B' : `ARQUIVO ${String(index + 1).padStart(2,'0')}`}</strong><small>BROCCOLI CO. / 2024</small></p></div><iframe className="spotify-embed album-embed" title={`Lançamento ${index + 1} da BROCCOLI CO. no Spotify`} src={`https://open.spotify.com/embed/album/${id}?utm_source=generator`} width="100%" height="352" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" /></article>)}</div></section>
      <section className="section video-section" id="video" aria-labelledby="video-title"><div className="video-heading"><p className="section-index">03 / VÍDEO</p><h2 id="video-title">ASSISTA.</h2><p>IMAGEM EM MOVIMENTO // SEM FILTRO</p></div><div className="video-frame"><iframe src="https://www.youtube-nocookie.com/embed/BRwSt_PLAss?list=PLM0SRGcOWtegiiPzWlJUmAjPnbE6bUoG2" title="Vídeo da BROCCOLI CO. no YouTube" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div><OutboundLink className="video-source" href={YOUTUBE_URL}>ABRIR NO YOUTUBE ↗</OutboundLink></section>
      <section className="section links-section" id="links" aria-labelledby="links-title"><div className="section-heading"><p className="section-index">04 / ONDE COLAR</p><h2 id="links-title">SEM<br />AT<span>A</span>LHO.</h2></div><div className="link-stack">{links.map(([number,label,href]) => <OutboundLink className="street-link" href={href} key={number}><span>{number}</span><strong>{label}</strong><b aria-hidden="true">↗</b></OutboundLink>)}</div><p className="small-note">Links vivos, frequência variável.</p></section>
      <section className="section about-section" id="sobre" aria-labelledby="about-title"><div className="section-heading"><p className="section-index">05 / QUEM SOMOS</p><h2 id="about-title">DO<br />SUB<span>SOLO.</span></h2></div><p className="about-copy">A BROCCOLI CO. é um selo independente brasileiro de trap, beats e música underground. Com lançamentos como <em>Disco B</em>, o selo reúne artistas, produtores e a cultura independente do Brasil.</p></section>
    </main>
    <footer><a href="#lancamento">BROCCOLI CO<span>®</span></a><p>O BARULHO É NOSSO.</p><p>© {new Date().getFullYear()}</p></footer>
    <div className="beat-player" aria-label="Player de beats"><div className="beat-controls"><button type="button" onClick={() => changeBeat(-1)} aria-label="Faixa anterior">↶</button><button className="beat-play" type="button" onClick={toggleBeat} aria-label={beatPlaying ? 'Pausar beat' : 'Tocar beat'}>{beatPlaying ? 'Ⅱ' : '▶'}</button><button type="button" onClick={() => changeBeat(1)} aria-label="Próxima faixa">↷</button></div><div className="beat-info"><p><b>OUVINDO AGORA //</b> {currentBeat.label} <span>— {currentBeat.artist}</span></p><div className="beat-progress"><time>{formatTime(currentTime)}</time><input type="range" min="0" max={duration || 0} value={Math.min(currentTime,duration || 0)} step="0.1" onChange={seek} aria-label="Progresso da faixa" style={{ '--progress': `${duration ? (currentTime / duration) * 100 : 0}%` }} /><time>{formatTime(duration)}</time></div></div><label className="volume-control"><span>VOL</span><input type="range" min="0" max="1" step="0.01" value={volume} onChange={(event) => setVolume(Number(event.target.value))} aria-label="Volume" style={{ '--progress': `${volume * 100}%` }} /></label></div>
  </>
}
