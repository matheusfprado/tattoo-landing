import Link from "next/link";
import { InkShell } from "@/components/InkShell";
import { socialLinks, studioInfo } from "@/data/siteContent";

export default function ContatoPage() {
  const whatsappLink = `https://wa.me/${studioInfo.whatsappNumber}?text=${encodeURIComponent(
    studioInfo.whatsappMessage
  )}`;

  return (
    <InkShell>
      <section
        data-ink-reveal
        className="tattoo-scroll-warp grid gap-8 overflow-hidden rounded-[32px] border border-emerald-900/20 bg-[#07110e]/80 p-8 backdrop-blur-sm md:grid-cols-[1fr_1fr] md:p-12"
      >
        <div className="flex flex-col gap-6">
          <span className="ink-glitch text-xs uppercase tracking-[0.35em] text-emerald-400" data-glitch="Contato">
            Contato
          </span>
          <h1 className="text-3xl font-semibold text-white md:text-4xl">
            Vamos conversar sobre a tattoo que você quer fazer?
          </h1>
          <p className="text-sm leading-6 text-zinc-400 md:text-base">
            Escolha o canal que preferir e conte sua ideia. Para agilizar o orçamento, envie fotos da região,
            medidas aproximadas e referências visuais que tenham a ver com o clima que busca.
          </p>
          <div className="flex flex-col gap-3 text-sm text-zinc-400">
            <span>{studioInfo.hours}</span>
            <span>{studioInfo.address}</span>
          </div>
          <Link
            className="inline-flex w-fit items-center justify-center rounded-full bg-emerald-500 px-8 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-black shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400"
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Abrir WhatsApp
          </Link>
        </div>

        <div className="grid gap-4">
          {socialLinks.map((network) => (
            <div key={network.label} className="tattoo-perspective">
              <article className="tattoo-card-3d relative flex h-full flex-col justify-between gap-4 overflow-hidden rounded-3xl border border-emerald-900/35 bg-[#081914]/80 p-6">
                <span className="tattoo-grid" aria-hidden="true" />
                <span className="tattoo-ink-sheen" aria-hidden="true" />
                <div className="flex flex-col gap-2">
                  <span className="text-xs uppercase tracking-[0.35em] text-emerald-300/80">
                    {network.label}
                  </span>
                  <Link
                    className="text-xl font-semibold text-white transition hover:text-emerald-300"
                    href={network.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {network.handle}
                  </Link>
                </div>
                <p className="text-sm leading-6 text-zinc-300">{network.description}</p>
              </article>
            </div>
          ))}
        </div>
      </section>

      <section
        data-ink-reveal
        className="tattoo-perspective tattoo-scroll-warp"
      >
        <div className="tattoo-card-3d relative overflow-hidden rounded-3xl border border-emerald-900/40 bg-[#0b2d22]/60 p-10 text-center md:p-16">
          <span className="tattoo-grid" aria-hidden="true" />
          <span className="tattoo-ink-sheen" aria-hidden="true" />
          <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-emerald-500/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 right-10 h-72 w-72 rounded-full bg-[#0f4131]/40 blur-3xl" />
          <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6">
            <h2 className="ink-glitch text-3xl font-semibold text-white md:text-4xl" data-glitch="Preferir vir até o estúdio?">
              Preferir vir até o estúdio?
            </h2>
            <p className="text-lg leading-relaxed text-zinc-100">
              Estamos em Pinheiros, pertinho do metrô e com estrutura completa para receber você com conforto e segurança.
            </p>
            <Link
              className="inline-flex items-center justify-center gap-3 rounded-full border border-emerald-900/40 px-10 py-4 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300 transition hover:border-emerald-400 hover:text-emerald-200"
              href="https://maps.google.com/?q=Rua+Benedito+Calixto,+321,+São+Paulo"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver no mapa
            </Link>
          </div>
        </div>
      </section>
    </InkShell>
  );
}
