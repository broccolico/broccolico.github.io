import { useEffect, useRef, useState } from 'react'
import mark from '../assets/broccolico-mark.png'
import discoB from '../assets/disco-b.png'
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

const beatTracks = [
  {
    src: dolpeBeatNo1,
    label: 'Dolpe: Beat, No. 1 in G# Minor',
  },
  {
    src: dolpeBeatNo5,
    label: 'Dolpe: Beat, No. 5',
  },
  {
    src: dolpeBeatNo10,
    label: 'Dolpe: Beat, No. 10',
  },
  {
    src: dolpeBeatEbMinor,
    label: 'Dolpe: Beat in E♭ Minor',
  },
  {
    src: dolpeBeatNo2CSharpMinor,
    label: 'Dolpe: Beat, No. 2 in C# Minor',
  },
  {
    src: dolpeBeatBMinor,
    label: 'Dolpe: Beat in B Minor',
  },
  {
    src: dolpeBeatNo4CSharpMinor,
    label: 'Dolpe: Beat, No. 4 in C# Minor',
  },
  {
    src: dolpeBeatBbMinor,
    label: 'Dolpe: Beat in B♭ Minor',
  },
  {
    src: dolpeBeatFMinor,
    label: 'Dolpe: Beat in F Minor',
  },
  {
    src: dolpeBeatNo2BMinor,
    label: 'Dolpe: Beat, No. 2 in B Minor',
  },
  {
    src: dolpeBeatAMinor,
    label: 'Dolpe: Beat in A Minor',
  },
]

const SPOTIFY_ARTIST_URL = 'https://open.spotify.com/intl-pt/artist/5YDfo3roAlk7dhvOnNhICd?si=VCp5zmZKQWeRlq0pK_jdog'
const links = [
  { number: '01', label: 'SPOTIFY', href: SPOTIFY_ARTIST_URL },
  { number: '02', label: 'INSTAGRAM', href: 'https://www.instagram.com/broccoli.comp' },
  { number: '03', label: 'YOUTUBE', href: 'https://www.youtube.com/@BROCCOLICO47' },
]
const releases = [
  '0YfaYpdPCP02wrkI6mShdC', '6waxAD6jAFWKOWnNKSzyRR', '36PP4oGai0dG3FIYwktztD',
  '3XM09swHSuGqAdK1NYIgB0', '4QrWj3L9sT6mMnHWiNfhtA', '05eJWrLT4x6uHbtCTAZ9jp',
  '5yM8MXnmLIircYQEeYDS21', '3udyEGvRkYErjxLCUKiZov', '09cgvP9d1TnIbEAGSlfez9',
  '0ld7kRLqgB728gSzhQLnOs', '1JE5vo8F7mokWJMY2Vnv8b', '7elfYtB38oVusRDisZmhhW',
  '62BVR0afdevkqP75wW2u8k', '2g0YN8ObthoEwhws6jdFwZ', '6egpAfGjyWOjO863ZEepki',
  '1mrtRVdOxcMmaPdDGh7pby', '29rAd6zBGFFCV4WTWMvh8E', '2qAZIRxBlKvQuygTdJPKha',
  '2PBjtHjI4sMoSRXLKA4w08', '3J5EOpy9xiLyY0tDyJVkjw', '1pyoGfa9i3hTWpCj4HpyuL',
  '531Qr2UNGDMwQEar1HgSpm', '2MiTw6q1aJGWk0X3nu0tHR', '7uUrrSJavUoawPsDsjhfxw',
  '08k4JC2ukanEZ21qwrCw35',
]
let consoleSignatureShown = false

function OutboundLink({ href, className, children, ...props }) {
  const external = href.startsWith('http')
  return <a href={href} className={className} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})} {...props}>{children}</a>
}

