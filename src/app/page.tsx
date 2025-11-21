'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { InkShell } from '@/components/InkShell'
import {
  aboutHighlights,
  flashDay,
  services,
  studioInfo,
} from '@/data/siteContent'

const quickLinks = [
  {
    title: 'Conheça o estúdio',
    description:
      'Como combinamos pesquisa artística, biossegurança e acolhimento para criar projetos memoráveis.',
    href: '/sobre',
  },
  {
    title: 'Veja estilos e portfólio',
    description:
      'Blackwork, fine line, realismo e outros estilos que tatuamos com frequência.',
    href: '/portfolio',
  },
  {
    title: 'Agende sua ideia',
    description:
      'Fale com a equipe, receba orçamento rápido e garanta horário no estúdio.',
    href: '/contato',
  },
]

const BASE_SLOTS = 100
const FLASH_SLOTS = 100

export default function Home() {
  const whatsappLink = `https://wa.me/${
    studioInfo.whatsappNumber
  }?text=${encodeURIComponent(studioInfo.whatsappMessage)}`
  const [monthLabel, setMonthLabel] = useState('')
  const [todayLabel, setTodayLabel] = useState('')
  const [slotsLeft, setSlotsLeft] = useState(BASE_SLOTS)
  const [flashSlotsLeft, setFlashSlotsLeft] = useState(FLASH_SLOTS)

  useEffect(() => {
    const now = new Date()
    const monthName = now.toLocaleString('pt-BR', { month: 'long' })
    const day = now.getDate()
    const year = now.getFullYear()
    const monthKey = `${year}-${String(now.getMonth() + 1).padStart(2, '0')}`

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMonthLabel(monthName)
    setTodayLabel(`${day} de ${monthName} de ${year}`)

    if (typeof window !== 'undefined') {
      const stored = window.localStorage.getItem(
        `franktattoo-slots-${monthKey}`,
      )
      const parsed = stored ? parseInt(stored, 10) : Number.NaN
      const initialValue =
        Number.isFinite(parsed) && parsed >= 0 ? parsed : BASE_SLOTS
      setSlotsLeft(initialValue)

      const storedFlash = window.localStorage.getItem(
        `franktattoo-flash-slots-${monthKey}`,
      )
      const parsedFlash = storedFlash ? parseInt(storedFlash, 10) : Number.NaN
      const flashValue =
        Number.isFinite(parsedFlash) && parsedFlash >= 0
          ? parsedFlash
          : FLASH_SLOTS
      setFlashSlotsLeft(flashValue)
    }
  }, [])

  const handleBookingClick = () => {
    setSlotsLeft((prev) => {
      const next = Math.max(prev - 1, 0)
      const now = new Date()
      const monthKey = `${now.getFullYear()}-${String(
        now.getMonth() + 1,
      ).padStart(2, '0')}`
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(
          `franktattoo-slots-${monthKey}`,
          String(next),
        )
      }
      return next
    })
  }

  const handleFlashBookingClick = () => {
    setFlashSlotsLeft((prev) => {
      const next = Math.max(prev - 1, 0)
      const now = new Date()
      const monthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(
          `franktattoo-flash-slots-${monthKey}`,
          String(next),
        )
        window.dispatchEvent(new Event('franktattoo-flash-update'))
      }
      return next
    })
  }

  return (
    <InkShell>
      <section
        data-ink-reveal
        className="tattoo-scroll-warp relative grid gap-10 overflow-hidden rounded-[42px] border border-emerald-900/20 bg-black/30 p-5 backdrop-blur-sm sm:p-7 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12 lg:p-12"
      >
        <div className="pointer-events-none absolute -left-24 top-1/4 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-6 h-52 w-52 rounded-full bg-[#0f2d24]/60 blur-3xl" />
        <div
          aria-hidden="true"
          className="tattoo-orb tattoo-orb--smoke h-40 w-40 -left-14 top-10 opacity-60"
        />
        <div
          aria-hidden="true"
          className="tattoo-orb h-56 w-56 -right-10 top-1/2 opacity-80"
        />

        <div className="flex flex-col gap-8">
          <span
            className="ink-glitch text-xs uppercase tracking-[0.35em] text-emerald-400"
            data-glitch={`${studioInfo.name} · ${studioInfo.location}`}
          >
            {studioInfo.name} · {studioInfo.location}
          </span>
          <h1
            className="ink-glitch text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl"
            data-glitch="Arte autoral, técnica impecável e uma experiência que respeita a sua história."
          >
            Arte autoral, técnica impecável e uma experiência que respeita a sua
            história.
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-zinc-300 sm:text-lg">
            Cada projeto começa com escuta atenta, estudo anatômico e desenhos
            feitos sob medida. Do briefing à cicatrização, você tem
            acompanhamento próximo e orientação dedicada.
          </p>
          <div className="flex flex-col gap-3 text-sm text-zinc-400">
            <div className="flex items-center gap-3">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
              <span>{studioInfo.agendaStatus}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
              <span>{studioInfo.appointmentNote}</span>
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-2 rounded-2xl border border-emerald-900/40 bg-emerald-900/10 p-4 text-sm text-emerald-100">
            <div className="flex items-center justify-between gap-2 text-xs uppercase tracking-[0.3em] text-emerald-300">
              <span>Agenda {monthLabel || 'do mês'}</span>
              <span className="text-base font-semibold text-emerald-100">
                {slotsLeft} / {BASE_SLOTS} vagas
              </span>
            </div>
            <span className="text-xs text-emerald-200/80">
              Hoje: {todayLabel || 'carregando...'}
            </span>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              className="inline-flex w-full items-center justify-center rounded-full bg-emerald-500 px-8 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-black shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400 sm:w-auto"
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleBookingClick}
            >
              Agendar pelo WhatsApp
            </Link>
            <Link
              className="inline-flex w-full items-center justify-center rounded-full border border-[#14382c] px-8 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-300 transition hover:border-emerald-400 hover:text-emerald-300 sm:w-auto"
              href="/servicos"
            >
              Ver serviços
            </Link>
          </div>
        </div>

        <div className="tattoo-perspective">
          <div className="tattoo-card-3d relative isolate flex h-full min-h-[340px] flex-col justify-between overflow-hidden rounded-3xl border bg-[#091612]/80 p-8 shadow-[0_0_60px_rgba(15,45,36,0.15)]">
            <span className="tattoo-grid" aria-hidden="true" />
            <span className="tattoo-ink-sheen" aria-hidden="true" />
            <div className="pointer-events-none absolute -inset-1 rounded-[38px] border border-emerald-500/10" />
            <div className="pointer-events-none absolute -top-20 right-8 h-48 w-48 rounded-full bg-emerald-500/20 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 left-6 h-40 w-40 rounded-full bg-emerald-500/15 blur-3xl" />

            <div className="relative flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <span className="text-sm uppercase tracking-[0.35em] text-emerald-400/80">
                  {flashDay.label}
                </span>
                <strong className="text-3xl font-semibold text-white">
                  {todayLabel || flashDay.date}
                </strong>
                <p className="text-sm text-zinc-300">{flashDay.description}</p>
              </div>

              <div className="flex flex-col gap-2 rounded-2xl border border-emerald-900/40 bg-[#0b1914]/70 p-4 text-sm text-emerald-100">
                <div className="flex items-center justify-between gap-2 text-xs uppercase tracking-[0.3em] text-emerald-300">
                  <span>Flash Day {monthLabel || 'do mês'}</span>
                  <span className="text-base font-semibold text-emerald-100">
                    {flashSlotsLeft} / {FLASH_SLOTS} vagas
                  </span>
                </div>
                <span className="text-xs text-emerald-200/80">Hoje: {todayLabel || 'carregando...'}</span>
              </div>

              <div className="rounded-2xl border border-emerald-900/40 bg-[#08100d]/90 p-5 text-xs text-zinc-400">
                <p className="font-semibold uppercase tracking-[0.25em] text-zinc-300">
                  Checklist
                </p>
                <ul className="mt-3 space-y-2">
                  {flashDay.checklist.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                className="relative mt-2 inline-flex w-full items-center justify-center gap-3 rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-black shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400"
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleFlashBookingClick}
              >
                Reservar minha vaga
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        data-ink-reveal
        className="tattoo-scroll-warp flex flex-col gap-8 rounded-[32px] border border-emerald-900/20 bg-[#07110e]/80 p-6 backdrop-blur-sm sm:p-8 md:flex-row md:items-start md:justify-between md:p-12"
      >
        <div className="flex max-w-lg flex-col gap-4">
          <span
            className="ink-glitch text-xs uppercase tracking-[0.35em] text-emerald-400"
            data-glitch="Próximos passos"
          >
            Próximos passos
          </span>
          <h2 className="text-3xl font-semibold text-white md:text-4xl">
            Escolha por onde quer começar
          </h2>
          <p className="text-sm leading-6 text-zinc-400 sm:text-base md:text-lg">
            Explore o estúdio, veja estilos que executamos com frequência ou vá
            direto para o contato e garanta seu horário.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
          {quickLinks.map((item) => (
            <div key={item.href} className="tattoo-perspective">
              <article
                data-ink-reveal
                className="tattoo-card-3d group relative flex h-full flex-col justify-between gap-4 overflow-hidden rounded-3xl border border-emerald-900/30 bg-[#091612]/80 p-6 transition hover:border-emerald-400/50"
              >
                <span className="tattoo-grid" aria-hidden="true" />
                <span className="tattoo-ink-sheen" aria-hidden="true" />
                <div className="relative flex flex-col gap-2">
                  <h3 className="text-xl font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-6 text-zinc-300">
                    {item.description}
                  </p>
                </div>
                <Link
                  href={item.href}
                  className="relative mt-auto inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300 transition hover:text-emerald-200"
                >
                  Acessar
                  <span aria-hidden="true">→</span>
                </Link>
              </article>
            </div>
          ))}
        </div>
      </section>

      <section
        data-ink-reveal
        className="tattoo-scroll-warp flex flex-col gap-8 rounded-[32px] border border-emerald-900/20 bg-[#071510]/85 p-6 backdrop-blur-sm sm:p-8 md:gap-10 md:p-12"
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-3">
            <span className="text-xs uppercase tracking-[0.35em] text-emerald-400">
              Serviços
            </span>
            <h2 className="text-3xl font-semibold text-white md:text-4xl">
              Experiência completa de estúdio
            </h2>
          </div>
          <Link
            href="/servicos"
            className="inline-flex w-full items-center justify-center rounded-full border border-emerald-900/40 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300 transition hover:border-emerald-400 hover:text-emerald-200 sm:w-auto"
          >
            Ver detalhes
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {services.map((service) => (
            <div key={service.title} className="tattoo-perspective">
              <article className="tattoo-card-3d group relative flex h-full flex-col gap-4 overflow-hidden rounded-3xl border border-emerald-900/30 bg-[#0c1b15]/80 p-6 transition hover:border-emerald-400/50">
                <span className="tattoo-grid" aria-hidden="true" />
                <span className="tattoo-ink-sheen" aria-hidden="true" />
                <div className="relative flex flex-col gap-3">
                  <h3 className="text-2xl font-semibold text-white">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-6 text-zinc-300">
                    {service.description}
                  </p>
                </div>
                <div className="relative mt-auto flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-emerald-900/60 px-3 py-1 text-xs uppercase tracking-[0.25em] text-zinc-400 transition group-hover:border-emerald-400 group-hover:text-emerald-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </div>
          ))}
        </div>
      </section>

      <section
        data-ink-reveal
        className="tattoo-scroll-warp grid gap-8 overflow-hidden rounded-[32px] border border-emerald-900/25 bg-[#07110e]/80 p-6 backdrop-blur-sm sm:gap-10 sm:p-8 md:grid-cols-[1.1fr_0.9fr] md:p-12"
      >
        <div className="flex flex-col gap-6">
          <span
            className="ink-glitch text-xs uppercase tracking-[0.35em] text-emerald-400"
            data-glitch="Por dentro do estúdio"
          >
            Por dentro do estúdio
          </span>
          <h2 className="text-3xl font-semibold text-white md:text-4xl">
            Tecnicamente preciso, emocionalmente verdadeiro.
          </h2>
          <p className="text-sm leading-6 text-zinc-400 sm:text-base md:text-lg">
            Projetos autorais, mockups em alta fidelidade e acompanhamento
            pós-sessão garantem que sua tattoo fique incrível no dia e anos
            depois. Conheça mais sobre nosso processo e estrutura.
          </p>
          <Link
            href="/sobre"
            className="inline-flex w-fit items-center justify-center rounded-full border border-emerald-900/40 px-6 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300 transition hover:border-emerald-400 hover:text-emerald-200"
          >
            Sobre o estúdio
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {aboutHighlights.map((item) => (
            <div key={item.title} className="tattoo-perspective">
              <article className="tattoo-card-3d relative flex h-full flex-col gap-3 overflow-hidden rounded-3xl border border-emerald-900/30 bg-[#091612]/80 p-6">
                <span className="tattoo-grid" aria-hidden="true" />
                <span className="tattoo-ink-sheen" aria-hidden="true" />
                <h3 className="text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <p className="text-sm leading-6 text-zinc-300">
                  {item.description}
                </p>
              </article>
            </div>
          ))}
        </div>
      </section>

      <section
        data-ink-reveal
        className="tattoo-perspective tattoo-scroll-warp"
      >
        <div className="tattoo-card-3d relative overflow-hidden rounded-3xl border border-emerald-900/40 bg-[#0b2d22]/60 p-8 text-center sm:p-10 md:p-16">
          <span className="tattoo-grid" aria-hidden="true" />
          <span className="tattoo-ink-sheen" aria-hidden="true" />
          <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-emerald-500/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 right-10 h-72 w-72 rounded-full bg-[#0f4131]/40 blur-3xl" />
          <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6">
            <h2
              className="ink-glitch text-3xl font-semibold text-white md:text-4xl"
              data-glitch="Pronto para sua próxima tattoo?"
            >
              Pronto para sua próxima tattoo?
            </h2>
            <p className="text-base leading-relaxed text-zinc-100 sm:text-lg">
              Fale com a gente pelo WhatsApp, receba um briefing guiado e
              reserve seu horário com o time Frank Tattoo.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-emerald-500 px-10 py-4 text-base font-semibold uppercase tracking-[0.2em] text-black shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400 sm:w-auto"
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleBookingClick}
              >
                Agendar pelo WhatsApp
              </Link>
              <Link
                className="inline-flex w-full items-center justify-center rounded-full border border-emerald-900/40 px-10 py-4 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300 transition hover:border-emerald-400 hover:text-emerald-200 sm:w-auto"
                href="/contato"
              >
                Outras formas de contato
              </Link>
            </div>
            <span className="text-xs uppercase tracking-[0.35em] text-emerald-200/70">
              {studioInfo.hours} · {studioInfo.address}
            </span>
          </div>
        </div>
      </section>
    </InkShell>
  )
}




