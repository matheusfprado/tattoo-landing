'use client'

import type { CSSProperties, MouseEvent } from 'react'
import Link from 'next/link'
import { useState } from 'react'
import { InkShell } from '@/components/InkShell'
import { portfolioEntries, studioInfo } from '@/data/siteContent'

const referenceMessage = 'Estou com uma ideia e tenho referências, vamos fazer?'

export default function PortfolioPage() {
  const whatsappLink = `https://wa.me/${
    studioInfo.whatsappNumber
  }?text=${encodeURIComponent(referenceMessage)}`
  const [brushState, setBrushState] = useState({
    x: '50%',
    y: '50%',
    active: false,
  })

  const handleBrushMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100
    setBrushState({ x: `${x}%`, y: `${y}%`, active: true })
  }

  const handleBrushLeave = () => {
    setBrushState((prev) => ({ ...prev, active: false }))
  }

  const brushStyle = {
    '--brush-x': brushState.x,
    '--brush-y': brushState.y,
    '--brush-active': brushState.active ? 1 : 0,
  } as CSSProperties

  return (
    <InkShell>
      <section
        data-ink-reveal
        className="tattoo-scroll-warp flex flex-col gap-6 rounded-[32px] border border-emerald-900/20 bg-[#07110e]/80 p-8 backdrop-blur-sm md:p-12"
      >
        <span
          className="ink-glitch text-xs uppercase tracking-[0.35em] text-emerald-400"
          data-glitch="Portfólio"
        >
          Portfólio
        </span>
        <h1 className="text-3xl font-semibold text-white md:text-4xl">
          Peças recentes favoritas da Frank Tattoo
        </h1>
        <p className="max-w-2xl text-sm leading-6 text-zinc-400 md:text-base">
          Selecionamos alguns projetos que representam a variedade de estilos
          que produzimos - do contraste pesado do blackwork ao delicado da linha
          fina e às texturas realistas.
        </p>
      </section>

      <section
        data-ink-reveal
        className="tattoo-scroll-warp grid gap-6 rounded-[32px] border border-emerald-900/20 bg-[#071510]/85 p-8 backdrop-blur-sm md:grid-cols-3 md:p-12"
      >
        {portfolioEntries.map((piece) => (
          <div key={piece.category} className="tattoo-perspective">
            <article className="group relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-3xl border border-emerald-900/30 bg-[#081914]/80 p-6 transition hover:border-emerald-400/50">
              <span className="tattoo-grid" aria-hidden="true" />
              <span className="tattoo-ink-sheen" aria-hidden="true" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
              <div className="relative flex flex-col gap-2">
                <span className="text-xs uppercase tracking-[0.35em] text-emerald-400/90">
                  {piece.category}
                </span>
                <p className="text-sm leading-6 text-zinc-300">
                  {piece.description}
                </p>
              </div>
              <p className="relative text-xs uppercase tracking-[0.25em] text-zinc-500">
                {piece.details}
              </p>
            </article>
          </div>
        ))}
      </section>

      <section
        data-ink-reveal
        className="tattoo-scroll-warp flex flex-col gap-6 rounded-[32px] border border-emerald-900/25 bg-[#0c2019]/85 p-8 backdrop-blur-sm md:p-12"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <span
              className="ink-glitch text-xs uppercase tracking-[0.35em] text-emerald-400"
              data-glitch="Instagram"
            >
              Instagram
            </span>
            <h2 className="text-2xl font-semibold text-white md:text-3xl">
              Últimas postagens do Frank Willian Tattoo
            </h2>
            <p className="max-w-2xl text-sm leading-6 text-zinc-400 md:text-base">
              Role dentro do feed para ver o trabalho mais recente. Clique para
              abrir direto no Instagram.
            </p>
          </div>
          <Link
            className="inline-flex items-center justify-center rounded-full border border-emerald-900/40 px-6 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-300 transition hover:border-emerald-400 hover:text-emerald-200"
            href="https://www.instagram.com/frankwilliantattoo/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Abrir perfil
          </Link>
        </div>
        <div className="relative overflow-hidden rounded-3xl border border-emerald-900/30 bg-[#0c2c23]/80 shadow-lg shadow-emerald-900/30">
          <iframe
            title="Instagram feed de @frankwilliantattoo"
            src="https://www.instagram.com/frankwilliantattoo/embed"
            className="h-[620px] w-full"
            loading="lazy"
            allow="encrypted-media; clipboard-write"
          />
        </div>
      </section>

      <section data-ink-reveal className="tattoo-scroll-warp">
        <div
          className="ink-brush-panel relative overflow-hidden rounded-3xl border border-emerald-900/40 bg-[#0b2d22]/70 p-10 text-center md:p-16"
          onMouseMove={handleBrushMove}
          onMouseLeave={handleBrushLeave}
          style={brushStyle}
        >
          <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6">
            <h2 className="text-3xl font-semibold text-white md:text-4xl">
              Curtiu o estilo?
            </h2>
            <p className="text-lg leading-relaxed text-zinc-100">
              Envie referências ou descreva a ideia que quer tatuar. A equipe
              apresenta opções de composição, tamanhos e orçamento para você
              escolher com calma.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                className="inline-flex items-center justify-center gap-3 rounded-full bg-emerald-500 px-10 py-4 text-base font-semibold uppercase tracking-[0.2em] text-black shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400"
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Enviar referência
              </Link>
              <Link
                className="inline-flex items-center justify-center rounded-full border border-emerald-900/40 px-10 py-4 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300 transition hover:border-emerald-400 hover:text-emerald-200"
                href="/contato"
              >
                Falar com o estúdio
              </Link>
            </div>
          </div>
        </div>
      </section>
    </InkShell>
  )
}
