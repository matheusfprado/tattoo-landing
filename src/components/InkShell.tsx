'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { FaWhatsapp } from 'react-icons/fa'
import { flashDay, navLinks, socialLinks, studioInfo } from '@/data/siteContent'

const MobileIconHome = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m4 11 8-6 8 6" />
    <path d="M6 10.5v6.75c0 .69.56 1.25 1.25 1.25H9c.55 0 1-.45 1-1V15c0-.55.45-1 1-1h2c.55 0 1 .45 1 1v2.5c0 .55.45 1 1 1h1.75c.69 0 1.25-.56 1.25-1.25V10.5" />
  </svg>
)

const MobileIconSearch = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="6.5" />
    <path d="m15.5 15.5 3.5 3.5" />
  </svg>
)

const MobileIconClock = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="8" />
    <path d="M12 8v4l2.5 1.5" />
  </svg>
)

const MobileIconUser = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z" />
    <path d="M5.5 19.5a6.5 6.5 0 0 1 13 0" />
  </svg>
)

type InkShellProps = {
  children: React.ReactNode
}

export function InkShell({ children }: InkShellProps) {
  const [flashSlotsLeft, setFlashSlotsLeft] = useState(100)
  const [monthLabel, setMonthLabel] = useState('')
  const [todayLabel, setTodayLabel] = useState('')
  const pathname = usePathname()
  const whatsappLink = `https://wa.me/${
    studioInfo.whatsappNumber
  }?text=${encodeURIComponent(studioInfo.whatsappMessage)}`
  const mobileNav = [
    { label: 'Inicio', href: '/', icon: <MobileIconHome /> },
    { label: 'Servicos', href: '/servicos', icon: <MobileIconSearch /> },
    { label: 'Agenda', href: '/faq', icon: <MobileIconClock /> },
    { label: 'Contato', href: '/contato', icon: <MobileIconUser /> },
  ]

  useEffect(() => {
    const root = document.documentElement
    let frame = 0

    const now = new Date()
    const monthName = now.toLocaleString('pt-BR', { month: 'long' })
    const day = now.getDate()
    const year = now.getFullYear()
    const monthKey = `${year}-${String(now.getMonth() + 1).padStart(2, '0')}`

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMonthLabel(monthName)
    setTodayLabel(`${day} de ${monthName} de ${year}`)

    const loadFlashSlots = () => {
      if (typeof window === 'undefined') return
      const stored = window.localStorage.getItem(
        `franktattoo-flash-slots-${monthKey}`,
      )
      const parsed = stored ? parseInt(stored, 10) : Number.NaN
      setFlashSlotsLeft(Number.isFinite(parsed) && parsed >= 0 ? parsed : 100)
    }

    loadFlashSlots()
    const handleFlashUpdate = () => loadFlashSlots()
    window.addEventListener(
      'franktattoo-flash-update',
      handleFlashUpdate as EventListener,
    )

    const updateScrollProgress = () => {
      frame = 0
      const scrollTop = window.scrollY || window.pageYOffset
      const docHeight = document.body.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0
      const tilt = (progress - 0.5) * 8
      const skew = (progress - 0.5) * 4.5
      root.style.setProperty('--scroll-progress', progress.toString())
      root.style.setProperty('--scroll-tilt', `${tilt}deg`)
      root.style.setProperty('--scroll-skew', `${skew}deg`)
    }

    const handleScroll = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(updateScrollProgress)
      }
    }

    updateScrollProgress()
    window.addEventListener('scroll', handleScroll, { passive: true })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 },
    )

    document
      .querySelectorAll<HTMLElement>('[data-ink-reveal]')
      .forEach((el) => observer.observe(el))

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        document.body.classList.add('is-idle')
        root.style.setProperty('--scroll-progress', '0')
        root.style.setProperty('--scroll-tilt', '0deg')
        root.style.setProperty('--scroll-skew', '0deg')
      } else {
        document.body.classList.remove('is-idle')
        updateScrollProgress()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener(
        'franktattoo-flash-update',
        handleFlashUpdate as EventListener,
      )
      if (frame) {
        cancelAnimationFrame(frame)
      }
      observer.disconnect()
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  const currentYear = new Date().getFullYear()

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-black via-[#05100d] to-[#0f1f1b] text-zinc-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(22,101,75,0.25),_transparent_65%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(16,50,40,0.25),_transparent_60%)]" />
      <main className="relative mx-auto flex w-full max-w-6xl flex-col gap-14 px-4 pb-32 pt-10 sm:px-6 md:gap-16 md:px-10 md:pb-20 lg:gap-20 lg:px-16 lg:pb-24">
        <header
          data-ink-reveal
          className="tattoo-scroll-warp flex flex-col gap-5 rounded-3xl border border-emerald-900/20 bg-black/30 px-5 py-4 backdrop-blur-sm sm:px-7 sm:py-5 md:flex-row md:items-center md:justify-between md:rounded-full"
        >
          <div className="flex flex-col">
            <span
              className="ink-glitch text-xs uppercase tracking-[0.4em] text-emerald-400"
              data-glitch={studioInfo.name}
            >
              {studioInfo.name}
            </span>
            <strong className="text-lg font-semibold text-white sm:text-xl md:text-2xl">
              Arte na pele com assinatura.
            </strong>
          </div>
        </header>

        {children}
      </main>

      <nav className="fixed inset-x-4 bottom-4 z-40">
        <div className="relative mx-auto flex max-w-2xl items-center justify-between rounded-[28px] border border-emerald-900/45 bg-[#0c1c17]/95 px-4 py-3 shadow-[0_18px_45px_rgba(0,0,0,0.35)] backdrop-blur">
          <div
            className="absolute inset-x-6 bottom-2 h-1 rounded-full bg-emerald-900/55"
            aria-hidden="true"
          />
          {mobileNav.map((item) => {
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : pathname?.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative z-10 flex flex-1 flex-col items-center gap-1 text-[0.8rem] font-semibold transition ${
                  isActive
                    ? 'text-emerald-300'
                    : 'text-zinc-400 hover:text-emerald-200'
                }`}
                aria-label={item.label}
              >
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-full ${
                    isActive
                      ? 'bg-emerald-500/15 text-emerald-300 shadow-[0_8px_28px_rgba(16,185,129,0.25)]'
                      : 'text-zinc-200'
                  }`}
                >
                  {item.icon}
                </span>
                <span className="text-[0.75rem]">{item.label}</span>
              </Link>
            )
          })}
          <Link
            href={whatsappLink}
            className="absolute -top-7 left-1/2 z-20 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-b from-[#25d366] to-[#128c7e] text-white shadow-[0_18px_45px_rgba(37,211,102,0.35)] ring-4 ring-[#0c1c17] transition hover:from-[#3ae27a] hover:to-[#1da07b]"
            aria-label="Agendar ou falar pelo WhatsApp"
          >
            <FaWhatsapp className="h-6 w-6" />
          </Link>
        </div>
      </nav>

      <footer className="border-t border-emerald-900/25 bg-[#020807]/95">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-8 text-center text-sm text-zinc-500 sm:px-6 md:flex-row md:items-center md:justify-between md:px-10 lg:px-16 lg:text-left">
          <span>
            (c) {currentYear} {studioInfo.name}. Todos os direitos reservados.
          </span>
          <div className="flex flex-wrap items-center justify-center gap-4 md:justify-end">
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                className="text-zinc-400 transition hover:text-emerald-300"
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.label}
              </Link>
            ))}
            <span className="text-zinc-600">{studioInfo.address}</span>
          </div>
        </div>
      </footer>

      <aside className="pointer-events-none fixed bottom-8 right-8 hidden w-64 rounded-3xl border border-emerald-900/20 bg-[#081914]/90 p-4 text-xs text-zinc-200 shadow-[0_30px_60px_rgba(7,31,24,0.55)] transition md:block">
        <p className="font-semibold uppercase tracking-[0.3em] text-emerald-300/80">
          {flashDay.label}
        </p>
        <p className="mt-1 text-base font-semibold text-white">
          {todayLabel || flashDay.date}
        </p>
        <p className="mt-2 text-[0.75rem] leading-5 text-zinc-400">
          {flashDay.description}
        </p>
        <div className="mt-3 rounded-2xl border border-emerald-900/40 bg-[#0b1914]/70 p-3 text-[0.7rem] text-emerald-200">
          <p className="flex items-center justify-between text-[0.65rem] uppercase tracking-[0.3em] text-emerald-300/80">
            <span>{monthLabel || 'Este m?s'}</span>
            <span className="text-sm font-semibold text-emerald-100">
              {flashSlotsLeft} / 100
            </span>
          </p>
          <p className="mt-1 text-[0.65rem] text-emerald-200/80">
            Hoje: {todayLabel || 'carregando...'}
          </p>
        </div>
      </aside>
    </div>
  )
}