export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const [beatPlaying, setBeatPlaying] = useState(false)
  const [beatIndex, setBeatIndex] = useState(0)
  const [footerOffset, setFooterOffset] = useState(0)
  const carouselRef = useRef(null)
  const beatAudioRef = useRef(null)
  const footerRef = useRef(null)
  const currentBeat = beatTracks[beatIndex] ?? null

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!beatPlaying) return
    beatAudioRef.current?.play().catch(() => setBeatPlaying(false))
  }, [beatIndex, beatPlaying])

  useEffect(() => {
    const startBeat = (event) => {
      if (event?.target?.closest?.('.beat-player')) return
      beatAudioRef.current?.play().catch(() => setBeatPlaying(false))
    }
    startBeat()
    window.addEventListener('pointerdown', startBeat, { once: true })
    window.addEventListener('keydown', startBeat, { once: true })
    return () => {
      window.removeEventListener('pointerdown', startBeat)
      window.removeEventListener('keydown', startBeat)
    }
  }, [])

  useEffect(() => {
    let animationFrame
    const updateFooterOffset = () => {
      if (animationFrame) return
      animationFrame = window.requestAnimationFrame(() => {
        const footerTop = footerRef.current?.getBoundingClientRect().top ?? window.innerHeight
        setFooterOffset(Math.max(0, Math.round(window.innerHeight - footerTop)))
        animationFrame = undefined
      })
    }
    updateFooterOffset()
    window.addEventListener('scroll', updateFooterOffset, { passive: true })
    window.addEventListener('resize', updateFooterOffset)
    return () => {
      window.removeEventListener('scroll', updateFooterOffset)
      window.removeEventListener('resize', updateFooterOffset)
      if (animationFrame) window.cancelAnimationFrame(animationFrame)
    }
  }, [])

  useEffect(() => {
    if (consoleSignatureShown) return
    consoleSignatureShown = true
    console.info(`%c
                    SIM, FUI EU, RICARDO LOPES, QUE CRIEI ESTE SITE.
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣀⣤⣴⣶⣶⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣶⣦⣤⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⣴⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣦⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣴⣾⣻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣦⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢀⣴⣾⣻⣷⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣤⡀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⢀⣴⣿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢠⣾⣿⣻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠛⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡀⠀⠀⠀⠀⠀
⠀⠀⠀⢰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣇⠘⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡀⠀⠀⠀⠀
⠀⠀⢠⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣍⠙⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣇⠸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣇⠀⠀⠀⠀
⠀⠀⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡄⠹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡄⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀
⠀⢠⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣆⠙⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⢿⣿⡇⢸⣿⡟⢙⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀
⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡆⢹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⠈⢿⣿⣾⡟⢠⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀
⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⢁⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⢸⣿⣿⠇⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⡀⠀⠀
⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠏⣠⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⠀⣿⣿⡀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡄⠀
⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⢰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⣿⣿⡇⠹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀
⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⣫⣽⣿⣿⣿⡟⢸⣿⣿⣿⣶⣿⡟⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠇⠀
⠀⠘⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡄⢹⣿⣿⣿⣿⣿⣿⠿⡿⠿⠿⢟⣛⣯⣥⣶⣷⣮⡛⢿⣿⣿⣿⣿⣿⣿⢻⣿⣿⠟⣊⣙⠿⣿⣿⣿⣿⣿⣿⡿⠋⠀⠀
⠀⠀⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⣿⣿⣿⣿⣿⣿⢋⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⢻⣿⣿⣿⣿⢧⠟⣫⣶⣿⣿⣿⣿⣶⣦⣭⢡⣾⡿⠁⠀⠀⠀
⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣮⣽⣛⣛⣿⡏⢚⣯⣭⣴⡀⠀⠀⠀⠀⠀⣦⣭⡅⣿⣿⣿⣿⡠⣾⠿⢟⣛⡛⠛⠛⠛⠛⠻⢧⢻⡇⠀⠀⠀⠀
⠀⠀⠀⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⣛⣿⣿⣷⠻⣿⣿⣿⣷⣮⣄⣈⣤⣾⣿⡟⣼⣿⣿⣿⣿⣷⡺⣿⣿⣿⣧⠀⡀⠂⠐⣸⢇⣖⡂⠀⠀⠀⠀
⠀⠀⠀⠈⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⢻⣿⣿⣿⣿⣷⣾⣿⣿⣿⣿⣷⣍⡻⢿⣿⣿⣿⣿⣿⠟⣫⢞⣿⣿⣿⣿⣿⣿⣿⣮⠻⣿⣿⣿⣶⣶⡿⢫⣾⣿⣿⡄⠀⠀⠀
⠀⠀⠀⠀⠈⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⢁⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣶⣷⣶⣶⢟⣵⣿⣿⣿⣿⣿⣿⣿⣿⣿⣇⠩⣭⣭⣭⣵⣾⣿⣿⣿⣿⣇⠀⠀⠀
⠀⠀⠀⠀⠀⠈⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠇⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⣛⣭⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⣶⣭⣿⣿⣿⣿⣿⣿⣿⣿⣿⡄⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠙⢿⣿⣿⣿⣿⣿⣿⣿⣿⠀⢼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢇⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠻⣿⣿⣿⣿⣿⣿⡇⠸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠃⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠛⠿⣿⣿⣿⡄⠹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⢫⣽⣿⣿⣿⣿⣿⣿⣿⣿⣿⠸⢿⣿⣿⣿⣿⣿⣿⣿⠿⠋⠁⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣨⣦⡈⠛⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⣵⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡌⣷⢹⣿⣿⣿⣿⠟⠁⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⣿⣿⣿⡆⢠⣈⠙⠛⠿⠿⠿⠿⢻⣿⣿⣿⣿⣿⠟⡆⢿⣟⢤⣍⡻⣿⣿⣿⣿⣿⣿⣿⡇⡏⣿⣿⣿⡟⠁⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣿⣿⣿⣿⠁⣾⣿⣿⣿⣶⣶⣶⡆⢸⣿⣿⣿⣿⡟⣾⣿⣼⣿⣦⣿⣿⣎⠻⣿⣿⣿⣿⣿⢇⣿⡸⣿⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣿⣿⣿⣿⣿⠀⣿⣿⣿⣿⣿⣿⣿⡇⢸⣿⣿⣿⡿⣼⣿⣿⣿⣿⣿⣿⣿⣿⣷⣌⣛⣛⣩⣵⣿⣿⣷⢿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣾⣿⣿⣿⣿⣿⠀⣿⣿⣿⣿⣿⣿⣿⣿⠀⣿⣿⣿⢱⣿⣿⣿⣿⣿⣿⣿⣿⠿⠿⢿⣿⠿⠿⣿⣿⣿⣿⢸⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⣿⣿⣿⣿⣿⡏⠀⣿⣿⣿⣿⣿⣿⣿⣿⣤⣿⣿⠏⣿⣿⣿⣿⣿⣿⡿⣫⣵⣾⣿⣶⣦⣾⣷⣌⢻⣿⣿⣾⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣴⣿⣿⣿⣿⣿⣿⡇⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣸⣿⣿⣿⣿⡿⣫⣾⣿⣿⠟⢩⢿⣿⡿⠋⣿⣆⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣴⣿⣿⣿⣿⣿⣿⣿⡇⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣄⢭⣽⣭⣴⣾⣮⣬⣥⣶⣷⣶⠆⣾⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣴⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⣝⠿⣿⣿⣿⣿⣿⣿⡿⢋⣾⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣮⣝⣛⣛⣋⣥⣾⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠻⣿⣿⣿⣿⣿⣿⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣟⠻⢿⣿⠟⣻⣿⣿⣿⣿⣿⣿⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠛⠿⣿⣿⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠀⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣉⣉⣉⡉⠛⠻⢿⣿⣿⣿⣿⣷⣄⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡀⢻⣿⣿⣿⣿⣿⣦⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠻⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⢸⣿⣿⣿⣿⣿⣿⡆⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠻⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⢸⣿⣿⣿⣿⣿⠟⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠛⠻⠿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠁⠈⠉⠉⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠉⠛⠉⠉⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀

SELO INDEPENDENTE CRIATIVO`, 'color: #72ff24; font: 700 12px/1.1 monospace;')
  }, [])

  const scrollDiscography = (direction) => {
    const carousel = carouselRef.current
    if (carousel) carousel.scrollBy({ left: direction * carousel.clientWidth * .82, behavior: 'smooth' })
  }

  const toggleBeat = async () => {
    const audio = beatAudioRef.current
    if (!audio) return
    if (audio.paused) {
      try { await audio.play() } catch { setBeatPlaying(false) }
    } else audio.pause()
  }

  const changeBeat = (direction) => {
    if (beatTracks.length === 0) return
    if (beatTracks.length === 1) {
      const audio = beatAudioRef.current
      if (!audio) return
      audio.currentTime = 0
      audio.play().catch(() => setBeatPlaying(false))
      return
    }
    setBeatPlaying(true)
    setBeatIndex((index) => (index + direction + beatTracks.length) % beatTracks.length)
  }

  return <>
    <div className="noise" aria-hidden="true" />
    {currentBeat && <audio ref={beatAudioRef} src={currentBeat.src} autoPlay preload="metadata" onPlay={() => setBeatPlaying(true)} onPause={() => setBeatPlaying(false)} onEnded={() => changeBeat(1)} />}
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`} id="topo">
      <a className="header-logo" href="#inicio" aria-label="BROCCOLICO — início">BROCCOLI CO<span>®</span></a>
      <nav aria-label="Navegação principal"><a href="#sobre">SOBRE</a><a href="#links">LINKS</a><a className="nav-featured" href="#sons">SONS</a><a href="#discografia">DISCOGRAFIA</a></nav>
    </header>

    <main>
      <section className="hero" id="inicio" aria-labelledby="hero-title">
        <img className="hero-mark" src={mark} alt="Marca em stencil da BROCCOLIco" />
        <div className="hero-copy"><p className="eyebrow hero-pill hero-pill-top">UNDERGROUND DE ORIGEM</p><h1 id="hero-title">BROCCOLI CO.</h1><p className="hero-line hero-pill hero-pill-bottom">SELO INDEPENDENTE CRIATIVO</p></div>
        <a className="scroll-cue" href="#links" aria-label="Ir para os links">DESCE</a>
      </section>

      <section className="section about-section" id="sobre" aria-labelledby="about-title">
        <div className="section-heading"><p className="section-index">01 / QUEM SOMOS</p><h2 id="about-title">DO<br />SUB<span>SOLO.</span></h2></div>
        <p className="about-copy">A BROCCOLICO é um selo independente brasileiro de trap, beats e música underground. Com lançamentos como <em>Dolpe Beats Vol. 1</em>, o selo reúne artistas, produtores e a cultura independente do Brasil.</p>
      </section>

      <section className="section links-section" id="links" aria-labelledby="links-title">
        <div className="section-heading"><p className="section-index">02 / ONDE COLAR</p><h2 id="links-title">SEM<br />AT<span>A</span>LHO.</h2></div>
        <div className="link-stack">
          {links.map(({ number, label, href }) => <OutboundLink className="street-link" href={href} key={number}><span>{number}</span><strong>{label}</strong><b aria-hidden="true">↗</b></OutboundLink>)}
        </div>
        <p className="small-note">Links vivos, frequência variável.</p>
      </section>

      <section className="section sounds-section" id="sons" aria-labelledby="sounds-title">
        <div className="record-tag">LADO B <span>///</span> SEMPRE</div>
        <div className="section-heading sound-heading"><p className="section-index">03 / OUVIR AGORA</p><h2 id="sounds-title">BROCCOLI<br /> A <span>GANG</span>.</h2></div>
        <div className="release-layout">
          <div className="cover-wrap"><img src={discoB} alt="Arte verde do Disco B, da BROCCOLIco" /><div className="cover-label">DISCO B<br /><span>2024</span></div></div>
          <iframe className="spotify-embed featured-album" title="Álbum em destaque da Broccolico no Spotify" src="https://open.spotify.com/embed/album/0YfaYpdPCP02wrkI6mShdC?utm_source=generator" width="100%" height="352" frameBorder="0" allowFullScreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" />
        </div>
        <OutboundLink className="all-tracks" href={SPOTIFY_ARTIST_URL}>ABRIR NO SPOTIFY <span>↗</span></OutboundLink>
      </section>

      <section className="section discography-section" id="discografia" aria-labelledby="discography-title">
        <div className="discography-header"><div className="section-heading"><p className="section-index">04 / ARQUIVO</p><h2 id="discography-title">DISCO<span>GRAFIA.</span></h2></div><div className="carousel-controls"><button type="button" onClick={() => scrollDiscography(-1)} aria-label="Ver lançamentos anteriores">←</button><button type="button" onClick={() => scrollDiscography(1)} aria-label="Ver próximos lançamentos">→</button></div></div>
        <div className="album-carousel" ref={carouselRef} aria-label="Discografia no Spotify">
          {releases.map((albumId, index) => <iframe className="spotify-embed album-embed" key={albumId} title={`Lançamento ${index + 1} da Broccolico no Spotify`} src={`https://open.spotify.com/embed/album/${albumId}?utm_source=generator`} width="100%" height="352" frameBorder="0" allowFullScreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" />)}
        </div>
      </section>
    </main>

    <footer ref={footerRef}><a href="#inicio">BROCCOLI CO<span>®</span></a><p>O BARULHO É NOSSO.</p><p>© {new Date().getFullYear()}</p></footer>
    <div className="beat-player" style={{ bottom: `${footerOffset}px` }} aria-label="Player de beat">
      <div className="beat-controls"><button type="button" onClick={() => changeBeat(-1)} aria-label="Beat anterior">↶</button><button className="beat-play" type="button" onClick={toggleBeat} aria-label={beatPlaying ? 'Pausar beat' : 'Tocar beat'}>{beatPlaying ? 'Ⅱ' : '▶'}</button><button type="button" onClick={() => changeBeat(1)} aria-label="Próximo beat">↷</button></div>
      <p><span>OUVINDO AGORA //</span> {currentBeat?.label ?? 'SEM BEAT'}</p>
    </div>
  </>
}
