import { useEffect, useRef, useState } from 'react'
import mark from '../assets/broccolico-mark.png'
import discoB from '../assets/disco-b.png'

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
  const carouselRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
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

  return <>
    <div className="noise" aria-hidden="true" />
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`} id="topo">
      <a className="header-logo" href="#inicio" aria-label="BROCCOLICO — início">BROCCOLICO<span>®</span></a>
      <nav aria-label="Navegação principal"><a href="#links">LINKS</a><a href="#sons">SONS</a><a href="#discografia">DISCOGRAFIA</a></nav>
    </header>

    <main>
      <section className="hero" id="inicio" aria-labelledby="hero-title">
        <img className="hero-mark" src={mark} alt="Marca em stencil da BROCCOLIco" />
        <div className="hero-copy"><p className="eyebrow hero-pill hero-pill-top">UNDERGROUND DE ORIGEM</p><h1 id="hero-title">BROCCOLI CO.</h1><p className="hero-line hero-pill hero-pill-bottom">SELO INDEPENDENTE CRIATIVO</p></div>
        <a className="scroll-cue" href="#links" aria-label="Ir para os links">DESCE <i /></a>
      </section>

      <section className="section links-section" id="links" aria-labelledby="links-title">
        <div className="section-heading"><p className="section-index">01 / ONDE COLAR</p><h2 id="links-title">SEM<br />AT<span>A</span>LHO.</h2></div>
        <div className="link-stack">
          {links.map(({ number, label, href }) => <OutboundLink className="street-link" href={href} key={number}><span>{number}</span><strong>{label}</strong><b aria-hidden="true">↗</b></OutboundLink>)}
        </div>
        <p className="small-note">Links vivos, frequência variável.</p>
      </section>

      <section className="section sounds-section" id="sons" aria-labelledby="sounds-title">
        <div className="record-tag">LADO B <span>///</span> SEMPRE</div>
        <div className="section-heading sound-heading"><p className="section-index">02 / OUVIR AGORA</p><h2 id="sounds-title">BROCCOLI<br /> A <span>GANG</span>.</h2></div>
        <div className="release-layout">
          <div className="cover-wrap"><img src={discoB} alt="Arte verde do Disco B, da BROCCOLIco" /><div className="cover-label">DISCO B<br /><span>2024</span></div></div>
          <iframe className="spotify-embed featured-album" title="Álbum em destaque da Broccolico no Spotify" src="https://open.spotify.com/embed/album/0YfaYpdPCP02wrkI6mShdC?utm_source=generator" width="100%" height="352" frameBorder="0" allowFullScreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" />
        </div>
        <OutboundLink className="all-tracks" href={SPOTIFY_ARTIST_URL}>ABRIR NO SPOTIFY <span>↗</span></OutboundLink>
      </section>

      <section className="section discography-section" id="discografia" aria-labelledby="discography-title">
        <div className="discography-header"><div className="section-heading"><p className="section-index">03 / ARQUIVO</p><h2 id="discography-title">DISCO<span>GRAFIA.</span></h2></div><div className="carousel-controls"><button type="button" onClick={() => scrollDiscography(-1)} aria-label="Ver lançamentos anteriores">←</button><button type="button" onClick={() => scrollDiscography(1)} aria-label="Ver próximos lançamentos">→</button></div></div>
        <div className="album-carousel" ref={carouselRef} aria-label="Discografia no Spotify">
          {releases.map((albumId, index) => <iframe className="spotify-embed album-embed" key={albumId} title={`Lançamento ${index + 1} da Broccolico no Spotify`} src={`https://open.spotify.com/embed/album/${albumId}?utm_source=generator`} width="100%" height="352" frameBorder="0" allowFullScreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" />)}
        </div>
      </section>
    </main>

    <footer><a href="#inicio">BROCCOLICO<span>®</span></a><p>O BARULHO É NOSSO.</p><p>© {new Date().getFullYear()}</p></footer>
  </>
}
